interface userState {
    id: number,
    username: string,
    email: string,
    isLoggedIn: boolean
}

const initialState: userState = {
    id: 0,
    username: '',
    email: '',
    isLoggedIn: false
}

export default function userSlice(state=initialState, action:any) {
    switch(action.type) {
        case 'user/LoginUser': {
            return {
                id: action.payload._id,
                username: action.payload.name,
                email: action.payload.email,
                isLoggedIn: true
            }
        }
        case 'user/LogoutUser': {
            return {
                id: 0,
                username: '',
                email: '',
                isLoggedIn: false
            }
        }
        default:
            return state
    }
}