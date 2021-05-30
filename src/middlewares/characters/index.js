const {check} = require('express-validator');
const AppError = require('../../errors/appError');
const characterService = require('../../services/characterService');
const { ROLES, ADMIN_ROLE, USER_ROLE } = require('../../constants');
const {validationResult} =require('../commons');
const { validJWT, hasRole } = require('../auth');

const _nameRequired = check('name','Name required').not().isEmpty();

const _roleValid = check('role').optional().custom(
    async (role = '') =>{        
        if (!ROLES.includes(role)){
            throw new AppError('Invalid Role', 400);
        };

    }
);

const _idRequired = check('id').not().isEmpty();
const _idIsNumeric = check('id').isNumeric();
const _idExist = check('id').custom(
    async (id = '') =>{
        const characterFound = await characterService.findById(id);
        if (!characterFound){
            throw new AppError('The id does not exist in DB', 400);
        };

    }
);

const _nameNotExist = check('name').custom(
    async (name = '') =>{
        const characterFound = await characterService.findByName(name);
        if (characterFound){
            throw new AppError('The name exist in DB', 400);
        };
    }
);

const _ageIsNumeric = check('age').optional().isNumeric();
const _weigthIsNumeric = check('weigth').optional().isNumeric();
const _historyRequired = check('history').not().isEmpty();



const getRequestValidation = [
    validJWT,     
    _idRequired,
    _idIsNumeric,
    _idExist,
    validationResult
];

const getAllRequestValidation = [
    validJWT    
];

const deleteRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idIsNumeric,
    _idExist,
    validationResult
];

const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _nameNotExist,
    _ageIsNumeric,
    _historyRequired,
    _weigthIsNumeric,
    validationResult
];

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _nameNotExist,
    _idIsNumeric,
    _idExist,
    _ageIsNumeric,
    _weigthIsNumeric,
    _roleValid,
    validationResult
]; 

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getRequestValidation,
    getAllRequestValidation,
    deleteRequestValidation
};