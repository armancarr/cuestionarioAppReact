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
import { deletePreguntas, loadPreguntas } from '../redux/actions';
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
  
  
export const HomePreguntas = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let {id} = useParams();
    useEffect(()=>{
        dispatch(loadPreguntas(id));
    },[dispatch,id]);
    const { preguntas,cuestionario } = useSelector(state => state.data);
    const handleDelete = (pregunta) =>{
        if(window.confirm("Esta Seguro de eliminar la pregunta?")){
            dispatch(deletePreguntas(cuestionario,pregunta));
        }
    };
    return (
        <div>
            <Button variant='contained' onClick={()=>navigate(`/addPregunta/${id}`)} color="primary">Crear Pregunta</Button>
            <Button variant='contained' onClick={()=>navigate("/")} color="secondary">Regresar</Button>
                <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900, marginTop:1 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>No. Respuestas</StyledTableCell>
                <StyledTableCell align='center'>Acciones</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {preguntas && preguntas.map((row) => (
                <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                    {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.pregunta}</StyledTableCell>
                <StyledTableCell>{row.respuestas.length}</StyledTableCell>
                <StyledTableCell align="center">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button color="primary" onClick={()=> navigate(`/editPregunta/${id}/${row.id}`)}>Editar</Button>
                        <Button color="error" onClick={()=>handleDelete(row)} >Eliminar</Button>
                        <Button color="secondary" onClick={()=> navigate(`/homeRespuestas/${id}/${row.id}`)}>Listar Respuestas</Button>
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

export default HomePreguntas;