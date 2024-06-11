const { Router } = require('express');
const { UserManagerMongo } = require('../dao/userManagerMongo.js')

//const router = Router()

//session login-register-logout

export const sessionRouter = Router();

const userService = new UserManagerMongo();

sessionRouter.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body
            if (!email || !password) return res.status(401).send({status: 'error', error: 'Se deben completar todos los sampos'})

        const userExist = await userService.getUserBy(email)
            if(userExist) return res.status(401).send({status: 'error', error: 'Este usuario ya existe'})
    
        const newUser = {
        first_name,
        last_name,
        email,
        password
    }

    const result = await userService.createUser(newUser)
    //validar el resultado
    console.log(result)

    res.send ('Usuario registardo')

    } catch (error) {
        console.error('error')
    }
})

sessionRouter.post( '/login', async (req, res) =>{
    try {
        const { email, password } = req.body
            if (!email || !password) return res.status(401).send({status: 'error', error: 'Se deben completar todos los campos'})
        //if (email !== 'algunmail que traiga de la base de datos' || password !== 'con la password del mismo mail') return res.send('login fallo')
        const userFound = await userService.getUserBy({email, password})
            if(!userFound) return res.status(401).send({status: 'error', error: 'Usuario no encontrado'})
    
        req.session.user = {
            email,
            first_name,
            last_name,
            admin: userFound.role === 'admin'
        }
        console.log(req.session.user)
        res.send('login success')
    } catch (error) {
        console.error('error')
    }
})

sessionRouter.get('/current', auth, (req, res) =>{
    res.send('Datos sensibles que solo puede ver el admin')
})

sessionRouter.get('/session', async (req, res) =>{
    try {
        if (req.session.counter) {
            req.session.counter++
            res.send(`Se ah visitado el sitio ${req.session.counter} veces.`)
            }else {
            req.session.counter = 1
            res.send('Biendvenides')
            }
    } catch (error) {
        console.error(error)
    }
})

sessionRouter.get('/logout', async (req, res) => {
    req.session.destroy(err =>{
        if (err) return res.send({ status: 'error', error: err})
            else return res.render('login')
    })
})

