interface userLibraryState {
    userBooks: {
        title: string,
        author: string,
        pages: number
    }[]
}

const initialState: userLibraryState = {
    userBooks: []
}

export default function userLibrarySlice(state=initialState, action:any) {
    switch(action.type) {
        case 'library/AddBook': {
            return {
               //code here
            }
        }
        case 'library/RemoveBook': {
            return {
               //code here
            }
        }
        case 'library/GetLibrary': {
            return {
                //code here
            }
        }
        default:
            return state
    }
}