import { Request, Response } from 'express';

export async function example_route_get(req: Request, res: Response) {
    res.send(JSON.stringify(req.query));
}

export async function example_route_post(req: Request, res: Response) {
    res.send(req.body);
}