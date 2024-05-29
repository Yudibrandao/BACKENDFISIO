import express,{Request, Response} from 'express';
import { doctorController } from '../controllers/doctorController';
import { authorizeMiddleware } from '../middlewares/authorize';
import { authMiddleware } from '../middlewares/authMiddleware';
import { citaController } from '../controllers/citaController';

const router = express.Router();

/////////      doctor ROUTES      //////////////////

// get all doctor
router.get('/',doctorController.getAll);

///////////     PROTECTED ROUTES    /////////////////////

//create doctor
router.post('/create',authorizeMiddleware(["Admin"]),doctorController.create);


//editar citas doctor
router.put('/doctor/editarCita/:id', authMiddleware, authorizeMiddleware(["doctor"]), citaController.updateCitasDoctor); 


export default router;