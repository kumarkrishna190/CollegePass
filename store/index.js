import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import rootReducer from "../src/reducers";

//Middleware: Redux persist config
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['authReducer'], //Save reducer, offline available 
    blacklist: [], //Not saved
}

//Middleware: Redux persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

//Redux: store
const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(
            createLogger(),
            thunk
        )
    )
)

//Middleware: Redux persist persister
let persistor = persistStore(store)

export {store, persistor}