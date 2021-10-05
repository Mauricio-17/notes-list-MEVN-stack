//@ts-check
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

import routeNote from './routes/notes';
import routeUser from './routes/user'
import routeLogin from './routes/login'

const app = express();

//const uri = 'mongodb://localhost:27017/myapp'
// Cloud connection  
const uri = `<your MongoDB Atlas uri>`

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
// connection to DB
mongoose.connect(uri, options).then(
    () => {
        console.log('conectado a Mongo DB')
    },
    err => { 
        console.log(err)
    }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
//app.get('/', (req, res) => {
//    res.send('Hello World!');
//});

app.use('/api', routeNote)
app.use('/api', routeUser)
app.use('/api/login', routeLogin)

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));



app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
    console.log('Example app listening on port ' + app.get('port'));
});




