const CharacterRepository = require('../repositories/characterRepository');
const repository = new CharacterRepository();

const findById = async(id) => {
    return await repository.findById(id);
}

const findByName = async(name) => {
    return await repository.findByName(name);
}


const findAll = async(filter,options) => {
    //return await repository.findAllWithPagination(filter, options);
    return await repository.findAll();
} 

const save = async(character) => {
    return await repository.save(character);
}

const update = async(id, character)=>{
    return await repository.update(id,character);
}

const remove = async(id)=>{
    return await  repository.delete(id);
}

module.exports ={
    findById,
    findByName,
    findAll,
    save,
    update,
    remove
}