const express = require('express');
const router = express.Router();
const controller = require('./controller')
const response = require('../../network/response')

router.get('/', function (req,res){
    controller.getMessage()
    .then( (messageList) =>{
        response.success(req,res,messageList, 200);
    })
    .catch( e=> {
        response.error(req, res, 'Unexpected Error', 500, e)
    })
});
router.post('/', function (req,res){
    controller.addMessage(req.body.user, req.body.message)
    .then( (fullMessage) => {
        response.success(req,res,fullMessage, 201);
    })
    .catch( e => {
        response.error(req,res,'Información invalida',400, 'Error en el controlador')
    });
    /*if( req.query.error == "ok"){
        response.error(req,res,'Error inesperado',500, 'Es solo una simulacion de errores')
    }else{
        response.success(req,res,'Creado correctamente',201)
    }
    */
});

module.exports = router;
