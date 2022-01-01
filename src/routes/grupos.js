const express = require('express');
const router = express.Router();

const pool = require('../database');
const isAuthInApi = require('../lib/authapi')

//api 
router.get('/api', isAuthInApi ,async(req,res)=>{
    const from = req.headers['nivel']+'%';
    console.log(from)
    try {
        await pool.query("SELECT * FROM grupos WHERE FCGRUPO LIKE ? AND Nivel = 2 order by FCDESC asc",[from],(err,rows,fields)=>{
            if(!err){
                res.json({listas:rows})
            } else{
              res.sendStatus(400).send('error en la consulta');
              return
            }
        })
    } catch (error) {
        res.sendStatus(500).send('Fallo inesperado, por favor intente despues')
    }
})

//

module.exports = router;
