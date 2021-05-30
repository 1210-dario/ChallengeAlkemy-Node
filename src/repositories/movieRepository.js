const Movie = require('../models/movies');
const GenderType = require('../models/genderTypes');

class MovieRepository{
    constructor(){

    }
    //Por hacer: Implementar Filtro
    async findAll(){
        return await Movie.findAll();
    }

    async findById(id){
        return await Movie.findByPk(id);
    }

    async findByTitle(title){
        return await Movie.findOne({ where: { title } });
    }

    async save(m){
        return await Movie.create(m, {
            include: [GenderType]
        });
    }

    async update(id, m){
        return await Movie.update(m, {
            where: {
                id
          }});
    }

    async delete(id){
        return await Movie.destroy({
            where: {
                id
            }
          });
    }

}

module.exports = MovieRepository ;