import * as compression from 'compression';
import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import { MySQL } from './mysql/MySql';
import { any_route_get } from './routes/any_route';
import { example_route_get, example_route_post } from './routes/example_route';
import { index_route_get } from './routes/index_route';

const app = express();

app.listen(80);

app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: 'eaO1LJRfcOZEiXMs',
    store: MySQL.sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}))

// initialize session variables
app.use((req, res, next) => {
    req.session.exampleUserName = 'bob';
    next();
});

// example
app.use((req, res, next) => {
    // req obj is the same in all middleware functions and route handlers
    console.log(req.session.exampleUserName);
    next();
});

app.get('/', index_route_get);

app.get('/example', example_route_get).post('/example', example_route_post);

app.get('*', any_route_get);