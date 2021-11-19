import { combineReducers } from "redux";
import liveClassesReducer from "./LiveClassesReducer";
import streamArchieveReducer from "./StreamArchieve";

const rootReducer = combineReducers({
    liveClassesReducer: liveClassesReducer,
    streamArchieveReducer: streamArchieveReducer
})

export default rootReducer