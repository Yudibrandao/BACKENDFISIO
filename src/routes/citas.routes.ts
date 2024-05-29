import express from 'express';
import { citaController } from '../controllers/citaController'; 
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeMiddleware } from '../middlewares/authorize';
import { userController } from '../controllers/userController';
const router = express.Router();

/////////      CITAS ROUTES      //////////////////

//create cita
router.post('/create', authMiddleware, authorizeMiddleware(["Admin", "Doctor", "cliente"]), citaController.create); 


//get citas by client
router.get('/cliente/cita', authMiddleware, authorizeMiddleware(["cliente"]), citaController.getByLogedCliente); 

//get citas by doctor
router.get('/doctor/cita', authMiddleware, authorizeMiddleware(["doctor"]), citaController.getByLogedDoctor); 

//lista Citas Admin
router.get('/admin/listaCitas', authMiddleware, authorizeMiddleware(["Admin", "cliente"]), citaController.getByLogedAdmin); 


//////////////////// PROTECTED ROUTES //////////////////////

//get all citas
router.get('/', authMiddleware, authorizeMiddleware(["Admin"]), citaController.getAll); 



//editar citas cliente
router.put('/cliente/editarCita/:id', authMiddleware, authorizeMiddleware(["cliente"]), citaController.updateCitasCliente); 

//editar citas doctor
router.put('/doctor/editarCita/:id', authMiddleware, authorizeMiddleware(["doctor"]), citaController.updateCitasDoctor); 

//edit cita
router.put('/editarCita/:id', authMiddleware, authorizeMiddleware(["Admin"]), citaController.updateCitasAdmin); 

//delete cita
router.delete('/:id', authMiddleware, authorizeMiddleware(["Cliente", "Doctor"]), citaController.delete); 

//get cita by id
router.get('/:id', authMiddleware, authorizeMiddleware(["Admin"]), citaController.getById); 

export default router;
