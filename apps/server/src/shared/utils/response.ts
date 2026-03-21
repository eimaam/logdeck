import { config } from '@/config/envs';
import { NodeEnvEnum } from '@logdeck/shared';
import { Context } from 'hono';
import { ContentfulStatusCode } from 'hono/utils/http-status';

export interface ISuccessResponse {
    c: Context;
    message: string;
    data?: any;
    meta?: {
        [key: string]: any;
    }
}

interface IErrorResponse {
    c: Context;
    message: string;
    error?: any;
    status?: ContentfulStatusCode;
    code?: string;
}

export const sendResponse = (
    c: Context,
    message: string,
    data: any = null,
    status: ContentfulStatusCode = 200,
    code?: string
) => {
    return c.json(
        {
            success: status >= 200 && status < 300,
            message,
            data,
            code,
        },
        status
    );
};

export const sendSuccess = ({
    c,
    message,
    data,
}: ISuccessResponse) => {
    return c.json(
        {
            success: true,
            message,
            data,
        },
        200
    );
};

export const sendError = ({
    c,
    message,
    status = 500,
    error,
    code
}: IErrorResponse) => {
    return c.json(
        {
            success: false,
            message,
            error: config.environment === NodeEnvEnum.DEVELOPMENT ? error : undefined,
            code,
        },
        status
    );
};

/**
 * throwable error with standard response format
 * @param message 
 * @param status HTTP status code
 * @param error 
 * @param code 
 */
export const throwHttpError = (
    message: string,
    statusCode: number = 500,
    code?: string,
    error?: any
): never => {
    const throwableError = new Error(message) as Error & { statusCode: number; code?: string; error?: any };
    throwableError.statusCode = statusCode;
    throwableError.code = code;
    throwableError.error = process.env.NODE_ENV === "production" ? undefined : error;

    throw throwableError;
};

/**
 * custom response handlers for various http status codes
 * @param c Hono context
 * @param message error message
 * @param data response data
 * @param status HTTP status code
 * @param error error object
 * @param code custom error code
 */
export const responseHandler = {
    /**
     * Send an error 400
     * @param c Hono context
     * @param message error message
     * @param error optional error object
     * @param code optional custom error code
     * @returns 
     */
    badRequest: (c: Context, message: string, error?: any, code?: string) => {
        return sendError({
            c,
            message,
            status: 400,
            error,
            code
        });
    },
    /**
     * 
     * @param c Hono context
     * @param message error message
     * @param error optional error object
     * @param code optional custom error code
     * @returns 
     */
    unauthorized: (c: Context, message: string, error?: any, code?: string) => {
        return sendError({ c, message, status: 401, error, code });
    },
    /**
     * 
     * @param c Hono context
     * @param message error message
     * @param error optional error object
     * @param code optional custom error code
     * @returns 
     */
    forbidden: (c: Context, message: string, error?: any, code?: string) => {
        return sendError({ c, message, status: 403, error, code });
    },
    /**
     * Sends a 404 Not Found response
     */
    notFound: (c: Context, message: string, data?: any, code?: string) => {
        return sendError({ c, message, status: 404, error: message, code });
    },
    /**
     * Sends a 405 Method Not Allowed response
     */
    methodNotAllowed: (c: Context, message: string, data?: any, code?: string) => {
        return sendError({ c, message, status: 405, error: message, code });
    },
    /**
     * Sends a 408 Request Timeout response
     */
    requestTimeout: (c: Context, message: string, data?: any, code?: string) => {
        return sendError({ c, message, status: 408, error: message, code });
    },
    /**
     * Sends a 409 Conflict response
     */
    conflict: (c: Context, message: string, data?: any, code?: string) => {
        return sendError({ c, message, status: 409, error: message, code });
    },
    /**
     * Sends a 429 Too Many Requests response
     */
    tooManyRequests: (c: Context, message: string, data?: any, code?: string) => {
        return sendError({ c, message, status: 429, error: message, code });
    },
    /**
     * Sends a 500 Internal Server Error response
     */
    internalServerError: (c: Context, message: string, data?: any, code?: string) => {
        return sendError({ c, message, status: 500, error: message, code });
    },



}




