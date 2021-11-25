const { axios } = require('axios');
const { Temperament } = require('../db');

// const getTemps = async ( req, res ) => {
//     const temperamentApi = await axios.get('https://api.thedogapi.com/v1/breeds', { headers: {'x-api-key': `${API_KEY}`} });
//     const temperaments = temperamentApi.data.map(el => el.temperament)
//     const tempEach = temperaments.map(el => {
//         for(let i = 0; i < el.length; i++) return el[i]
//     });
//     console.log(tempEach);
//     tempEach.forEach(el => {
//         Temperament.findOrCreate({
//             where: { name: el }
//         })
//     })

//     const allTemperaments = await Temperament.findAll();
//     res.send(allTemperaments)
//};
const getTemps = async (req, res, next) => {
    try{
        const db = await Temperament.findAll()
        return res.json(db).status(200)
    } catch (e) {
        console.log(e.message)
        return res.json(e.message).status(409)
    }
}



module.exports = {
    getTemps
}