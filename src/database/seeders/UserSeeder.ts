import { seederConfig } from "../../config/seeders";
import { userRoles } from "../../constants/UserRoles";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Seeder } from "./Seeder";

export class UserSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const { ADMINS, DOCTORES, CLIENTE } = seederConfig;
  
      const userFactory = new UserFactory();
  
      // admins
      const adminUsers = userFactory.createMany(ADMINS);
      adminUsers.forEach((user) => {
          user.role_id = userRoles.ADMIN.id; // Asignar el role_id correspondiente al rol de administrador
      });
  
      // doctores
      const doctorUsers = userFactory.createMany(DOCTORES);
      doctorUsers.forEach((user) => {
          user.role_id = userRoles.DOCTOR.id; // Asignar el role_id correspondiente al rol de doctor
      });
  
      // clientes
      const clienteUsers = userFactory.createMany(CLIENTE);
      clienteUsers.forEach((user) => {
          user.role_id = userRoles.CLIENTE.id; // Asignar el role_id correspondiente al rol de cliente
      });
  
      // Guardar los usuarios en la base de datos
      const allUsers = [...adminUsers, ...doctorUsers, ...clienteUsers];
      await User.save(allUsers);
  }
  
 }