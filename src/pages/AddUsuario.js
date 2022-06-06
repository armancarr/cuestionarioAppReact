import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from  "react-router-dom";
import {useDispatch} from "react-redux";
import { addUsuario } from '../redux/actions';
export const AddUsuario = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [state,setState] =useState({
        email:"",
        pwd:"",
        confirmPwd:""
    });
    const [error,setError] = useState("");
    const {email,pwd,confirmPwd} = state;
    const handleInputChange = (e) =>{
        let {name,value} = e.target;
        setState({ ...state,[name]:value});
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!email || !pwd || !confirmPwd){
            setError("Por favor complete la información");
        }else if(pwd !== confirmPwd){
            setError("Password no coincide");
        }else{
            dispatch(addUsuario(state));
            navigate('/');
            setError("");
        }
    };
  return (
    <div>
        <Button variant='contained' onClick={()=>navigate("/")} color="secondary">Regresar</Button>
        <h2> Registrarse</h2>
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
            <TextField id="standard-basic" label="Email" variant="standard"  value={email} type="text" onChange={handleInputChange} name="email" />
            <br />
            <TextField id="standard-basic" label="Password" variant="standard"  value={pwd} type="password" onChange={handleInputChange} name="pwd" />
            <br />
            <TextField id="standard-basic" label="Confirme" variant="standard"  value={confirmPwd} type="password" onChange={handleInputChange} name="confirmPwd" />
            <br />
            <Button variant='contained' color="primary" type="submit">Crear</Button>
        </Box>
    </div>
  )
}

export default AddUsuario;