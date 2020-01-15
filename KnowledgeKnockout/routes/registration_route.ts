import { Request, Response } from 'express';
import { Authentication } from '../user/Authentication';
import { render } from '../views/render';

export async function registration_route_get(req: Request, res: Response) {
    res.send(await render(['registration'], {
        title: 'Registrieren'
    }));
}

export async function registration_route_post(req: Request, res: Response) {
    if (req.body.name && req.body.password && req.body.email && req.session && !req.session.user) {
        req.session.user = await Authentication.register(req.body.name, req.body.password, req.body.email);
        if (req.session.user) {
            req.session.user.sessionID = req.session.id;
        }
    }

    console.log(req.body);

    res.send(!!req.session?.user);
}