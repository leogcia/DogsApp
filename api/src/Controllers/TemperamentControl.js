const { axios } = require('axios');
const { Temperament } = require('../db');

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