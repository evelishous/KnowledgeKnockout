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
function example_route_get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(JSON.stringify(req.query));
    });
}
exports.example_route_get = example_route_get;
function example_route_post(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(req.body);
    });
}
exports.example_route_post = example_route_post;
//# sourceMappingURL=example_route.js.map