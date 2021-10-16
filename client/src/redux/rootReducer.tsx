import{ combineReducers } from 'redux'
import bookInfoSlice from './reducers/bookInfoSlice'

const rootReducer = combineReducers({
    bookInfo: bookInfoSlice
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>