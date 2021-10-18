import{ combineReducers } from 'redux'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bookInfoSlice from './reducers/bookInfoSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['bookInfo']
}

const rootReducer = combineReducers({
    bookInfo: bookInfoSlice
})

export default persistReducer(persistConfig, rootReducer)
export type RootState = ReturnType<typeof rootReducer>