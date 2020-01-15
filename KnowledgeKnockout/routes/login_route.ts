import { Request, Response } from 'express';
import { Authentication } from '../user/Authentication';
import { render } from '../views/render';

export async function login_route_get(req: Request, res: Response) {
    res.send(await render(['login'], {
        title: 'Login'
    }));
}

export async function login_route_post(req: Request, res: Response) {
    if (req.body.name && req.body.password && req.session && !req.session.user) {
        req.session.user = await Authentication.login(req.body.name, req.body.password);
        if (req.session.user) {
            req.session.user.sessionID = req.session.id;
            res.redirect('/mainpage');
        }
    }

    res.send(!!req.session?.user);
}