import * as types from './actionType';

const initialState = {
    cuestionarios:[],
    cuestionario:{},
    loading: true,
    isLogin: false
};

const cuestionariosReducers = (state = initialState, action)=>{
    switch (action.type) {
        case types.GET_CUESTIONARIOS:
            return {
                ...state,
                cuestionarios:action.payload,
                loading: false
            };
        case types.DELETE_CUESTIONARIOS:
            return {
                ...state,
                loading: false
            };
        case types.ADD_CUESTIONARIOS:
            return {
                ...state,
                loading: false
            }; 
        case types.GET_SINGLE_CUESTIONARIO:
            return {
                ...state,
                cuestionario:action.payload,
                loading: false
            };    
        case types.UPDATE_CUESTIONARIOS:
            return {
                ...state,
                loading: false
            };    
        case types.GET_PREGUNTAS:
            return {
                ...state,
                cuestionario: action.payload.cuestionario,
                preguntas: action.payload.preguntas,
                loading: false
            };  
        case types.DELETE_PREGUNTA:
            return {
                ...state,
                cuestionario: action.payload.cuestionario,
                preguntas: action.payload.preguntas,
                loading: false
            };
        case types.ADD_PREGUNTA:
            return {
                ...state,
                cuestionario: action.payload.cuestionario,
                preguntas: action.payload.preguntas,
                loading: false
            };   
        case types.UPDATE_PREGUNTA:
            return {
                ...state,
                cuestionario: action.payload.cuestionario,
                preguntas: action.payload.preguntas,
                loading: false
            };   
        case types.GET_SINGLE_PREGUNTA:
            return {
                ...state,
                pregunta: action.payload.pregunta,
                loading: false
            };   
        case types.GET_RESPUESTAS:
            return {
                ...state,
                pregunta: action.payload.pregunta,
                respuestas: action.payload.respuestas,
                loading: false
            };     
        case types.GET_SINGLE_RESPUESTA:
            return {
                ...state,
                pregunta: action.payload.pregunta,
                respuesta: action.payload.respuesta,
                loading: false
            };   
        case types.LOG_IN:
            return { ...state, isLogin: action.payload };                                                       
        default:
            return state;
    }
};

export default cuestionariosReducers;