const express = require('express');
const app = express();
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const userLoggedMiddleware = require('./middlewares/userLogMiddleware')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.listen(3000, () => {
    console.log('Servidor Corriendo')
})

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser())

app.use(userLoggedMiddleware)

const mainRoutes = require('./routes');
const moviesRoutes = require('./routes/moviesRoutes');
const userRouter = require('./routes/userRoutes')


app.use('/', mainRoutes);
app.use(moviesRoutes);
app.use('/usuario',userRouter) 