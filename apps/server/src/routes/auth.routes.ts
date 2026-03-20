import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { AuthController } from '@/controller/auth.controller';

const authRoutes = new Hono();

// Auth routes
authRoutes.post('/login', zValidator('json', loginSchema), AuthController.loginWithGoogle);
authRoutes.post('/logout', AuthController.logOut);

export default authRoutes;
