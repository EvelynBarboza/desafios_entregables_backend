const { Router } = require('express');

const router = Router();

router.get('/log', (req, res) =>{
    req.logger.warning('alert!')
    res.send('logs')
})