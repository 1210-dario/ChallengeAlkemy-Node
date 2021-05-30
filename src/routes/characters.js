const { Router } = require('express');
const {
    getAllCharacters,
    createCharacter,
    updateCharacter,
    getById,
    deleteCharacter
} = require('../controllers/characters');
const {
    postRequestValidations,
    putRequestValidations,
    getRequestValidation,
    getAllRequestValidation,
    deleteRequestValidation
} = require('../middlewares/characters');

const router = Router();

router.get('/', getAllRequestValidation, getAllCharacters);
router.post('/', postRequestValidations, createCharacter);
router.put('/:id(\\d+)/', putRequestValidations, updateCharacter);
router.get('/:id(\\d+)/', getRequestValidation, getById);
router.delete('/:id(\\d+)/', deleteRequestValidation, deleteCharacter);

module.exports = router;
