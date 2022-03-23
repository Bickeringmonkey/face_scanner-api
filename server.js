const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// connection
const db = knex({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
          }
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('success');})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {console.log(`App is running on port ${process.env.PORT}`);})  

/* 
/ --> res = this is working
/signin --> POST success or fail
/Register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/