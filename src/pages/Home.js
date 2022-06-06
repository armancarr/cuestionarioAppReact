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
import { deleteCuestionarios, loadCuestionarios, login } from '../redux/actions';
import { useNavigate } from  "react-router-dom";

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
  
  
export const Home = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const { cuestionarios } = useSelector(state => state.data)
    useEffect(()=>{
        dispatch(loadCuestionarios());
    },[dispatch]);
    const handleDelete = (cuestionario) =>{
        if(window.confirm("Esta Seguro de eliminar el cuestionario?")){
            dispatch(deleteCuestionarios(cuestionario));
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
            <Button variant='contained' onClick={()=>navigate("/addCuestionario")} color="primary">Crear Cuestionario</Button>
                <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900, marginTop:1 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>No. Preguntas</StyledTableCell>
                <StyledTableCell align='center'>Acciones</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {cuestionarios && cuestionarios.map((row) => (
                <StyledTableRow key={row.idCuestionario}>
                <StyledTableCell component="th" scope="row">
                    {row.idCuestionario}
                </StyledTableCell>
                <StyledTableCell>{row.nombre}</StyledTableCell>
                <StyledTableCell>{row.preguntas.length}</StyledTableCell>
                <StyledTableCell align="center">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button color="primary" onClick={()=> navigate(`/editCuestionario/${row.idCuestionario}`)}>Editar</Button>
                        <Button color="error" onClick={()=>handleDelete(row)} >Eliminar</Button>
                        <Button color="secondary" onClick={()=> navigate(`/homePreguntas/${row.idCuestionario}`)}>Listar Preguntas</Button>
                        <Button color="success" onClick={() => navigate(`/playCuestionario/${row.idCuestionario}`)}>Jugar</Button>
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

export default Home;