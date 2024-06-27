class userController {
    constructor(){

    }

//traer todos los usuarios
    getUsers = async (req,res) =>{
        const users = await usersModel.find({}).explain('executionStats')
        res.send({status: 'success', payload: users})
    }
    
//traer un usuario por id
    getUser = async (req, res) =>{
        const { uid } = req.params
        const encontrarUsuario = await usersModel.findOne({_id: uid})
        if (encontrarUsuario) {
            res.send({status: 'success', payload: encontrarUsuario});
            } else {
              res.status(404).send('Usuario no encontrado');
          }
    }

//crear un usuario
    createUser = async (req, res ) => {
        //let user = req.body;
        const { first_name, last_name, email } = req.body
    
          if(!first_name || !last_name || !email ) return res.send({status: "error", error: "Faltan campos obligatorios"})
    
          const newUser = {
            first_name,
            last_name,
            email
          }
    
          const result = await usersModel.create(newUser)
    
            res.send({status:"succes", payload: result})
       }

//actualizar un usuario
    updateUser = async (req, res)=> {
        const { uid } = req.params
        const { first_name, last_name, email } = req.body
    
        //const userIndex = users.findIndex(user =>user.id === parseInt(uid))
        //if(userIndex === -1) return res.status(404).send({status:'error', error:'Usuario no encontrado'})
        //users[userIndex] = {id: parseInt(uid), ...actualizarUsuario}
        if (!first_name, !last_name, !email) return res.send({status: 'error', error: 'faltan campos obligatorios'})
        const result = await usersModel.updateOne({_id: uid}, {first_name, last_name, email})
        res.send({status:'succes', payload: result})
    }

//eliminar un usuario
    deleteUser = async (req, res) =>{
        const { uid } = req.params
    
        //const userResult = user.filter(user => user.id !== parseInt(uid))
        const result = await usersModel.deleteOne({_id: uid})
        res.send({status: 'success', payload: result})
    
    }
}

module.exports = userController