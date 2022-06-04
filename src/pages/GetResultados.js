import React,{useEffect,useState} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from 'react-redux';
import { useNavigate } from  "react-router-dom";
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';



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
  
  
export const GetResultados = () => {
    let navigate = useNavigate();
    const { preguntas } = useSelector(state => state.data)
    const [state,setState] =useState({
        preguntas
    });

    useEffect(()=>{
        if(preguntas){
            let resultados=preguntas.map((respuesta) => {
                return {
                    pregunta:respuesta.pregunta,
                    respuestaUser: respuesta.respuestas.find(r=>r.id=== respuesta.respuestaSel).respuesta,
                    esCorrecta: respuesta.respuestas.find(r=>r.id=== respuesta.respuestaSel).esCorrecta,
                }
            });    
            setState({resultados})
        }
      },[preguntas]);
    return (
        <div>
            <Button variant='contained' onClick={()=>navigate("/")} color="primary">Home</Button>
                <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900, marginTop:1 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Pregunta</StyledTableCell>
                <StyledTableCell>Respuesta</StyledTableCell>
                <StyledTableCell align='center'>Resultado</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {state.resultados && state.resultados.map((row) => (
                <StyledTableRow key={row.pregunta}>
                <StyledTableCell component="th" scope="row">
                    {row.pregunta}
                </StyledTableCell>
                <StyledTableCell>{row.respuestaUser}</StyledTableCell>
                <StyledTableCell align="center">
                 {row.esCorrecta?
                 <CheckIcon color="success" />
                 :
                 <CloseIcon sx={{ color: red[500] }}/>
                 }
                </StyledTableCell>

                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    )
}

export default GetResultados;