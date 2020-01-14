"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// initialize env variables
const dotenv_1 = require("dotenv");
for (const [key, val] of Object.entries(dotenv_1.config().parsed)) {
    process.env[key] = val;
}
const compression = require("compression");
const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const fightManager_1 = require("./Fight/fightManager");
const add_question_route_1 = require("./routes/add_question_route");
const any_route_1 = require("./routes/any_route");
const index_route_1 = require("./routes/index_route");
const login_route_1 = require("./routes/login_route");
const logout_route_1 = require("./routes/logout_route");
const match_route_1 = require("./routes/match_route");
const registration_route_1 = require("./routes/registration_route");
const socketiotest_get_route_1 = require("./routes/socketiotest_get_route");
const training_route_1 = require("./routes/training_route");
const SocketConnection_1 = require("./socket_connection/SocketConnection");
const Authentication_1 = require("./user/Authentication");
const Sessions_1 = require("./user/Sessions");
const app = express();
const server = app.listen(80);
SocketConnection_1.SocketConnection.initialize(server);
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
app.use((req, res, next) => {
    var _a, _b;
    if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) && !Sessions_1.Users.get(req.session.id))
        Sessions_1.Users.add(req.session.user);
    if ((_b = req.session) === null || _b === void 0 ? void 0 : _b.user)
        req.session.user = Sessions_1.Users.get(req.sessionID || '');
    next();
});
app.get('/', index_route_1.index_route_get);
app.get('/socketiotest', socketiotest_get_route_1.socketiotest_get_route);
app.get('/add-question', Authentication_1.Authentication.loginCheck, add_question_route_1.add_question_route_get).post('/add-question', add_question_route_1.add_question_route_post);
app.get('/register', registration_route_1.registration_route_get).post('/register', registration_route_1.registration_route_post);
app.get('/login', login_route_1.login_route_get).post('/login', login_route_1.login_route_post);
app.get('/logout', logout_route_1.logout_route_get);
app.get('/training', Authentication_1.Authentication.loginCheck, training_route_1.training_route_get).post('/training', training_route_1.training_route_post);
app.get('/match', Authentication_1.Authentication.loginCheck, match_route_1.match_route_get).post('/match', match_route_1.match_route_post);
app.get('*', any_route_1.any_route_get);
fightManager_1.FightManager.initialize();
//# sourceMappingURL=KnowledgeKnockout.js.map