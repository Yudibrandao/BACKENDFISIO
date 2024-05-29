import express,{Request, Response} from 'express';
import { doctorController } from '../controllers/doctorController';
import { authorizeMiddleware } from '../middlewares/authorize';
import { authMiddleware } from '../middlewares/authMiddleware';
import { citaController } from '../controllers/citaController';

const router = express.Router();

/////////      tatuadorS ROUTES      //////////////////

// get all tatuadors
router.get('/',doctorController.getAll);

///////////     PROTECTED ROUTES    /////////////////////

//create tatuador
router.post('/create',authorizeMiddleware(["Admin"]),doctorController.create);


//editar citas tatuador
router.put('/doctor/editarCita/:id', authMiddleware, authorizeMiddleware(["doctor"]), citaController.updateCitasTatuador); 


export default router;