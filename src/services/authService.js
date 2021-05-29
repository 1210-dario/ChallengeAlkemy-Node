const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const AppError = require('../errors/appError');
const config = require('../config');

const logger = require('../loaders/logger');

const login = async(email, password)=> {

    //Validacion de email
    try{
        const user = await userService.findByEmail(email);

        if(!user){
            throw new AppError('Authentication failed! Email / Password is not correct.',401);
        }
        //Validacion del enable

        if(!user.enable){
            throw new AppError('Authentication failed! User disabled.',401);
        }

        //Validacion de password
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            throw new AppError('Authentication failed! Email / Password is not correct.',401);
        }

        //Generar JWT
        const token = _encrypt(user.id);

        return{
            token,
            user: user.name,
            role: user.role
        };  

    }catch(error){
        throw error;
    }
};

const validToken = async (token) => {
    try{
        // Validar que el token venga como parametro       

        if(!token){
            throw new AppError('Authentication failed! Token required',401);
        }

        logger.info(`Token received: ${token}`);

        // Validar que el token sea integro

        let id;
        try{
            const obj = jwt.verify(token,config.auth.secret);
            id = obj.id;
        }catch(verifyError){
            throw new AppError('Authentication failed! Invalid Token', 401);
        }

        logger.info(`User id in the token: ${id}`);

        // Validar si hay usuario en BD

        const user = await userService.findById(id);
        if(!user){
            throw new AppError('Authentication failed! Invalid Token - User not found',401);
        }

        // Validar si usuario esta habilitado
        if(!user.enable){
            throw new AppError('Authentication failed! User disabled',401);
        }

        // Retornar el usuario
        return user;


    }catch(err){
        throw err;
    }
};

const validRole = (user, ...roles) => {
    if(!roles.includes(user.role)){
        throw new AppError('Authorization failed! User without privileges',403);
    }
    return true;
};

const register = async(email,password) => {

    const user = {email,password};

    await userService.save(user);

    //TODO; Enviar un mail de confirmación de registro? 

    return 'User registered succesfully. Now you can log in to use the API.';
};

_encrypt = (id) =>{
    return jwt.sign({id}, config.auth.secret, { expiresIn: config.auth.ttl });
};

module.exports = {
    register,
    login,
    validToken,
    validRole
};