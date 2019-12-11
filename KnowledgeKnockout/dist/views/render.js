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
const fs_1 = require("fs");
const util_1 = require("util");
function render(paths, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let ret = '';
        for (let path of paths) {
            if (!path.includes('/'))
                path = __dirname + '\\' + path + '.html';
            ret += yield util_1.promisify(fs_1.readFile)(path, { encoding: 'utf-8' });
        }
        let match;
        while ((match = ret.match(/<include (\w+) \/>/)) && match.length > 0) {
            ret = ret.replace(/<include \w+ \/>/, yield render([match[1]], params));
        }
        ret = ret.replace(/<!\-\-.*\-\->/s, '').replace(/>\s*</g, '><').replace(/>(\S*)\s*(\S*)</g, '>$1 $2<');
        let matches = [...new Set(ret.match(/#{\s*\w*\s*}/g))];
        for (let match of matches)
            ret = ret.replace(new RegExp(match, 'g'), params[match.replace(/[#|{|}|\s]*/g, '')]);
        if (process.env.NODE_ENV === 'production')
            ret = ret.replace(/undefined/g, '');
        return ret;
    });
}
exports.render = render;
//# sourceMappingURL=render.js.map