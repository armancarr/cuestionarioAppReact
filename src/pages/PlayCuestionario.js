import React,{useEffect, useState} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useDispatch,useSelector} from 'react-redux';
import { loadPreguntasJuego,addRespuestaCuestionarioUser,login } from '../redux/actions';
import { useNavigate, useParams } from  "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  
export const PlayCuestionario = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let {id} = useParams();
    useEffect(()=>{
        dispatch(loadPreguntasJuego(id));
    },[dispatch,id]);
    let { preguntas,isLogin } = useSelector(state => state.data);

    // preguntas = preguntas.map((pregunta) => {return {...pregunta,respuestaSel:""}})
    const [state,setState] =useState({
        preguntas
    });

    useEffect(()=>{
      if(preguntas){
          setState({preguntas})
      }
    },[preguntas]);

    const handleChange = (event) => {
        // setRespuesta(event.target.value);
        event.preventDefault();
        state.preguntas.find(value=>value.id === event.target.name).respuestaSel=event.target.value;
        setState ({...state})
    };

    const [error,setError] = useState("");

     const handleSubmit = () =>{
         // e.preventDefault();
         if(preguntas.find(value=> value.respuestaSel==="")){
             setError("Por favor complete la información");
         }else{
             // dispatch(addCuestionarios({idCuestionario,nombre,state:true,preguntas:[]}));
             dispatch(addRespuestaCuestionarioUser(id,state,isLogin));
             navigate(`/getResultados`);
             setError("");
         }
     };
    return (
        <div>
            <div align="right">
                <Button
                variant='contained' color='error'
                onClick={() => {
                dispatch(login(false));
                navigate("/");
                }}
                >
                Salir
                </Button>
            </div>
            {error && <h3 style={{color: "red"}}>{error}</h3>}
            <Button variant='contained' color="primary" onClick={()=>handleSubmit()}>Enviar</Button>
            <Button variant='contained' onClick={()=>navigate("/")} color="secondary">Regresar</Button>
                <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900, marginTop:1 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Pregunta</StyledTableCell>
                <StyledTableCell>Elija Su Respuesta</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {preguntas && preguntas.map((row) => (
                <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                    {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.pregunta}</StyledTableCell>
                <StyledTableCell align="center">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Opciones:</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id={row.id}
                    value={row.respuestaSel}
                    label="Opciones"
                    onChange={handleChange}
                    name={row.id}
                    >
                    {row.respuestas && row.respuestas.map((r) => (
                    <MenuItem value={r.id}>{r.respuesta}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </StyledTableCell>

                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    )
}

export default PlayCuestionario;