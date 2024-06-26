import { faker } from "@faker-js/faker";
import { Cita } from "../../models/Cita";
import { Factory } from "./Factory";

export class CitaFactory extends Factory<Cita>{
    public generate(): Cita {
        return {
            day_date: faker.date.future(),
            description: faker.lorem.sentence(),
            price: faker.number.int({ min: 1000, max: 10000 }),
        } as Cita;
    }
}
