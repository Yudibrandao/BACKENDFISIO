# BACKEND CONSULTORIO DE FISIOTERAPIA

# OBEJTIVOS DEL PROYECTO
El proyecto final consta de dos partes, Frontend y Backend. Se espera que el alumnado demuestre todos los conocimientos adquiridos a lo largo de la formación. Respecto a la parte backend, el alumnado combinará los conocimientos adquiridos en las diferentes tecnologías Backend.

# TECNOLOGIAS UTILIZADAS 
<div alineacion ="center">

<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>

<a href="https://nodejs.org/en">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>

<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>

<a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-blue?style=for-the-badge&logo=typescript&logoColor=white">
</a>

 </div>

 # VISTA VISUAL STUDIO CODE
![Imagen](/img/Vista%201.png)


# DIAGRAMA BACKEND  
![Imagen DB](/img/Diagrama%20.png)

# INFORMACION DEL PROYECTO

Se desarrollo un proyecto relacionado en un consultorio de Fisioterapia, se espera que el alumnado desarrolle una API REST para nutrir las vistas de frontend. La cual sea capaz de:

    Admin:
1. Consultar su perfil
2. Consultar usuarios, editarlos y desactivarlos.
3. Consultar citas, editar y borrarlas.

    Doctores:
1. Consultar sus propias citas.

    Usuarios:

1. Registrar usuarios.
2. Acceder con su usuario.
3. Editar perfil.


# ENDPOINTS DEL PROYECTO

● Registro de usuarios.

POST http://localhost:3000/api/users/create


● Login de usuarios.

POST http://localhost:3000/api/users/login


● Perfil de usuario.

GET http://localhost:3000/api/users/profile/



● Modificación de datos del perfil.

PUT http://localhost:3000/api/users/profile/update


● Creación de citas.

POST http://localhost:3000/api/users/create



● Editar citas.

PUT http://localhost:3000/api/users/admin/editarUsuario/id



● Ver todas las citas que tengo como cliente (solo como cliente).

GET http://localhost:3000/api/cita/cliente/cita
citas/doctor/cita


● Ver todas las citas existentes (como doctor).

GET http://localhost:3000/api/citas/doctor/cita


