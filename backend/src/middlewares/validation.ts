import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../models/statusCode';

export const validateInputData = (schema: z.ZodSchema<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                message: 'Invalid input data',
                errors: result.error.errors,
            });
        }
        req.body = result.data;
        next();
    };
}