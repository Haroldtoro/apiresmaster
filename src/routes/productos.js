const express = require('express');
const router = express.Router();

const pool = require('../database');
const isAuthInApi = require('../lib/authapi')

//api 
router.get('/api', isAuthInApi ,async(req,res)=>{
    const from = req.headers['nivel'];
    try {
        await pool.query('SELECT * FROM inventa WHERE LINEA = ? order by FCDESC asc',[from],(err,rows,fields)=>{
            if(!err){
                res.json({listas:rows})
            } else{
              res.sendStatus(400)
              return
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
})


//productos promociones
router.get('/promociones/api', isAuthInApi ,async(req,res)=>{
    const promox = '1'
    try {
        await pool.query("SELECT * FROM inventa WHERE promox = ? order by FCDESC asc",[promox],(err,rows,fields)=>{
            if(!err){
                res.json({listas:rows})
            } else{
              res.sendStatus(400)
              return
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
})

//productos promociones limitado a 10
router.get('/promociones10/api', isAuthInApi ,async(req,res)=>{
    const promox = '1'
    try {
        await pool.query("SELECT * FROM inventa WHERE promox = ? order by FCDESC asc LIMIT 10",[promox],(err,rows,fields)=>{
            if(!err){
                res.json({listas:rows})
            } else{
              res.sendStatus(400)
              return
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
})

//Buscador 

router.get('/buscador/api', isAuthInApi ,async(req,res)=>{
    const palabra ='%'+req.headers['nivel']+'%';
    try {
        await pool.query('SELECT * FROM inventa WHERE fcdesc LIKE ? order by FCDESC asc',[palabra],(err,rows,fields)=>{
            if(!err){
                res.json({listas:rows})
            } else{
              res.sendStatus(400)
              return
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
})


//Sincronizar sqflite con mysql

router.post('/detawait/insert/api',isAuthInApi, async(req,res)=>{
    const lista = req.body
    const maximo = lista.length
    try {
    for (var index = 0; index < maximo; index++) {
        const VENDE = lista[index].VENDE
        const HORA = lista[index].HORA
        const delivered = lista[index].delivered
        const comanda1 = lista[index].comanda1
        const comanda2 = lista[index].comanda2
        const LOCAL = lista[index].LOCAL
        const fcdesc = lista[index].fcdesc
        const cantidad = lista[index].cantidad
        const vrtotal = lista[index].vrtotal
        const Mesa = lista[index].Mesa
        const fcref = lista[index].fcref
        const OLDCUENTA = lista[index].OLDCUENTA
        const imagen = lista[index].imagen
        const FNCOSTO = lista[index].FNCOSTO
        const promox = lista[index].promox
        const FNVRUNI = lista[index].FNVRUNI
        const CELULAR = lista[index].CELULAR
        const FNVPROMOX = lista[index].FNVPROMOX

        const productodetawait = {
            VENDE,
            HORA,
            delivered,
            comanda1,
            comanda2,
            LOCAL,
            fcdesc,
            cantidad,
            vrtotal,
            Mesa,
            fcref,
            OLDCUENTA,
            imagen,
            FNCOSTO,
            promox,
            FNVRUNI,
            CELULAR,
            FNVPROMOX
        };
         pool.query('INSERT INTO detawait set ?',[productodetawait])
          
    }
} catch (error) {
    res.sendStatus(500)
}
    res.sendStatus(200)
})


//  Online

//Obtener
router.get('/detawait/api',isAuthInApi, async(req,res)=>{
    const mesa = Number(req.headers['mesa'])
    try {
        await pool.query('SELECT * FROM detawait WHERE Mesa = ? order by FCDESC asc',[mesa],(err,rows,fields)=>{
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

//editar
router.put('/detawait/api',isAuthInApi, async(req,res)=>{
    const cantidad = Number(req.headers['cantidad'])
    const vrtotal = Number(req.headers['vrtotal'])
    const mesa = Number(req.headers['mesa'])
    const fcref = req.headers['fcref']
    
    try {
        pool.query("update detawait Set cantidad=?, vrtotal=? Where fcref=? AND Mesa = ? ",[cantidad,vrtotal,fcref,mesa],(err,rows,fields)=>{
            if(!err){
                res.sendStatus(200)  
            } else{
              res.sendStatus(400)
              return
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
})

//eliminar
router.delete('/detawait/api',isAuthInApi, async(req,res)=>{
    const eliminado = req.headers['eliminado']
    const mesa = Number(req.headers['mesa'])
    try {
        pool.query("DELETE FROM detawait WHERE fcref = ? AND Mesa = ?",[eliminado,mesa],(err,rows,fields)=>{
            if(!err){
                res.sendStatus(200)  
            } else{
              res.sendStatus(400)
              return
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
})

//totaldetawaitprecio

router.get('/total/api', isAuthInApi ,async(req,res)=>{
    const mesa = Number(req.headers['mesa'])
    try {
        await pool.query('SELECT SUM(vrtotal) as total FROM detawait WHERE Mesa = ?;',[mesa],(err,rows,fields)=>{
            if(!err){
                res.json({listas:rows})
            } else{
              res.sendStatus(400)
              return
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
})

//cerrar cuenta

router.get('/cerrar/api', isAuthInApi ,async(req,res)=>{
    const mesa = Number(req.headers['mesa'])
    try {
        await pool.query('delete FROM detawait WHERE Mesa = ?;',[mesa],(err,rows,fields)=>{
            if(!err){
                res.sendStatus(200)
            } else{
              res.sendStatus(400)
              return
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
})


module.exports = router;