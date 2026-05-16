import { Request, Response, NextFunction } from 'express';

import crypto from 'crypto';

export const traceMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {

    req.headers['x-trace-id'] =
        crypto.randomUUID();

    next();
};