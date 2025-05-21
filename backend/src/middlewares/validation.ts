import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../models/statusCode';
import { IDaoOwner } from '../models/dao.interface';
import { JwtRequest } from '../models/user.model';

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
};

export const validateOwner = <T>(domainDAO: IDaoOwner<T>) => {
    return async (req: JwtRequest, res: Response, next: NextFunction) => {
        const resourceId = Number(req.params.id);
        const ownerId = req.user?.id || -1;

        if (isNaN(resourceId)) {
            return res.status(StatusCode.BAD_REQUEST).json({
                message: 'MIDDLEWARE - Invalid resource ID. Talvez necessário implementar um tratamento mais específico.',
            });
        }

        try {
            const result =  await domainDAO.getByIdAndOwnerId(resourceId, ownerId);
    
            if (!result) {
                return res.status(StatusCode.FORBIDDEN).json({
                    message: 'Apenas o proprietário do projeto pode modificá-lo.',
                });
            }
    
            next();
        } catch (error) {
            console.error('MIDDLEWARE - Error validating owner:', error);
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                status: 500,
                message: 'Erro ao validar o proprietário.',
                error: error instanceof Error ? error.message : error,
            });
        }
    };
}