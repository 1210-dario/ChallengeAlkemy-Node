const express = require('express');
const authService = require('../services/authService');
const Success = require('../handlers/successHandler');
const { request, response } = require('express');

const login = async(req = request ,res = response, next) => {

    const {email, password} = req.body;
    try{
        //ir a buscar el usuario por email
        //validar el password
        //generar el jwt

        res.json(new Success( await authService.login(email,password)));

    }catch(error){
        next(error);
    }
}

module.exports = {
    login
};