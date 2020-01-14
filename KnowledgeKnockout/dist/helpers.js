"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randStr = (length) => [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
exports.randomizeArray = (arr) => {
    let copy = arr.slice();
    let newArray = [];
    while (copy.length > 0) {
        newArray.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
    }
    return newArray;
};
exports.asyncTimeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//# sourceMappingURL=helpers.js.map