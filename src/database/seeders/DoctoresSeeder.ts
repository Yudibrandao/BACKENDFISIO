import { seederConfig } from "../../config/seeders";
import { Seeder } from "./Seeder";
import { Doctor } from "../../models/Doctor";
import { User } from "../../models/User";
import { DoctoresFactory } from "../factories/DoctoresFactory";
import { getRandomValueFromArray } from "../../helpers/common";


export class DoctoresSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { DOCTORES } = seederConfig;
    
        // Obtener usuarios con el rol correspondiente
        const users = await User.find({ where: { role: { id: 2 } } });
    
        if (users.length === 0) {
            console.error("No se encontraron usuarios con el rol correspondiente.");
            return;
        }
    
        // Crear doctores y asignar usuarios
        const doctoresFactory = new DoctoresFactory();
        const doctores = doctoresFactory.createMany(DOCTORES);
        doctores.forEach((doctor: Doctor) => {
            // Asignar un usuario aleatorio al doctor
            doctor.user = getRandomValueFromArray(users);
        });
    
        // Guardar los doctores en la base de datos
        await Doctor.save(doctores);
    }
    
}