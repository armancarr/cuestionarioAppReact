import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from  "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { addPreguntas } from '../redux/actions';
export const AddPregunta = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let {id} = useParams();
    const { preguntas,cuestionario } = useSelector(state => state.data);
    const [state,setState] =useState({
        cuestionario,
        preguntas,
        pregunta:{
            id:"",
            pregunta:""
        }
    });
    const [error,setError] = useState("");
    const {pregunta} = state;
    const handleInputChange = (e) =>{
        let {name,value} = e.target;
        if (name==="id"){
            state.pregunta.id = value
        }else{
            state.pregunta.pregunta = value
        }
        setState({ ...state});
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!pregunta.id || !pregunta.pregunta){
            setError("Por favor complete la información");
        }else{
            // dispatch(addCuestionarios({idCuestionario,nombre,state:true,preguntas:[]}));
            dispatch(addPreguntas(state.cuestionario, state.pregunta));
            navigate(`/homePreguntas/${id}`);
            setError("");
        }
    };
  return (
    <div>
        <Button variant='contained' onClick={()=>navigate(`/homePreguntas/${id}`)} color="secondary">Regresar</Button>
        <h2> Crear Pregunta</h2>
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
            <TextField id="standard-basic" label="Id" variant="standard"  value={pregunta.id} type="text" onChange={handleInputChange} name="id" />
            <br />
            <TextField id="standard-basic" label="Pregunta" variant="standard"  value={pregunta.pregunta} type="text" onChange={handleInputChange} name="pregunta" />
            <br />
            <Button variant='contained' color="primary" type="submit">Crear</Button>
        </Box>
    </div>
  )
}

export default AddPregunta;