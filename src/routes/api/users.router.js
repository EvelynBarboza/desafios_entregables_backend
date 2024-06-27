const { Router } = require('express'); 
const userController = require('../../controllers/users.controller');

const router = Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser

} = userController()

//TARER TODOS LOS USUARIOS
router.get('/', getUsers)

// TRAER UN USUARIO POR ID
router.get('/:uid', getUser)

// CREAR UN USUARIO
router.post('/', createUser)

//ACTUALIZAR UN USUARIO
router.put('/:uid', updateUser)

//ELIMINAR UN USUARIO
router.delete('/:uid', deleteUser)



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