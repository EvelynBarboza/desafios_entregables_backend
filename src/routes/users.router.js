const { Router } = require('express'); 
const { usersModel } = require('../models/users.models.js');
//import { uploader } from '../utils.js';
const router = Router();



//ENDPOINT traer todos los usuarios usuariosn api/users
router.get('/', async (req,res) =>{
    const users = await usersModel.find({})
    res.send({status: 'success', payload: users})
})

// ENDPOINT -- crear usuario
router.post('/', async (req, res ) => {
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
   })


// ENDPOINT traer un usuario por id
router.get('/:uid', async (req, res) =>{
    const { uid } = req.params
    const encontrarUsuario = await usersModel.findOne({_id: uid})
    if (encontrarUsuario) {
        res.send({status: 'success', payload: encontrarUsuario});
        } else {
          res.status(404).send('Usuario no encontrado');
      }
})



//ENDPOINT actualizar un usuario
router.put('/:uid', async (req, res)=> {
    const { uid } = req.params
    const { first_name, last_name, email } = req.body

    //const userIndex = users.findIndex(user =>user.id === parseInt(uid))
    //if(userIndex === -1) return res.status(404).send({status:'error', error:'Usuario no encontrado'})
    //users[userIndex] = {id: parseInt(uid), ...actualizarUsuario}
    if (!first_name, !last_name, !email) return res.send({status: 'error', error: 'faltan campos obligatorios'})
    const result = await usersModel.updateOne({_id: uid}, {first_name, last_name, email})
    res.send({status:'succes', payload: result})
})



//ENDPOINT eliminar usuario
router.delete('/:uid', async (req, res) =>{
    const { uid } = req.params

    //const userResult = user.filter(user => user.id !== parseInt(uid))
    const result = await usersModel.deleteOne({_id: uid})
    res.send({status: 'success', payload: result})

})





    

//para subir un archivo se guarda en req.file
//router.post('/',uploader.single('file'), (req,res)=>{
   // if (!req.file){
   //     return res.statuus(400).send({status:"error", error: "No se puede guardar la imagen"})
   // }
   // console.log(req.file);
   // let user = req.body;
  //  user.profile = req.file.path;
  //  users.push(user);
  //  res.send({status:"Success", message:"User created"})
//})

// uploader.array para subir muchos archivos se guarda en req.files

module.exports = router;