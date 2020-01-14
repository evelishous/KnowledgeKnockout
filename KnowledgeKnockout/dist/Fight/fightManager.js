"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sessions_1 = require("../user/Sessions");
const fight_1 = require("./fight");
class FightManager {
    static initialize() {
        setInterval(FightManager.createMatches, 5000);
    }
    static createMatches() {
        const searchingUsers = [...Sessions_1.Users.users.values()];
        const sortedUsers = searchingUsers.sort((a, b) => a.avatarTotalLevel - b.avatarTotalLevel);
        for (let i = sortedUsers.length - 1; i > 0; i -= 2) {
            if (i - 1 >= 0) {
                console.log('creating match');
                new fight_1.Fight([sortedUsers[i].sessionID, sortedUsers[i - 1].sessionID]);
                sortedUsers[i].isSearchingMatch = sortedUsers[i - 1].isSearchingMatch = false;
            }
        }
    }
}
exports.FightManager = FightManager;
//# sourceMappingURL=fightManager.js.map