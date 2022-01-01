const express = require('express');
const router = express.Router();

const pool = require('../database');
const isAuthInApi = require('../lib/authapi')

//api 
router.get('/api', isAuthInApi ,async(req,res)=>{
    try {
        await pool.query('SELECT * FROM mesas ',(err,rows)=>{
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

router.put('/api', isAuthInApi ,async(req,res)=>{
    const mesa = req.body
    numero = Number(mesa.NRO)
    try {
        await pool.query('UPDATE mesas set ? where NRO =?',[mesa,numero],(err)=>{
            if(!err){
                res.sendStatus(200)
            } else{
              res.sendStatus(400).send('error en la consulta');
              return
            }
        })
    } catch (error) {
        res.sendStatus(500).send('Fallo inesperado, por favor intente despues')
    }
})

module.exports = router;