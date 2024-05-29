import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";
import { DoctoresSeeder } from "./DoctoresSeeder";
import { ClienteSeeder } from "./ClienteSeeder";
import { CitaSeeder } from "./CitaSeeder";

(async () =>{
    console.log('starting seeding')
    await new RoleSeeder().start();
    await new UserSeeder().start();
    await new DoctoresSeeder().start();
    await new ClienteSeeder().start();
    await new CitaSeeder().start();
})()