import * as compression from 'compression';
import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import { any_route_get } from './routes/any_route';
import { example_route_get, example_route_post } from './routes/example_route';
import { index_route_get } from './routes/index_route';
import { socketiotest_get_route } from './routes/socketiotest_get_route';
import { SocketConnection } from './socket_connection/SocketConnection';
import { ChatExample } from './chat_example';

const app = express();

const server = app.listen(80);

SocketConnection.initialize(server);

app.use(helmet());
app.use(compression());
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: String(process.env.SESSION_SECRET),
    //store: MySQL.sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
    name: process.env.SESSIONID
}));

// initialize session variables
app.use((req, res, next) => {
    if (req.session && !req.session.initialized) {
        req.session.exampleUserName = Math.random();

        req.session.initialized = true;
    }

    next();
});

// example
app.use((req, res, next) => {
    // req obj is the same in all middleware functions and route handlers
    // console.log(req.session?.id);
    next();
});

app.get('/', index_route_get);

app.get('/example', example_route_get).post('/example', example_route_post);

app.get('/socketiotest', socketiotest_get_route);

app.get('*', any_route_get);

ChatExample.initialize();