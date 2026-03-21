import { Context, Next } from 'hono';
import { db } from '@/shared/db';
import { projects } from '@/shared/db/schema';
import { eq } from 'drizzle-orm';
import { responseHandler } from '@/shared/utils/response';

export const apiKeyMiddleware = async (c: Context, next: Next) => {
  const apiKey = c.req.header('x-api-key');

  if (!apiKey) {
    return responseHandler.unauthorized(c, 'Unauthorized: API key required') 
  }

  try {
    const project = await db.query.projects.findFirst({
      where: eq(projects.apiKey, apiKey),
    });

    if (!project) {
      return responseHandler.unauthorized(c, 'Unauthorized: Invalid API key') 
    }

    c.set('projectId', project.id);
    await next();
  } catch (error) {
    console.error('API Key Middleware Error:', error);
    return c.json({ success: false, message: 'Internal server error' }, 500);
  }
};
