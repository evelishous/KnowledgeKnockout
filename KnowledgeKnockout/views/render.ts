import { readFile } from "fs";
import { promisify } from "util";

export async function render(paths: string[], params: any, options?: { removeWhitespace: true }) {
    let ret = '';

    for (let path of paths) {
        if (!path.includes('/')) path = __dirname + '\\' + path + '.html';
        ret += await promisify(readFile)(path, { encoding: 'utf-8' });
    }

    let match: RegExpMatchArray;
    while ((match = ret.match(/<include (\w+) \/>/)) && match.length > 0) {
        ret = ret.replace(/<include \w+ \/>/, await render([ret.match(/<include (\w+) \/>/)[1]], params, options));
    }

    ret = ret.replace(/<!\-\-.*\-\->/s, '');

    if (options?.removeWhitespace) ret = ret.replace(/>\s*</g, '><').replace(/>(\S*)\s*(\S*)</g, '>$1 $2<');

    let matches = [...new Set(ret.match(/#{\s*\w*\s*}/g))];

    for (let match of matches) ret = ret.replace(new RegExp(match, 'g'), params[match.replace(/[#|{|}|\s]*/g, '')]);

    if (process.env.NODE_ENV === 'production') ret = ret.replace(/undefined/g, '');

    return ret;
}