import React, {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from  "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { addPreguntas, loadPreguntas } from '../redux/actions';
export const EditPregunta = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let {idCuestionario, idPregunta} = useParams();
    const { preguntas,cuestionario } = useSelector(state => state.data);
    useEffect(()=>{
        dispatch(loadPreguntas(idCuestionario, idPregunta));
    },[dispatch, idCuestionario,idPregunta]);
    const pregunta = preguntas.find(value=> value.id === idPregunta)
    const [state,setState] =useState({
        cuestionario,
        preguntas,
        pregunta
    });
    const [error,setError] = useState("");

    useEffect(()=>{
        if(pregunta){
            setState({pregunta, cuestionario, preguntas})
        }
    },[pregunta, cuestionario, preguntas]);
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
            console.log("aqui",state);
            dispatch(addPreguntas(state.cuestionario, state.pregunta));
            navigate(`/homePreguntas/${idCuestionario}`);
            setError("");
        }
    };
  return (
    <div>
        <Button variant='contained' onClick={()=>navigate(`/homePreguntas/${idCuestionario}`)} color="secondary">Regresar</Button>
        <h2> Editar Pregunta</h2>
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
            <TextField id="standard-basic" label="Id" variant="standard"  value={pregunta.id || ""} type="text" onChange={handleInputChange} name="id" />
            <br />
            <TextField id="standard-basic" label="Pregunta" variant="standard"  value={pregunta.pregunta || ""} type="text" onChange={handleInputChange} name="pregunta" />
            <br />
            <Button variant='contained' color="primary" type="submit">Actualizar</Button>
        </Box>
    </div>
  )
}

export default EditPregunta;