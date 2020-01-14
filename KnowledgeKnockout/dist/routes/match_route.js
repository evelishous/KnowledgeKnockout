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
const Sessions_1 = require("../user/Sessions");
const render_1 = require("../views/render");
function match_route_get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield render_1.render(['match'], {
            title: 'match'
        }));
    });
}
exports.match_route_get = match_route_get;
function match_route_post(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) && typeof req.body.isSearchingMatch === 'boolean') {
            req.session.user.isSearchingMatch = req.body.isSearchingMatch;
        }
        if (req.session)
            console.log(Sessions_1.Users.get(req.session.id), req.session);
        res.send(!!((_c = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.isInMatch));
    });
}
exports.match_route_post = match_route_post;
//# sourceMappingURL=match_route.js.map