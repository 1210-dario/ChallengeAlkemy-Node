const ContentTypes = require('../models/contentTypes');

class ContentTypeRepository {

    constructor(){

    }

    async findById(id){
        return await ContentTypes.findByPk(id);
    }

    async findByDescription(description){
        return await ContentTypes.findOne({where: { description }});
    }

}

module.exports = ContentTypeRepository;