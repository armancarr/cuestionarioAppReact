import React, {useState}  from "react";
import { connect,useDispatch } from "react-redux";
import { doLogin, login } from "../redux/actions";
import { useNavigate } from  "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import QuizIcon from '@mui/icons-material/Quiz';
export const Login = () =>{
    let dispatch = useDispatch();
    let navigate = useNavigate();    
    const [state,setState] =useState({
        email: "",
        pwd: ""
    });
    const [error,setError] = useState("");
  const handleChange = (e)=> {
    const { name, value } = e.target;
    setState({ ...state,[name]:value});
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!email || !pwd){
        setError("Por favor complete la información");
    }else{
        dispatch(doLogin(state));
        setState(state);
        navigate('/');
        setError("");
    }
  };
    const { email, pwd } = state;
    return (
        <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
            '& > :not(style)': { m: 1, width: '50ch',  border: '10px grey' },
        }}
        noValidate
        autoComplete="off"
        >
            <div align="center"> 
            <h2 align="center"> Bienvenido a CuestionariosApp</h2>
            <QuizIcon color="primary" sx={{ fontSize: 40 }}/>
            {error && <h3 style={{color: "red"}}>{error}</h3>}
            </div>
            <div align="center">
            <TextField
              type="email"
              placeholder="email..."
              name="email"
              required
              onChange={handleChange}
              value={email}
            />
            <br />
            <TextField
              type="password"
              placeholder="password..."
              name="pwd"
              required
              onChange={handleChange}
              value={pwd}
            />
            <br />
            </div>
            <div align="center">

                <Button  variant="contained" onClick={handleSubmit} color="primary">Ingresar</Button>
                <br />
                <p><span onClick={() =>navigate('/addUsuario')} style={{color:'dodgerblue',paddingLeft:'10px',cursor:'pointer'}}>Registrarse</span></p>
            </div>
          </Box>
    );
  }
const mapDispatchToProps = dispatch => ({
  data: isLogin => dispatch(login(isLogin))
});
export default connect(
  null,
  mapDispatchToProps
)(Login);