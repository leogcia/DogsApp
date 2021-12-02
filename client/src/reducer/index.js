import { 
    GET_ALL_DOGS,
    GET_DOG_NAME,
    GET_DOG_ID,
    GET_DOG_TEMP,
    ORDER_ZA,
    ORDER_AZ,
    ORDER_LIGHT,
    ORDER_HEAVY,
    FILTER,
    ALL,
    API,
    DB

} from "../actions";

const initialState = {
    dogsLoaded: [],
    dogLoaded: [],
    dogDetail: [],
    temps: [],
    filter: [],
}

function rootReducer(state = initialState, action) {
    console.log('Entrando al reducer')
    switch(action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                dogsLoaded: action.payload,
                filter: action.payload
            }

        case GET_DOG_NAME:
            return {
                ...state,
                filter: action.payload
            }
        
        case GET_DOG_TEMP:
            
            return {
                ...state,
                temps: action.payload
            }  

        case ORDER_ZA:
            return {
                ...state,
                filter: action.payload
            }
            
        case ORDER_AZ:
            return {
                ...state,
                filter: action.payload
            }

        case ORDER_LIGHT:
            return {
                ...state,
                filter: action.payload
            }

        case ORDER_HEAVY:
            return {
                ...state,
                filter: action.payload
            }

        case GET_DOG_ID:
            return {
                ...state,
                dogDetail: action.payload
            }
        
        case 'POST_DOG':
            return {
                ...state,
            }

        case FILTER:
            return {
                ...state,
                filter: action.payload
            }

        case DB:
            return {
                ...state, 
                filter: state.dogsLoaded.filter(b => b.id.length > 6).sort()
            }

        case API:
            return {
                ...state,
                filter: state.dogsLoaded.filter(b => b.id < 500).sort()
            }

        case ALL:
            return {
                ...state,
                filter: state.dogsLoaded
            }
        

        default: return state;
    }
};

export default rootReducer;
