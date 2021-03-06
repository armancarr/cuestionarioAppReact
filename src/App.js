import { Routes, Route } from "react-router-dom"
import {AddCuestionario} from "./pages/AddCuestionario";
import AddPregunta from "./pages/AddPregunta";
import {EditCuestionario} from "./pages/EditCuestionario";
import { Home } from "./pages/Home";
import {HomePreguntas} from "./pages/HomePreguntas";
import {EditPregunta} from "./pages/EditPregunta"
import HomeRespuestas from "./pages/HomeRespuestas";
import AddRespuesta from "./pages/AddRespuesta";
import PlayCuestionario from "./pages/PlayCuestionario";
import GetResultados from "./pages/GetResultados";
import Login from "./pages/Login";
import NoMatch from "./pages/404Page";
import { connect } from "react-redux";
import AddUsuario from "./pages/AddUsuario";
const App = ({isLogin}) => {

  return (

    <div className="app container">
        {isLogin ? (
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/addCuestionario" element={<AddCuestionario/>} />
          <Route path="/editCuestionario/:id" element={<EditCuestionario/>} />
          <Route path='/playCuestionario/:id' element={<PlayCuestionario/>} />
          <Route path='/homePreguntas/:id' element={<HomePreguntas/>} />
          <Route path='/addPregunta/:id' element={<AddPregunta/>} />
          <Route path='/editPregunta/:idCuestionario/:idPregunta' element={<EditPregunta/>} />
          <Route path='/homeRespuestas/:idCuestionario/:idPregunta' element={<HomeRespuestas/>} />
          <Route path='/addRespuesta/:idCuestionario/:idPregunta' element={<AddRespuesta/>} />
          <Route path='/getResultados' element={<GetResultados/>} />
        </Routes>
        ):(
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="*" element={<NoMatch/>} />
            <Route path='/addUsuario' element={<AddUsuario />} />
          </Routes>
        )}
    </div>
  );
}

const mapStateToProps = ({ data: { isLogin } }) => ({
  isLogin
});
export default connect(mapStateToProps)(App);
