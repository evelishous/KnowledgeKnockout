import { User } from '../user/User';
import { Fight } from './Fight';
import { asyncTimeout } from '../helpers';

export class FightManager {
    public static searchingUsers: User[] = [];
    public static async start(): Promise<void> {
        FightManager.searchingUsers = FightManager.searchingUsers.filter(user => user.isSearchingMatch);
        const sortedUsers = FightManager.searchingUsers.sort((a, b) => a.avatarTotalLevel - b.avatarTotalLevel);

        for (let i = sortedUsers.length - 1; i > 0; i -= 2) {
            if (i - 1 >= 0) {
                console.log('creating match');
                console.log(sortedUsers);
                new Fight([sortedUsers[i], sortedUsers[i - 1]]);
                sortedUsers[i].isSearchingMatch = sortedUsers[i - 1].isSearchingMatch = false;
            }
        }

        await asyncTimeout(5000);

        FightManager.start();
    }
}