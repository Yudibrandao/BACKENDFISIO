import express from 'express';
import usersRoutes from './users.routes';
import baseRoutes from './base.routes';
import citasRoutes from './citas.routes';
import authRoutes from './auth.routes';
import doctoresRoutes from './doctores.routes'

const router = express.Router();

////// API ROUTES

// users routes
router.use('/users', usersRoutes);

// citas routes
router.use('/citas', citasRoutes);

// auth routes
router.use('/auth',authRoutes);

// doctores routes
router.use('/doctores',doctoresRoutes);

export default router;