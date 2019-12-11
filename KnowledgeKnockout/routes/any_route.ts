import { Request, Response } from "express";

export function any_route_get(req: Request, res: Response) {
    res.send('error 404: page not found');
}