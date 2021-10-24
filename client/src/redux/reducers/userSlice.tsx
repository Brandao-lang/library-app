interface userState {
    username: string,
    email: string,
    isLoggedIn: boolean
}

const initialState: userState = {
    username: '',
    email: '',
    isLoggedIn: false
}

export default function userSlice(state=initialState, action:any) {
    switch(action.type) {
        case 'user/LoginUser': {
            return {
                username: action.payload.name,
                email: action.payload.email,
                isLoggedIn: true
            }
        }
        case 'user/LogoutUser': {
            return {
                username: '',
                email: '',
                isLoggedIn: false
            }
        }
        default:
            return state
    }
}