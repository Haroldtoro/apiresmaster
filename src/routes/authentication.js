const express = require('express');
const router = express.Router();

const pool = require('../database');
const helpers = require('../lib/helpers');
const jwt = require('jsonwebtoken');
const config = require('../config');

//obtener token
router.post('/obtener/api' , (req,res,next)=>{
    const {mesero} = req.body
    try {
        const token = jwt.sign({id:mesero},config.secret)
        return res.json({token: token});
    } catch (error) {
        return res.status(500).send('Fallo inesperado, por favor intente luego');
    }
})

//Ingresar
router.post('/ingreso/api' ,async (req,res,next)=>{
    const {CELULAR,PASSWORD} = req.body
    try {

    const filas = await pool.query('SELECT * FROM usuarios WHERE CELULAR = ?',[CELULAR])
    if (filas.length >0){
      const usuario = filas[0]
      const validPassword = await helpers.matchPassword(PASSWORD,usuario.PASSWORD)
      if(validPassword){
        const token = jwt.sign({id:usuario.CELULAR},config.secret)
        return res.json({userinfo: usuario.CELULAR,token: token});
      } else{
        return res.status(400).send('Contraseña incorrecta');
      }
    } else {
        return res.status(400).send('Usuario incorrecto');
    }
    } catch (error) {
        return res.status(500).send('Fallo inesperado, por favor intente luego');
    }
})


//registrar
router.post('/registro/api' ,async(req,res)=>{
    const {CELULAR,CEDULA,EMAIL,PASSWORD} = req.body
    try {
    const userinfo = {
        CELULAR,
        CEDULA,
        EMAIL,
        PASSWORD
    };
    userinfo.PASSWORD = await helpers.encryptPassword(PASSWORD)
    const filas = await pool.query('SELECT * FROM usuarios WHERE CELULAR = ?',[CELULAR])

    if (filas.length > 0) { 
        return res.status(400).send('Ya existe un usuario con estos datos');
    } else {
        await pool.query('INSERT INTO usuarios set ?',[userinfo],(err,rows,fields)=>{
            if (!err) {
                const token = jwt.sign({id:userinfo.CELULAR},config.secret)
                return res.json({userinfo: userinfo.CELULAR,token: token});
            } else {
                res.sendStatus(400).send('Error crear usuario');
                return
            }
        })
    }
        
    } catch (error) {
        res.sendStatus(500).send('Fallo inesperado, por favor intente despues')
    }
})


module.exports = router;