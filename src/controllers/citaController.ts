import { Request, Response } from "express";
import { Cita } from "../models/Cita";
import { Doctor } from "../models/Doctor";
import { Cliente } from "../models/Cliente";
import { Admin } from "typeorm";
import { Role } from "../models/Role";
import { userRoles } from "../constants/UserRoles";
import { User } from "../models/User";

export const citaController = {

    // Get all Citas
    async getAll(req: Request, res: Response) {
        try {
            const [citas, totalCitas] = await Cita.findAndCount({
                select: {
                    id: true,
                    day_date: true,
                    description: true,
                    price: true,
                },
            });

            res.json(citas);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    // Get Cita by ID
    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const cita = await Cita.findOne({
                relations: {
                    doctor: { user: true },
                    cliente: { user: true }
                },
                select: {
                    id: true,
                    day_date: true,
                    description: true,
                    price: true,
                    doctor: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                        }
                    },
                    cliente: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                        }
                    }
                },
                where: {
                    id: id
                }
            });

            if (!cita) {
                return res.status(404).json({ message: "Cita no encontrada" });
            }

            res.json(cita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    // Create Cita
    async create(req: Request, res: Response) {
        try {
            const tokenUser = req.tokenData;
            const { day_date, description, price, Doctor, cliente } = req.body;

            let cita;
            if (tokenUser.userRole === "3") {
                cita = Cita.create({
                    day_date,
                    description,
                    price,
                    doctorID: Doctor,
                    clienteID: tokenUser.userId
                });
            } else if (tokenUser.userRole === "2") {
                cita = Cita.create({
                    day_date,
                    description,
                    price,
                    doctorID: tokenUser.userId,
                    clienteID: cliente
                });
            } else if (tokenUser.userRole === "1") {
                cita = Cita.create({
                    day_date,
                    description,
                    price,
                    doctorID: Doctor,
                    clienteID: cliente
                });
            } else {
                return res.status(403).json({ message: "No tienes permisos para crear citas" });
            }


            await cita.save();
            res.json(cita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salió mal" });
        }
    },

    // Other functions (update, delete, etc.) ...
    
    async updateCitasAdmin(req: Request, res: Response) {
        try {
            const tokenUser = req.tokenData;

            if (tokenUser.userRole !== "1") {
                return res.status(404).json({ message: "Sin permisos" });
            }
            const id = Number(req.params.id);
            const { day_date, description, price, Doctor, Cliente, isActive } = req.body;
            let cita = await Cita.findOne({ where: { id: id } });
            if (!cita) {
                return res.status(404).json({ message: "Cita no encontrada" });
            }

            cita.day_date = day_date;
            cita.description = description;
            cita.price = price;
            cita.doctorID = Doctor;
            cita.clienteID = Cliente;
            // cita.isActive = isActive

            await cita.save();

            res.json(cita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    async updateCitasCliente(req: Request, res: Response) {
        try {
            const tokenUser = req.tokenData;

            if (tokenUser.userRole !== "3") {
                return res.status(404).json({ message: "Sin permisos" });
            }
            const id = Number(req.params.id);
            const { day_date, description, price, Doctor, Cliente, isActive } = req.body;
            let cita = await Cita.findOne({ where: { id: id, clienteID: tokenUser.userId } });
            if (!cita) {
                return res.status(404).json({ message: "Cita no encontrada" });
            }

            cita.day_date = day_date;
            cita.description = description;
            cita.price = price;
            cita.doctorID = Doctor;
            cita.clienteID = Cliente;
            // cita.isActive = isActive

            await cita.save();

            res.json(cita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    async updateCitasDoctor(req: Request, res: Response) {
        try {
            const tokenUser = req.tokenData;

            if (tokenUser.userRole !== "2") {
                return res.status(404).json({ message: "Sin permisos" });
            }
            const id = Number(req.params.id);
            const { day_date, description, price, Doctor, Cliente, isActive } = req.body;
            let cita = await Cita.findOne({ where: { id: id, doctorID: tokenUser.userId } });
            if (!cita) {
                return res.status(404).json({ message: "Cita no encontrada" });
            }

            cita.day_date = day_date;
            cita.description = description;
            cita.price = price;
            cita.doctorID = Doctor;
            cita.clienteID = Cliente;
            // cita.isActive = isActive

            await cita.save();

            res.json(cita);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const cita = await Cita.findOne({ where: { id: id } });

            if (!cita) {
                return res.status(404).json({ message: "Cita no encontrada" });
            }

            await cita.remove();
            res.json({ message: "Cita borrada" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    async getByLogedCliente(req: Request, res: Response) {
        try {
            const citas = await Cita.find({
                relations: {
                    doctor: { user: true },
                    cliente: { user: true }
                },
                select: {
                    id: true,
                    day_date: true,
                    description: true,
                    price: true,
                    doctor: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                        }
                    },
                    cliente: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                        }
                    }
                },
                where: { clienteID: req.tokenData!.userId }
            });

            res.json(citas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    async getByLogedDoctor(req: Request, res: Response) {
        try {
            const citas = await Cita.find({
                relations: {
                    doctor: { user: true },
                    cliente: { user: true }
                },
                select: {
                    id: true,
                    day_date: true,
                    description: true,
                    price: true,
                    doctor: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                        }
                    },
                    cliente: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                        }
                    }
                },
                where: { doctorID: req.tokenData!.userId }
            });

            res.json(citas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

    async getByLogedAdmin(req: Request, res: Response) {
        try {
            const citas = await Cita.find({
                relations: {
                    doctor: { user: true },
                    cliente: { user: true }
                },
                select: {
                    id: true,
                    day_date: true,
                    description: true,
                    price: true,
                    doctor: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                        }
                    },
                    cliente: {
                        id: true,
                        user: {
                            firstName: true,
                            email: true,
                        }
                    }
                }
            });

            res.json(citas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Algo salio mal" });
        }
    },

}
