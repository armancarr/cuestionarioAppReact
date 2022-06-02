import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from  "react-router-dom";
import {useDispatch} from "react-redux";
import { addCuestionarios } from '../redux/actions';
export const AddCuestionario = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [state,setState] =useState({
        idCuestionario:"",
        nombre:""
    });
    const [error,setError] = useState("");
    const {idCuestionario,nombre} = state;
    const handleInputChange = (e) =>{
        let {name,value} = e.target;
        setState({ ...state,[name]:value});
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!idCuestionario || !nombre){
            setError("Por favor complete la información");
        }else{
            // dispatch(addCuestionarios({idCuestionario,nombre,state:true,preguntas:[]}));
            dispatch(addCuestionarios(state));
            navigate('/');
            setError("");
        }
    };
  return (
    <div>
        <Button variant='contained' onClick={()=>navigate("/")} color="secondary">Regresar</Button>
        <h2> Crear Cuestionario</h2>
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
            <TextField id="standard-basic" label="Id" variant="standard"  value={idCuestionario} type="text" onChange={handleInputChange} name="idCuestionario" />
            <br />
            <TextField id="standard-basic" label="Nombre" variant="standard"  value={nombre} type="text" onChange={handleInputChange} name="nombre" />
            <br />
            <Button variant='contained' color="primary" type="submit">Crear</Button>
        </Box>
    </div>
  )
}

export default AddCuestionario;