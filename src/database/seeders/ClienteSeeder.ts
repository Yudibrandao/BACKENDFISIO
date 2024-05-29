import { Cliente } from "../../models/Cliente";
import { Seeder } from "./Seeder";
import { seederConfig } from "../../config/seeders";
import { User } from "../../models/User";
import { ClienteFactory } from "../factories/ClienteFactory";
import { getRandomValueFromArray } from "../../helpers/common";

export class ClienteSeeder extends Seeder{
    protected async generate(): Promise<void> {
        const { CLIENTE } = seederConfig;
    
        // Obtener usuarios con el rol correspondiente
        const users = await User.find({ where: { role: { id: 3 } } });
    
        if (users.length === 0) {
            console.error("No se encontraron usuarios con el rol correspondiente.");
            return;
        }
    
        // Crear clientes y asignar usuarios
        // const ClienteFactory = new ClienteFactory();
        const cliente = new ClienteFactory().createMany(CLIENTE);
        const newClientes: User[] = []
        cliente.forEach((cliente: { user: User; }) =>{
            const user = users.pop()
            if(user) 
                return cliente.user = user
            }
        )

        // const clientes = clienteFactory.createMany(CLIENTE);
        // clientes.forEach((cliente: Cliente) => {
        //     // Asignar un usuario aleatorio al cliente
        //     cliente.user = getRandomValueFromArray(users);
        // });
    
        // Guardar los clientes en la base de datos
        await Cliente.save(cliente);
    }
}