const Character = require('../models/characters');

class CharacterRepository{
    constructor(){

    }
    //Por hacer: Implementar Filtro
    async findAll(){
        return await Character.findAll();
    }

    async findById(id){
        return await Character.findByPk(id);
    }

    async findByName(name){
        return await Character.findOne({ where: { name } });
    }

    async save(c){
        return await Character.create(c);
    }

    async update(id,c){
        return await Character.update(c, {
            where: {
                id
          }});
    }

    async delete(id){
        return await Character.destroy({
            where: {
                id
            }
          });
    }

}

module.exports = CharacterRepository ;