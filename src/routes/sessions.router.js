const { Router } = require('express');

//const router = Router()

//session login-register-logout

export const sessionRouter = Router();

sessionRouter.post( '/login', (req, res) =>{
    const { email, password } = req.body
        if (email !== 'algunmail que traiga de la base de datos' || password !== 'con la password del mismo mail') return res.send('login fallo')

        req.session.user = {
            email,
            admin: true
        }
        res.send('login success')

})

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(err =>{
        if (err) return res.send({ status: 'error', error: err})
            else return res.send('logout')
    })
})

