import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from  "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { addRespuestas } from '../redux/actions';
import Switch from '@mui/material/Switch';

export const AddRespuesta = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let {idCuestionario, idPregunta} = useParams();
    const { respuestas,pregunta,cuestionario } = useSelector(state => state.data);
    const [state,setState] =useState({
        cuestionario,
        pregunta,
        respuestas,
        respuesta:{
            id:"",
            respuesta:"",
            esCorrecta: false
        }
    });
    const [error,setError] = useState("");
    const {respuesta} = state;
    const handleInputChange = (e) =>{
        let {name,value} = e.target;
        if (name==="id"){
            state.respuesta.id = value
        }else  {
            state.respuesta.respuesta = value
        }
        setState({ ...state});
    };
    const handleSwitch = (e) => {
        let {value} = e.target;
        state.respuesta.esCorrecta = value
        setState({ ...state});
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!respuesta.id || !respuesta.respuesta){
            setError("Por favor complete la información");
        }else{
            // dispatch(addCuestionarios({idCuestionario,nombre,state:true,preguntas:[]}));
            dispatch(addRespuestas(state.cuestionario, state.pregunta, state.respuesta));
            navigate(`/homeRespuestas/${idCuestionario}/${idPregunta}`);
            setError("");
        }
    };
  return (
    <div>
        <Button variant='contained' onClick={()=>navigate(`/homeRespuestas/${idCuestionario}/${idPregunta}`)} color="secondary">Regresar</Button>
        <h2> Crear Respuesta</h2>
        {error && <h3 style={{color: "red"}}>{error}</h3>}
        <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField id="standard-basic" label="Id" variant="standard"  value={respuesta.id} type="text" onChange={handleInputChange} name="id" />
            <br />
            <TextField id="standard-basic" label="Pregunta" variant="standard"  value={respuesta.respuesta} type="text" onChange={handleInputChange} name="respuesta" />
            <br />
            <Switch value={respuesta.esCorrecta}  onChange={handleSwitch}/>
            <br />
            <Button variant='contained' color="primary" type="submit">Crear</Button>
        </Box>
    </div>
  )
}

export default AddRespuesta;