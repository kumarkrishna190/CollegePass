import { actionTypes } from "../constants/ActionTypes"

const initialState = {
    liveClasses: {}
}

const liveClassesReducer = (liveClasses) => {
    return({
        type: actionTypes.SET_LIVECLASSES,
        payload: {
            liveClasses: liveClasses
        }
    })
}

export default liveClassesReducer