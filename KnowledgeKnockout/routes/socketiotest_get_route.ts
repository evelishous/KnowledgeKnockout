import { Request, Response } from 'express';
import { render } from '../views/render';

export async function socketiotest_get_route(req: Request, res: Response) {
    res.send(await render(['_example_socket.io'], { title: 'socket.io example chat' }));
}