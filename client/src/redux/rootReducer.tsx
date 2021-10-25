import{ combineReducers } from 'redux'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bookInfoSlice from './reducers/bookInfoSlice'
import userSlice from './reducers/userSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['bookInfo', 'userInfo']
}

const rootReducer = combineReducers({
    bookInfo: bookInfoSlice,
    userInfo: userSlice
})

export default persistReducer(persistConfig, rootReducer)
export type RootState = ReturnType<typeof rootReducer>