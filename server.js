const express = require('express');
const app = express();
const port = 8000;
const db = require('./db.json')

//Se levanta el puerto con esto
app.listen(port, function(){
    console.log(`Inicializado en el puerto ${port}`)
    console.log(`http://localhost:${port}`)
})

//Manejar las peticiones

//app.use(respuesta)

app.use(express.json())
//app.get('/', getUserInfo) //Trae algo
app.get('/:id', getSingleUser)
app.post('/', createUser)
app.put('/:id', editUserInfo)
app.delete('/:id', deleteUser);

/*
app.post() //Enviar algo
app.put() //Editar algo
app.delete() //Borrar algo
*/

//Crear función getSingleUser para el método get*

function getSingleUser(request, response){
    const id = request.params.id;
    let sendingUser = {};
    let userFound = false;
    for(let i = 0; i < db.usersList.length; i ++){
        
        if(db.usersList[i].id == id){
            sendingUser = db.usersList[i];
            userFound = true;
        }    
    }
    if (!userFound){
        sendingUser = ["Usuario no encontrado"];
    }
    response.send(sendingUser);
}

/*
function getUserInfo(request, response){
    response.send(db);
}*/

function editUserInfo(request, response){
    const id = request.params.id;
    let userToUpdate = {};
    
    for(let i = 0; i < db.usersList.length; i ++){
        
        if(db.usersList[i].id == id){
            userToUpdate = db.usersList[i];
        }    
    }


    if(request.body.name){
        const newName = request.body.name;
        userToUpdate.name = newName;
    }

    if(request.body.age){
        const newAge = request.body.age;
        userToUpdate.age = newAge;
    }
    
    if(request.body.gender){
        const newName = request.body.gender;
        userToUpdate.gender = newGender;
    }

    if(request.body.ocupation){
        const newAge = request.body.ocupation;
        userToUpdate.ocupation = neOcupation;
    }
    //Agregar las demás propiedades *
    //Hacer que se tome el ID en lugar de la posición*
    response.send(db);
}

function createUser(request, response){
    //TODO Hacer que el ID no se repitan *
    const newUser = request.body.user;

    newUser.id = Math.floor(Math.random()*10);

    for(let i = 0; i < db.usersList.length; i ++){
        if(db.usersList[i].id == newUser.id){
            newUser.id = Math.floor(Math.random()*20.99);
            i = 0;
        }
    }

    
    db.usersList.push(newUser);
    response.send(db);
}

function deleteUser(request, response){
    const id = request.params.id;
    for(let i = 0; i < db.usersList.length; i ++){
        if(db.usersList[i].id == id){
            db.usersList.splice(i, 1);
        }
    }
    response.send(db);
}

/*
function getUserInfo(request, response){
    const usersList = ['Luis', 'Andrea', 'Nayeli'];
    response.send(usersList[1]);
};

function respuesta(request, response, next){
    response.send('Hola, esta es la respuesta de mi super servidor');
    next();
}
*/
