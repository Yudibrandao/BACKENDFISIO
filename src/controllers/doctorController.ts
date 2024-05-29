import { Request, Response } from "express";
import { Doctor } from "../models/Doctor";
import { userRoles } from "../constants/UserRoles";
import { User } from "../models/User";


export const doctorController = {
    async getAll(req:Request,res:Response){
        try{
        
            const doctor = await Doctor.findAndCount(
                {   
                    relations:{
                        user:true
                    },
                    
                    select:{
                        user:{
                            firstName:true,
                            email:true,
                            
                        },
                    }
                }
            );
            res.json(doctor);

        }catch(error){
            res.status(500).json({message:"Algo salio mal"});
        }
    },

    async create(req:Request,res:Response){
        try{
            const {firstName, email, password,style,area} = req.body;

            if(!firstName || !email || !password ){
                res.status(400).json({message:"No se pudo crear el doctor"});
                return;
            }

            const userExists = await User.findOne({where:{email:email}});

            if(userExists){
                res.status(400).json({message:"Email no valido"});
                return;
            }

            const user = User.create({
                firstName:firstName,
                email:email,
                password:password,
                role:userRoles.DOCTOR
            });

            await User.save(user);

            // const tatuador = Doctor.create({
            //     especialidad:"especialidad",
            //     area:area,
            //     user:user
            // });

            // await Doctor.save(doctor);

            res.status(201).json({message:"Doctor creado con exito"});


        }catch(error){}
    },

}