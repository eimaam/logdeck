import { Context } from 'hono';
import { sendError } from '@/utils/response';

export type ControllerHandler = (c: Context) => Promise<Response | void> | Response | void;

export const catchAsync = (handler: ControllerHandler) => {
    return async (c: Context) => {
        try {
            const response = await handler(c);
            return response;
        } catch (error: any) {
            console.error('controller Error:', error);
            return sendError({ c, message: error.message || 'Internal Server Error', error });
        }
    };
};
