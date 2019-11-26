const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
var cors = require('cors') //  < --------------- IMPORTANTE (rode: npm install --save cors)
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()) //  < --------------- IMPORTANTE

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//Login
router.post('/login', (req, res) =>{
    const email = req.body.email.substring(0, 50);
    const password = req.body.password.substring(0, 50);
    // console.log(email,password)

    execSQLQuery(`select * from user where email="${email}" and password="${password}"`, res);
})

//Books aleatories
router.get('/books-aleatories', (req, res) => {
    execSQLQuery('SELECT ISBN,title,description FROM bookdescriptions ORDER BY RAND() limit 3', res);
})

router.post('/user', (req, res) => {
    const email = req.body.email;

    execSQLQuery(`select *from bookcustomers where email='${email}'`, res);
});

router.patch('/client/:id', (req, res) =>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const id = parseInt(req.params.id);

    execSQLQuery(`UPDATE bookcustomers SET fname='${fname}', lname='${lname}', email='${email}', street='${street}', city='${city}', state='${state}',zip='${zip}' WHERE custID=${id}`, res);
})

//Menu
router.get('/menu', (req, res) => {
    execSQLQuery('SELECT DISTINCT ' +
    'categories.CategoryName, ' +
    'categories.CategoryID ' +
    'FROM bookcategories AS categories ' +
    'INNER JOIN bookcategoriesbooks AS bookcategories ' +
    'ON categories.CategoryID = bookcategories.CategoryID ORDER BY categories.CategoryName ASC', res);
})

//Search
router.post('/search', (req, res) => {
    const filter = `WHERE book.title LIKE '%${req.body.search}%' OR book.description LIKE '%${req.body.search}%'`;

    execSQLQuery(`select distinct GROUP_CONCAT(concat(authors.nameF," ", authors.nameL,"") SEPARATOR '-') as authorsName,GROUP_CONCAT(authors.AuthorID SEPARATOR '-') as authorsId,book.ISBN,book.title,book.description from bookdescriptions as book join bookauthorsbooks as bab on bab.ISBN=book.ISBN join bookauthors as authors on authors.AuthorID=bab.AuthorID ${filter} group by book.ISBN`, res);
})

//Books by category
router.get('/category/:id/books', (req, res) => {
    let id = parseInt(req.params.id);

    execSQLQuery(`select distinct GROUP_CONCAT(concat(authors.nameF," ", authors.nameL) SEPARATOR '-') as authorsName,GROUP_CONCAT(concat(authors.authorID) SEPARATOR '-') as authorsId,category.CategoryName,book.ISBN,book.title,book.description from bookcategories as category join bookcategoriesbooks as bcb on bcb.CategoryID=category.CategoryID join bookdescriptions as book on book.ISBN=bcb.ISBN join bookauthorsbooks as bab on bab.ISBN=book.ISBN join bookauthors as authors on authors.AuthorID=bab.AuthorID where bcb.CategoryID=${id} group by book.ISBN`, res);
})

//Books by author
router.get('/author/:id/books', (req, res) => {
    let id = parseInt(req.params.id);

    execSQLQuery(`select distinct GROUP_CONCAT(concat(authors.nameF," ", authors.nameL) SEPARATOR '-') as authorsName,GROUP_CONCAT(concat(authors.authorID) SEPARATOR '-') as authorsId,book.title,book.ISBN,book.description from bookdescriptions as book join bookauthorsbooks as bab on bab.ISBN=book.ISBN join bookauthors as authors on authors.AuthorID=bab.AuthorID where authors.AuthorID=${id} group by book.ISBN`, res);
})

//Book
router.get('/book/:isbn', (req, res) => {
    let isbn = req.params.isbn;

    execSQLQuery(`select distinct GROUP_CONCAT(concat(authors.nameF," ", authors.nameL) SEPARATOR '-') as authorsName,GROUP_CONCAT(concat(authors.authorID) SEPARATOR '-') as authorsId,book.ISBN,book.title,book.description,book.price,book.publisher,book.pubdate,book.edition,book.pages from bookdescriptions as book join bookauthorsbooks as bab on bab.ISBN=book.ISBN join bookauthors as authors on authors.AuthorID=bab.AuthorID where book.ISBN='${isbn}' group by book.ISBN`, res);
})

//Authors
// router.get('/book/:isbn/authors', (req, res) => {
//     let isbn = parseInt(req.params.isbn);

//     execSQLQuery(`select author.nameF,author.nameL  from bookauthors as author join bookauthorsbooks as bab on  bab.AuthorID=author.AuthorID where bab.ISBN=${isbn}`, res);
// })

router.post('/client', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;

    execSQLQuery(`INSERT INTO bookcustomers (fname, lname, email, street, city, state, zip) VALUES ('${fname}', '${lname}', '${email}', '${street}', '${city}', '${state}', '${zip}')`, res);
});

router.post('/request-order', (req, res) => {
    const custID = parseInt(req.body.custID);
    const orderdate = req.body.orderdate;

    execSQLQuery(`INSERT INTO bookorders (custID, orderdate) VALUES ('${custID}', '${orderdate}')`, res);
});

router.post('/orderItem', (req, res) => {
    const orderID = parseInt(req.body.orderID);
    const ISBN = req.body.ISBN;
    const qty = parseInt(req.body.qtd);
    const price = parseFloat(req.body.price);

    execSQLQuery(`INSERT INTO bookorderitems (orderID, ISBN, qty, price) VALUES ('${orderID}', '${ISBN}', '${qty}', '${price}')`, res);
});

//Order Items
router.get('/orders/:orderID', (req, res) => {

    let filter = '';
    // if (req.params.orderID){
    filter = `where orders.orderID=${req.params.orderID}`;
    execSQLQuery(`select distinct GROUP_CONCAT(concat(authors.nameF," ", authors.nameL) SEPARATOR ', ') as authors,customer.custID,customer.fname,customer.lname,customer.street,customer.city,customer.state,customer.zip,book.title,item.qty,item.price  from bookcustomers as customer join bookorders as orders on orders.custID=customer.custID join bookorderitems as item on item.orderID=orders.orderID join bookdescriptions as book on book.ISBN=item.ISBN join bookauthorsbooks as bab on bab.ISBN=book.ISBN join bookauthors as authors on bab.AuthorID=authors.AuthorID ${filter} group by book.ISBN`, res);
    // }
    // else{
    //     execSQLQuery(`select GROUP_CONCAT(concat(authors.nameF," ", authors.nameL) SEPARATOR ', ') as authors,orders.orderID,orders.qty, book.title, book.ISBN,bo.orderdate from bookorders as bo join bookorderitems as orders on bo.orderID=orders.orderID join bookdescriptions as book on book.ISBN=orders.ISBN join bookauthorsbooks as bab on bab.ISBN=book.ISBN join bookauthors as authors on authors.AuthorID=bab.AuthorID group by book.title,orders.orderID,book.ISBN order by orders.orderID`, res);
    // }
})

//Order Items
router.get('/historic/:id', (req, res) => {

    let id = parseInt(req.params.id);

    execSQLQuery(`select GROUP_CONCAT(concat(authors.nameF," ", authors.nameL) SEPARATOR ', ') as authors,orders.orderID,orders.qty, book.title, book.ISBN,bo.orderdate from bookorders as bo join bookorderitems as orders on bo.orderID=orders.orderID join bookdescriptions as book on book.ISBN=orders.ISBN join bookauthorsbooks as bab on bab.ISBN=book.ISBN join bookauthors as authors on authors.AuthorID=bab.AuthorID where bo.custID=${id} group by book.title,orders.orderID,book.ISBN order by orders.orderID`, res);

})

router.post('/sendMail', (req, res) => {

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'fuser263@gmail.com',
          pass: 'emailfake263'
        }
      }));
      
      var mailOptions = {
        from: 'teste@gmail.com',
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
})

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({

        // host: '157.245.241.8',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'book'

    });

    connection.query(sqlQry, function(error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}


// try {
//     var sql = "CREATE TABLE IF NOT EXISTS user (id INTEGER NOT NULL AUTO_INCREMENT,"+
//                 " name VARCHAR(50) NOT NULL, email VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(50) NOT NULL, role VARCHAR(25) NOT NULL, PRIMARY KEY (id));"

//     execSQLQuery(sql, {
//         json: (dbresponse) => {
//             console.log(dbresponse)
//         }
//     })

//     sql = "CREATE TABLE IF NOT EXISTS coordinator (id INTEGER NOT NULL AUTO_INCREMENT,"+
//                 " name VARCHAR(50) NOT NULL, email VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(50) NOT NULL," +
//                  " user_id INTEGER NOT NULL, PRIMARY KEY (id)," + 
//                  " FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE RESTRICT);"

//     execSQLQuery(sql, {
//         json: (dbresponse) => {
//             console.log(dbresponse)
//         }
//     })

//     sql = "CREATE TABLE IF NOT EXISTS support (id INTEGER NOT NULL AUTO_INCREMENT,"+
//                 " name VARCHAR(50) NOT NULL, email VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(50) NOT NULL," +
//                 " user_id INTEGER NOT NULL, PRIMARY KEY (id)," + 
//                 " FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE RESTRICT);"

//     execSQLQuery(sql, {
//         json: (dbresponse) => {
//             console.log(dbresponse)
//         }
//     })

//     sql = "CREATE TABLE IF NOT EXISTS type (id INTEGER NOT NULL AUTO_INCREMENT,"+
//             " name VARCHAR(50) NOT NULL, description VARCHAR(200), PRIMARY KEY (id));"

//     execSQLQuery(sql, {
//         json: (dbresponse) => {
//             console.log(dbresponse)
//         }
//     })

//     sql = "CREATE TABLE IF NOT EXISTS item (id INTEGER NOT NULL AUTO_INCREMENT,"+
//                 " code VARCHAR(50) UNIQUE NOT NULL, lab VARCHAR(10) NOT NULL," +
//                 " date DATE NULL, finalDate DATE NULL, amount INTEGER NOT NULL, description VARCHAR(500)," +
//                 " name VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL," + 
//                 " status VARCHAR(50) NOT NULL," + 
//                 " user_id INTEGER NULL, type_id INTEGER NOT NULL, PRIMARY KEY (id)," + 
//                 " FOREIGN KEY (type_id) REFERENCES type(id) ON DELETE RESTRICT,FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE RESTRICT);"

//     execSQLQuery(sql, {
//         json: (dbresponse) => {
//             console.log(dbresponse)
//         }
//     })

//     sql = "INSERT INTO user (name, email, password, role) VALUES ('admin', 'admin@user.com', '123456', 'admin')"

//     execSQLQuery(sql, {
//         json: (dbresponse) => {
//             console.log('Usuário admin inserido')
//         }
//     })

// } catch (error) {
    
// }