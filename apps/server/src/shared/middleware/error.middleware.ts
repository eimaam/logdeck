import { Context } from 'hono';

export const errorMiddleware = async (err: any, c: Context) => {
  console.error(`[Error] ${c.req.method} ${c.req.url}:`, err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  return c.json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  }, status as any);
};
