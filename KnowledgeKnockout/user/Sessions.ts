export class Sessions {
    private static sessions: Map<string, any>;
    public static get(sessionID: string): any {
        return Sessions.sessions.get(sessionID);
    }
    public static add(session: any) {
        Sessions.sessions.set(session.id, session);
    }
    public static remove(sessionID: string) {
        Sessions.sessions.delete(sessionID);
    }
}