import React,{useEffect} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useDispatch,useSelector} from 'react-redux';
import { deleteRespuestas, loadRespuestas,login } from '../redux/actions';
import { useNavigate, useParams } from  "react-router-dom";

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
  
  
export const HomeRespuestas = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const { cuestionario } = useSelector(state => state.data);
    let {idCuestionario, idPregunta} = useParams();
    useEffect(()=>{
        dispatch(loadRespuestas(idCuestionario,idPregunta));
    },[dispatch,idCuestionario,idPregunta]);
    const { respuestas,pregunta } = useSelector(state => state.data);
    const handleDelete = (respuesta) =>{
        if(window.confirm("Esta Seguro de eliminar la respuesta?")){
            dispatch(deleteRespuestas(cuestionario,pregunta,respuesta));
        }
    };
    const handleAdd =() =>{
        if(respuestas.length >=10){
            alert("Ya tiene 10 opciones de respuesta! Para agregar una por favor borrar alguna existente!");
        }else{
            navigate(`/addRespuesta/${idCuestionario}/${idPregunta}`)
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
            <Button variant='contained' onClick={()=>handleAdd()} color="primary">Crear Respuesta</Button>
            <Button variant='contained' onClick={()=>navigate(`/homePreguntas/${idCuestionario}`)} color="secondary">Regresar</Button>
                <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900, marginTop:1 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Es Correcta?</StyledTableCell>
                <StyledTableCell align='center'>Acciones</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {respuestas && respuestas.map((row) => (
                <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                    {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.respuesta}</StyledTableCell>
                <StyledTableCell>{row.esCorrecta?"Si":"No"}</StyledTableCell>
                <StyledTableCell align="center">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button color="error" onClick={()=>handleDelete(row)} >Eliminar</Button>
                    </ButtonGroup>
                </StyledTableCell>

                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    )
}

export default HomeRespuestas;