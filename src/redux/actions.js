import * as types from './actionType';
import axios from 'axios';
const getCuestionarios = (cuestionarios) => ({
    type: types.GET_CUESTIONARIOS,
    payload: cuestionarios
});

const cuestionarioDeleted = (cuestionario) => ({
    type: types.DELETE_CUESTIONARIOS,
    payload: cuestionario
});


const cuestionarioAdded = (cuestionario) => ({
    type: types.ADD_CUESTIONARIOS,
    payload: cuestionario
});


const getCuestionario = (cuestionario) => ({
    type: types.GET_SINGLE_CUESTIONARIO,
    payload: cuestionario
});

const getPreguntas = (cuestionario, preguntas) => ({
    type: types.GET_PREGUNTAS,
    payload: {
        cuestionario,
        preguntas
    }
});

const getPregunta = (pregunta, cuestionario) => ({
    type: types.GET_SINGLE_PREGUNTA,
    payload: {
        cuestionario,
        pregunta
    }
});

const preguntaDeleted = (cuestionario) => ({
    type: types.DELETE_PREGUNTA,
    payload: {
        cuestionario,
        preguntas:cuestionario.preguntas
    }
});

const preguntaAdded = (cuestionario) => ({
    type: types.ADD_PREGUNTA,
    payload: {
        cuestionario,
        preguntas:cuestionario.preguntas
    }
});

const getRespuesta = (respuesta, pregunta, cuestionario) => ({
    type: types.GET_SINGLE_RESPUESTA,
    payload: {
        cuestionario,
        pregunta, 
        respuesta
    }
});

const getRespuestas = (respuestas, pregunta) => ({
    type: types.GET_RESPUESTAS,
    payload: {
        pregunta, 
        respuestas
    }
});

const respuestaDeleted = (cuestionario) => ({
    type: types.DELETE_RESPUESTA,
    payload: {
        cuestionario,
        preguntas:cuestionario.preguntas
    }
});

const respuestaAdded = (cuestionario) => ({
    type: types.ADD_RESPUESTA,
    payload: {
        cuestionario,
        preguntas:cuestionario.preguntas
    }
});
const getResultados = (resultados) => ({
    type: types.ADD_RESPUESTA,
    payload: {
        resultados
    }
});

const usuarioAdded = (usuario) => ({
    type: types.ADD_USUARIO,
    payload: usuario
});

export const loadCuestionarios = () => {
    return function(dispatch){
        axios.get(`${process.env.REACT_APP_CUESTIONARIO_API}/getAll`)
        .then((resp=>{
            console.log('resp',resp);
            dispatch(getCuestionarios(resp.data.data.data));
        }))
        .catch((error)=> console.log(error));
    };
};

export const deleteCuestionarios = (cuestionario) => {
    return function(dispatch){
        let payload = cuestionario;
        payload.state = false;
        delete payload._id
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API}/save`,payload)
        .then((resp=>{
            console.log('resp',resp);
            dispatch(cuestionarioDeleted(payload));
            dispatch(loadCuestionarios());
        }))
        .catch((error)=> console.log(error));
    };
};

export const getSingleCuestionario = (id) => {
    return function(dispatch){
        let payload ={
            idCuestionario:id
        };
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API}/get`,payload)
        .then((resp=>{
            console.log('resp',resp);
            dispatch(getCuestionario(resp.data.data));
        }))
        .catch((error)=> console.log(error));
    };
};

export const addCuestionarios = (cuestionario) => {
    return function(dispatch){
        let payload = cuestionario;
        payload.state = true;
        if (!cuestionario.preguntas){
            payload.preguntas=[];
        }
        if(cuestionario._id){
            delete payload._id
        }
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API}/save`,payload)
        .then((resp=>{
            console.log('resp',resp);
            dispatch(cuestionarioAdded(payload));
            dispatch(loadCuestionarios());
        }))
        .catch((error)=> console.log(error));
    };
};

export const loadPreguntas = (id,idPregunta) => {
    return function(dispatch){
        let payload={
            idCuestionario:id
        }
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API}/get`,payload)
        .then((resp=>{
            console.log('resp',resp);
            if (idPregunta){
                dispatch(getPregunta(resp.data.data.preguntas.find(value=> value.id===idPregunta),resp.data.data))
            }else{
                dispatch(getPreguntas(resp.data.data, resp.data.data.preguntas));
            }
        }))
        .catch((error)=> console.log(error));
    };
};

export const deletePreguntas = (cuestionario, pregunta) => {
    return function(dispatch){
        let payload = cuestionario;
        payload.preguntas=payload.preguntas.filter(value=> value.id!==pregunta.id);
        delete payload._id
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API}/save`,payload)
        .then((resp=>{
            console.log('resp',resp);
            dispatch(preguntaDeleted(payload));
            dispatch(loadPreguntas(cuestionario.idCuestionario));
        }))
        .catch((error)=> console.log(error));
    };
};

export const addPreguntas = (cuestionario, pregunta) => {
    return function(dispatch){
        let payload = cuestionario;
        let preg = payload.preguntas.find(value=> value.id === pregunta.id);
        if (preg){
            payload.preguntas.find(value=> value.id === pregunta.id).pregunta=pregunta.pregunta
        }else{
            payload.preguntas.push({...pregunta, state:true, respuestas:[]});
        }
        delete payload._id
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API}/save`,payload)
        .then((resp=>{
            console.log('resp',resp);
            dispatch(preguntaAdded(payload));
            dispatch(loadPreguntas(cuestionario.idCuestionario));
        }))
        .catch((error)=> console.log(error));
    };
};

export const loadRespuestas = (id,idPregunta,idRespuesta) => {
    return function(dispatch){
        let payload={
            idCuestionario:id,
            idPregunta
        }
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API}/get`,payload)
        .then((resp=>{
            console.log('resp',resp);
            if (idRespuesta){
                dispatch(getRespuesta(resp.data.data.respuestas.find(val=>val.id===idRespuesta),resp.data.data))
            }else{
                dispatch(getRespuestas(resp.data.data.respuestas,resp.data.data));
            }
        }))
        .catch((error)=> console.log(error));
    };
};

export const deleteRespuestas = (cuestionario,pregunta, respuesta) => {
    return function(dispatch){
        let payload = cuestionario;
        payload.preguntas.find(value=> value.id===pregunta.id).respuestas=payload.preguntas.find(value=> value.id===pregunta.id).respuestas.filter(val=>val.id !== respuesta.id);
        delete payload._id
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API}/save`,payload)
        .then((resp=>{
            console.log('resp',resp);
            dispatch(respuestaDeleted(payload));
            dispatch(loadRespuestas(cuestionario.idCuestionario, pregunta.id));
        }))
        .catch((error)=> console.log(error));
    };
};

export const addRespuestas = (cuestionario, pregunta, respuesta) => {
    return function(dispatch){
        let payload = cuestionario;
        let preg = payload.preguntas.find(value=> value.id === pregunta.id);
        if (preg){
            let re= preg.respuestas.find(value=> value.id === respuesta.id);
            if (re){
                payload.preguntas.find(value=> value.id===pregunta.id).respuestas.find(value=> value.id === respuesta.id).respuesta=respuesta.respuesta;
                payload.preguntas.find(value=> value.id===pregunta.id).respuestas.find(value=> value.id === respuesta.id).esCorrecta=respuesta.esCorrecta;
            }else{
                payload.preguntas.find(value=> value.id===pregunta.id).respuestas.push({...respuesta, state:true})
            }
        }
        delete payload._id
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API}/save`,payload)
        .then((resp=>{
            console.log('resp',resp);
            dispatch(respuestaAdded(payload));
            dispatch(loadRespuestas(cuestionario.idCuestionario, pregunta.id));
        }))
        .catch((error)=> console.log(error));
    };
};

export const loadPreguntasJuego = (id) => {
    return function(dispatch){
        let payload={
            idCuestionario:id
        }
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API}/get`,payload)
        .then((resp=>{
            console.log('resp',resp);
            let playPreguntas= resp.data.data.preguntas.map((pregunta) => {return {...pregunta,respuestaSel:""}})
            dispatch(getPreguntas(resp.data.data, playPreguntas));

        }))
        .catch((error)=> console.log(error));
    };
};

export const addRespuestaCuestionarioUser = (id,respuestas,user) => {
    return function(dispatch){
        let respCuestionario=respuestas.preguntas.map((respuesta) => {
            return {
                pregunta:respuesta.pregunta,
                respuestaUser: respuesta.respuestas.find(r=>r.id=== respuesta.respuestaSel).respuesta,
                esCorrecta: respuesta.respuestas.find(r=>r.id=== respuesta.respuestaSel).esCorrecta,
            }
        });
        let payload={
            idUsuario:user, // TODO: Cambiar con el login
            idCuestionario:id,
            respCuestionario
        }
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API}Resultado/saveRespuestas`,payload)
        .then((resp=>{
            console.log('resp',resp);
            dispatch(getResultados(respCuestionario));
        }))
        .catch((error)=> console.log(error));
    };
};

export const doLogin = (usuario) => {
    return function(dispatch){
        let payload={
            email:usuario.email,
            password:usuario.pwd
        }
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API_USER}/get`,payload)
        .then((resp=>{
            console.log('resp',resp);
            dispatch(login(resp.data.data===true?usuario.email:false));
        }))
        .catch((error)=> console.log(error));
    };
};

export const addUsuario = (usuario) => {
    return function(dispatch){
        let payload={
            email:usuario.email,
            password:usuario.pwd
        }
        axios.post(`${process.env.REACT_APP_CUESTIONARIO_API_USER}/save`,payload)
        .then((resp=>{
            console.log('resp',resp);
            dispatch(usuarioAdded(usuario.email));
        }))
        .catch((error)=> console.log(error));
    };
};
export const login = (isLogin) => ({
    type: types.LOG_IN,
    payload: isLogin
});