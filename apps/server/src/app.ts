import { Context, Hono } from 'hono';
import { logger as honoLogger } from 'hono/logger';
import { cors } from 'hono/cors';
import { errorMiddleware } from './middleware/error.middleware';
import authRoutes from './routes/auth.routes';

const app = new Hono();

// global middleware
app.use("*", honoLogger());

// cors
app.use("*", cors({
    origin: (origin) => origin,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true
}));

// API Routes (v1)
app.route('/api/v1/auth', authRoutes);

// Health check
app.get('/health', (c: Context) => c.json({ status: 'ok', uptime: process.uptime() }));
app.get('/', (c: Context) => c.text('LogDeck API running'));

// error handler
app.onError(errorMiddleware);

export default app;