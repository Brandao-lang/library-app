import{ combineReducers } from 'redux'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bookInfoSlice from './reducers/bookInfoSlice'
import userLibrarySlice from './reducers/userLibrarySlice';
import userSlice from './reducers/userSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['bookInfo', 'userInfo', 'userLibrary']
}

const rootReducer = combineReducers({
    bookInfo: bookInfoSlice,
    userInfo: userSlice,
    userLibrary: userLibrarySlice
})

export default persistReducer(persistConfig, rootReducer)
export type RootState = ReturnType<typeof rootReducer>