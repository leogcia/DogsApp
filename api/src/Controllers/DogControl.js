const { API_KEY } = process.env
const axios = require('axios');
const { Dog, Temperament } = require('../db');

const getApiInfo = async () => {
    const getApi = await axios.get('https://api.thedogapi.com/v1/breeds', { headers: {'x-api-key': `${API_KEY}`} });

    const apiInfo =  getApi.data.map((e) => {
        return {
            id: e.id,
            name: e.name,
            height: e.height.metric,
            weight: e.weight.metric,
            life_span: e.life_span,
            temperament: e.temperament,
            image: e.image.url,
        }
    });

    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            thorugh: {
                attributes: []
            },
        }
    })
};

const getAllInfo = async () => {
    const apiInfo = await getApiInfo();
    const DBInfo = await getDbInfo();
    const infoTotal = DBInfo.concat(apiInfo);
    return infoTotal;
};

const getDogs = async (req, res) => {
    const {name} = req.query;
    let dogTotal = await getAllInfo();
    if (name) {
        let dogName = await dogTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ? 
        res.status(200).send(dogName) :
        res.status(404).send('No se encuentra el perro :(');
    } else {
        res.status(200).send(dogTotal);
    }
};

const getDogById = async (req, res) => {
    const id = req.params.id;
    const allDogs = await getAllInfo();
    if(id) {
        let dogId = await allDogs.filter( el => el.id == id )
        dogId.length ?
        res.status(200).json(dogId) :
        res.status(404).send('No se encuentra ese perro')
    }
};

const postDog = async (req, res) => {
    let { image, name, height, weight, life_span, temperament, createdInDb } = req.body;
    let dogCreate = await Dog.create({ image, name, height, weight, life_span, createdInDb });

    let dogTemperamentDb = await Temperament.findAll({
        where: { name: temperament }
    })

    dogCreate.addTemperament(dogTemperamentDb);
    res.send(dogCreate)

};


module.exports = {
    getDogs,
    postDog,
    getDogById

}