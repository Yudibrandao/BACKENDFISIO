import { Doctor } from "../../models/Doctor";
import { faker } from "@faker-js/faker";
import { Factory } from "./Factory";

export class DoctoresFactory extends Factory<Doctor> {
    protected generate(): Doctor {
        return {
            especialidad: faker.helpers.arrayElement([
                "Masaje",
                "Terapia"

            ]),
            estilo: faker.helpers.arrayElement([
                "Masaje",
                "Terapia"

            ]),


        } as Doctor;
    }
}