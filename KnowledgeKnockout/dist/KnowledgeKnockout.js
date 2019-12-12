"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compression = require("compression");
const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const any_route_1 = require("./routes/any_route");
const example_route_1 = require("./routes/example_route");
const index_route_1 = require("./routes/index_route");
const socketiotest_get_route_1 = require("./routes/socketiotest_get_route");
const SocketConnection_1 = require("./socket_connection/SocketConnection");
const app = express();
const server = app.listen(80);
SocketConnection_1.SocketConnection.initialize(server);
app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    //store: MySQL.sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
    name: process.env.SESSIONID
}));
// initialize session variables
app.use((req, res, next) => {
    if (!req.session.initialized) {
        req.session.exampleUserName = Math.random();
        req.session.initialized = true;
    }
    next();
});
// example
app.use((req, res, next) => {
    // req obj is the same in all middleware functions and route handlers
    console.log(req.session.id);
    next();
});
app.get('/', index_route_1.index_route_get);
app.get('/example', example_route_1.example_route_get).post('/example', example_route_1.example_route_post);
app.get('/socketiotest', socketiotest_get_route_1.socketiotest_get_route);
app.get('*', any_route_1.any_route_get);
//# sourceMappingURL=KnowledgeKnockout.js.map