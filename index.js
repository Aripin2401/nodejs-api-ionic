//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();
 
//konfigurasi koneksi
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyek_42',
});
 
//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));
 
//route untuk homepage
app.get('/api/',(req, res) => {
  let sql = "SELECT * FROM user";
  let query = conn.query(sql, (err, results) => {
    // if(err) throw err;
    // res.render('user_view',{
    //   results: results
    // });
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
// router untuk single user
app.get('/api/user/:id',(req, res) => {
  let sql = "SELECT * FROM user WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//route untuk insert data
app.post('/api/save',(req, res) => {
  let data = {name: req.body.name, description, website, phone, email, address: req.body.name};
  let sql = "INSERT INTO user SET ?";
  let query = conn.query(sql, data,(err, results) => {
    // if(err) throw err;
    // res.redirect('/');
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//route untuk update data
app.post('/api/update',(req, res) => {
  let sql = "UPDATE user SET name='"+req.body.name+"', description='"+req.body.description+"', websit='"+req.body.website+"', phone='"+req.body.phone+"', email='"+req.body.email+"', address='"+req.body.address+"' WHERE id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});
 
//route untuk delete data
app.post('/api/delete',(req, res) => {
  let sql = "DELETE FROM user WHERE id="+req.body.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});
 
//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});