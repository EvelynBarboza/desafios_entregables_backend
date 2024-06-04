const { Router } = require('express')

const router = Router()

//session

router.get('/session', (req, res) =>{
    if (req.session.counter) {
        req.session.counter++
        res.send(`Se ah visitado el sitio ${req.session.counter} veces.`)
    }else {
        req.session.counter = 1
        res.send('Biendvenides')
    }
})


//cookies

router.get('/setCookie', (req, res) =>{
    res.cookie('CoderCookie', 'Esto es una cookie', {maxAge: 10000}).send('cookie')
});

router.get('/setCookieSigned', (req, res) =>{
    res.cookie('CoderCookie', 'Esto es una cookie', {maxAge: 10000, signed: true}).send('cookie signed')
});

router.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})

router.get('/deleteCockie', (req, res) =>{
    res.clearCookie('CoderCookie').send(' Cookie borrada')
})

module.exports = router