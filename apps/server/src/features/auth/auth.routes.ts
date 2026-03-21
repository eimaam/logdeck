import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { registerSchema, loginSchema } from './auth.validator';
import { AuthController } from './auth.controller';

const authRoutes = new Hono();

// Auth routes
authRoutes.post('/login', zValidator('json', loginSchema), AuthController.loginWithGoogle);
authRoutes.post('/refresh', AuthController.refreshToken);
authRoutes.post('/logout', AuthController.logOut);

export default authRoutes;
