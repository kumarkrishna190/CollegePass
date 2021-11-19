import { actionTypes } from "../constants/ActionTypes"

const initialState = {
    streamArchieve: []
}

const streamArchieveReducer = (streamArchieve) => {
    return({
        type: actionTypes.SET_STREAMARCHIEVE,
        payload: {
            streamArchieve: streamArchieve
        }
    })
}

export default streamArchieveReducer