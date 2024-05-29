import { seederConfig } from "../../config/seeders";
import { Seeder } from "./Seeder";
import { Cita } from "../../models/Cita";
import { CitaFactory } from "../factories/CitasFactory";
import { getRandomValueFromArray } from "../../helpers/common";
import { Doctor } from "../../models/Doctor";
import { Cliente } from "../../models/Cliente";

export class CitaSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { CITAS } = seederConfig;

        // Obtener todos los doctores y clientes disponibles
        const doctores = await Doctor.find();
        const clientes = await Cliente.find();

        // Crear instancias de citas
        const citaFactory = new CitaFactory();
        const citas = citaFactory.createMany(CITAS);

        // Asignar aleatoriamente un doctor y un cliente a cada cita
        citas.forEach((cita) => {
            const randomDoctor = getRandomValueFromArray(doctores);
            const randomCliente = getRandomValueFromArray(clientes);
            cita.doctorID = randomDoctor.id; 
            cita.clienteID = randomCliente.id;
        });

        // Guardar las citas en la base de datos
        await Cita.save(citas);
    }
}
