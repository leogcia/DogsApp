require('dotenv').config();
const { API_KEY } = process.env;
const { Temperament } = require('../src/db');
const axios = require('axios');

const preChargeTemperaments = async() => {
    const info = await axios.get('https://api.thedogapi.com/v1/breeds', { headers: {'x-api-key': `${API_KEY}`} })
    let temperaments = []
    info.data.forEach(e => {
        if(typeof(e.temperament) === "string"){
            let res = e.temperament.split(",")   //El método split() divide un objeto de tipo String en un array (vector) de cadenas mediante la separación de la cadena en subcadenas.
            res = res.map(e => e.trim())  //El método trim( ) elimina los espacios en blanco en ambos extremos del string.
            temperaments = temperaments.concat(res)
        }
    });
    console.log('Temperamentos almacenados en base de datos!')
    temperaments = Array.from(new Set(temperaments)).sort() 
    //  Array.from crea una nueva instancia de Array a partir de un objeto iterable
   // Set permite almacenar valores únicos de cualquier tipo
    for await (var temp of temperaments) {
        Temperament.create({ name: temp })
        /* La sentencia for await...of crea un bucle iterando tanto sobre objetos iterables asincrónicos como sincrónicos, 
        iterables definidos por el usuario. Invoca un hook de iteración personalizada con sentencias a ser ejecutadas por el valor de cada propiedad diferente del objeto.*/
    }
}

module.exports = preChargeTemperaments;