import { Role } from "../models/Role"

export const userRoles: Record<string, Role> = {
    ADMIN:  {id:1,name:"admin"}  as Role, 
    DOCTOR: {id:2,name:"doctor"} as Role,
    CLIENTE: {id:3,name:"cliente"} as Role
}