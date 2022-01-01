const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send('Toma Pedidos Version 1.0')
 
})

module.exports = router;