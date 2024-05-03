const { Router } = require('express'); 
//import { uploader } from '../utils.js';
const router = Router();


let users = [];

//router.get('/', (req, res) => {
   // res.send({status:"success", payload:users})
//})


//ENDPOINT traer todos los usuarios usuarios
router.get('/', async (req,res) =>{
    const result = users
    res.send(result)
})

// ENDPOINT -- crear usuario
router.post('/', (req, res ) => {
    //let user = req.body;
    const { first_name, last_name, email, password } = req.body

      if(!first_name || !last_name || !email || !password ){
        return res.send({status: "error", error: "Faltan campos obligatorios"})
      
        const newUser = {
            id: user.length +1, 
            first_name,
            last_name,
            email,
            password
        }
        users.push(newUser)

        res.send({status:"succes",message: "Usuario creado correctamente"})
   }})

   // ENDPOINT -- crear usuario
   //app.post('/api/user', (req, res ) => {
   // let user = req.body;
   //   if(!usuer.fist_name || !user.last_name ){
   //     return res.status(400).send({status: "error", error: "Faltan campos obligatorios"})
   //   }
   // user.push(error);
   // res.send({status:"succes",message: "Usuario creado correctamente"})
   //});


// ENDPOINT traer un usuario por id
router.get('/:uid', (req, res) =>{
    const { uid } = req.params
    const encontrarUsuario = users.find(user => user.id === parseInt(uid))
    if (encontrarUsuario) {
        res.send({status: 'success', payload: encontrarUsuario});
        } else {
          res.status(404).send('Usuario no encontrado');
      }
})

//ENDPOINT actualizar un usuario

router.put('/:uid', (req, res)=> {
    const { uid } = req.params
    const actualizarUsuario = req.body

    const userIndex = users.findIndex(user =>user.id === parseInt(uid))
    if(userIndex === -1) return res.status(404).send({status:'error', error:'Usuario no encontrado'})

    users[userIndex] = {id: parseInt(uid), ...actualizarUsuario}
    res.send({status:'succes', payload: actualizarUsuario})
})

router.delete('/:uid', (req, res) =>{
    const { uid } = req.params

    const userResult = user.filter(user => user.id !== parseInt(uid))
    res.send({status: 'success', payload: userResult})

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