"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randStr = (length) => [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
//# sourceMappingURL=helpers.js.map