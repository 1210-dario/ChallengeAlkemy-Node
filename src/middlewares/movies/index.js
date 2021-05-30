const {check} = require('express-validator');
const AppError = require('../../errors/appError');
const movieService = require('../../services/movieService');
const { ROLES, ADMIN_ROLE, USER_ROLE } = require('../../constants');
const {validationResult} =require('../commons');
const { validJWT, hasRole } = require('../auth');
const GenderTypeRepository = require('../../repositories/genderTypeRepository');
const ContentTypeRepository = require('../../repositories/contentTypeRepository');
const genderTypeRepository = new GenderTypeRepository();
const contentTypeRepository = new ContentTypeRepository();

const _idRequired = check('id').not().isEmpty();
const _idIsNumeric = check('id').isNumeric();
const _idExist = check('id').custom(
    async (id = '') =>{
        const mFound = await movieService.findById(id);
        if (!mFound){
            throw new AppError('The id does not exist in DB', 400);
        };

    }
);

const _titleOptional = check('title').optional();
const _titleRequired = check('title', 'Title required').not().isEmpty();
const _titleNotExist = check('title').custom(
    async (title = '') =>{
        const movieFound = await movieService.findByTitle(title);
        if (movieFound){
            throw new AppError('The title exist in DB', 400);
        };
    }
);


const _creationDateIsDateAndOptional = check('creationDate').optional().isDate();
const _creationDateRequired = check('creationDate').not().isEmpty();
const _creationDateIsDate = check('creationDate').isDate();

const _calificationIsNumericAndOptional = check('calification').optional().isNumeric();
const _calificationRequired = check('calification').not().isEmpty();
const _calificationIsNumeric = check('calification').isNumeric();

const _contentTypeExistValidation = async (contentType = '') => {
    const contentTypeFound = await contentTypeRepository.findByDescription(contentType);
    if (!contentTypeFound) {
        throw new AppError('The content type does not exist in DB', 400);
    }
}

const _genderTypeExistValidation = async (genderType = '') => {
    const genderTypeFound = await genderTypeRepository.findByDescription(genderType);
    if (!genderTypeFound) {
        throw new AppError('The gender type does not exist in DB', 400);
    }
}

const _contentTypeExist = check('contentType').custom(_contentTypeExistValidation);
const _genderTypeExist = check('genderType').custom(_genderTypeExistValidation);
const _contentTypeExistAndOptional = check('contentType').optional().custom(_contentTypeExistValidation);
const _genderTypeExistAndOptional = check('genderType').optional().custom(_genderTypeExistValidation);

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
    _titleRequired,
    _titleNotExist,
    _creationDateRequired,
    _creationDateIsDate,
    _calificationRequired,
    _calificationIsNumeric,
    _contentTypeExist,
    _genderTypeExist,
    validationResult
];

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idIsNumeric,
    _idExist,
    _titleOptional,
    _titleNotExist,
    _creationDateIsDateAndOptional,
    _calificationIsNumericAndOptional,
    _contentTypeExistAndOptional,
    _genderTypeExistAndOptional,
    validationResult
]; 

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getRequestValidation,
    getAllRequestValidation,
    deleteRequestValidation
};