import {combineReducers} from "redux";
import cuestionariosReducers from "./reducer";

const rootReducer = combineReducers({
    data: cuestionariosReducers
});

export default rootReducer;