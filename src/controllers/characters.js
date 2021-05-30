const express = require('express');
const characterService = require('../services/characterService');
const Success = require('../handlers/successHandler');


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllCharacters = async (req, res, next)=>{
    try {
        const characters = await characterService.findAll(req.query.filter, req.query.options);
        res.json(new Success(characters));
    }catch(err){
        next(err);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const createCharacter = async (req, res, next) => {

    try{
        let c = req.body;
        c = await characterService.save(c);
            
        res.status(201).json(new Success(c));
    }catch(err){
        next(err);
    }        
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const updateCharacter = async (req, res, next)=>{
    try{
        const { id } = req.params;
        let c = req.body;
        //user._id = id;
        const characterUpdated = await characterService.update(id, c);    

        res.json(new Success(characterUpdated));
    }catch(err){
        next(err);
    }

};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getById = async (req, res)=>{
    try{
        const c = await characterService.findById(req.params.id);
        
        res.json(new Success(c));
    }catch(err){
        next(err);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const deleteCharacter = async (req, res, next)=>{
    try{
        const { id } = req.params;
        const character = await characterService.remove(id);
        
        res.json(new Success(character));
    }catch(err){
        next(err);
    }
};

module.exports = {
    getAllCharacters,
    createCharacter,
    updateCharacter,
    getById,
    deleteCharacter
}