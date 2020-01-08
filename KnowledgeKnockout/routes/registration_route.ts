import { Request, Response } from 'express';
import { resolve } from 'path';
import { Authentication } from '../user/Authentication';

export function register_route_get(req: Request, res: Response) {
    res.sendFile(resolve('./dist/views/registration.html'));
}

export function register_route_post(req: Request, res: Response) {
    if (req.body.name && req.body.password && req.body.email && req.session && !req.session.user) {
        req.session.user = Authentication.register(req.body.name, req.body.password, req.body.email);
    }

    res.send(!!req.session?.user);
}