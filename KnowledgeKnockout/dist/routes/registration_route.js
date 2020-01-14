"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const Authentication_1 = require("../user/Authentication");
function registration_route_get(req, res) {
    res.sendFile(path_1.resolve('./public/HMTL_CSS/html/registration.html'));
}
exports.registration_route_get = registration_route_get;
function registration_route_post(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.name && req.body.password && req.body.email && req.session && !req.session.user) {
            req.session.user = yield Authentication_1.Authentication.register(req.body.name, req.body.password, req.body.email);
            if (req.session.user)
                req.session.user.sessionID = req.session.id;
        }
        console.log(req.body);
        res.send(!!((_a = req.session) === null || _a === void 0 ? void 0 : _a.user));
    });
}
exports.registration_route_post = registration_route_post;
//# sourceMappingURL=registration_route.js.map