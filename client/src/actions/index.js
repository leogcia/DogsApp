import axios from 'axios';
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG_NAME = 'GET_DOG_NAME';
export const GET_DOG_ID = 'GET_DOG_ID';
export const GET_DOG_TEMP = 'GET_DOG_TEMP';
export const ORDER_ZA = 'GET_DOG_ZA';
export const ORDER_AZ = 'ORDER_AZ';
export const ORDER_LIGHT = 'ORDER_LIGHT';
export const ORDER_HEAVY = 'ORDER_HEAVY';
export const FILTER = 'FILTER';
export const ALL = 'ALL';
export const DB = 'DB';
export const API = 'API';



export function getDogs() {
    return async function( disptach ) {
        return await axios.get('http://localhost:3001/dog/')
        .then((json) => {
            disptach({
                type: GET_ALL_DOGS,
                payload: json.data
            }); 
        });
    };
}

export function getName(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dog?name=${name}`)
            console.log(json)
                    return dispatch({
                        type: GET_DOG_NAME,
                        payload: json.data
                    })
        } catch (err) {
            console.log(err)
        }
    }
}

export function getId (id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dog/${id}`)
            return dispatch({
                type: GET_DOG_ID,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getTemp() {
    return async function( disptach ) {
        return await axios.get('http://localhost:3001/temperament')
        .then((temp) => {
            disptach({
                type: GET_DOG_TEMP,
                payload: temp.data
            }); 
        });
    };
}


export function getZA() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/dog/')
        .then((dog) => {
            const orderDesc = dog.data.sort((b, a) => {
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            });
            dispatch({
                type: ORDER_ZA,
                payload: orderDesc
            });
        });
    };
}

export function getAZ() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/dog/')
        .then((dog) => {
            const orderDesc = dog.data.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            });
            dispatch({
                type: ORDER_ZA,
                payload: orderDesc
            });
        });
    };
}

export function getLight () {
    return function (dispatch) {
        return axios.get('http://localhost:3001/dog')
        .then((dog) => {
            const orderLight = dog.data.sort((a, b) => {

                if(parseInt(a.weight) > parseInt(b.weight)) return 1;
                if(parseInt(a.weight) < parseInt(b.weight)) return -1;
                return 0;
            });
            dispatch({
                type: ORDER_LIGHT,
                payload: orderLight
            });
        });
    };
}

export function getHeavy() {
    return function (dispatch) {
        return axios.get("http://localhost:3001/dog").then((dog) => {
            const orderHeavy = dog.data.sort((b, a) => {
                
                if (parseInt(b.weight) < parseInt(a.weight)) return 1;
                if (parseInt(b.weight) > parseInt(a.weight)) return -1;
                return 0;
            });
            dispatch({
                type: ORDER_HEAVY,
                payload: orderHeavy,
            });
        });
    };
}

export function filter(array) {
    return {
        type: FILTER,
        payload: array
    }
}

export function getSource(value) {
    console.log(value)
    if(value === 'DB') {
        return {
            type: DB
        }    
    }

    if(value === 'API') {
        return {
            type: API
        }
    }

    if(value === 'ALL') {
        return {
            type: ALL
        }
    }

}

export function postDog(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/dog', payload);
        console.log(response)
        return response;
    }
}