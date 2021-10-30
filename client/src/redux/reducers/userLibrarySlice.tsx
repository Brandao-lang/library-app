interface userLibraryState {
    userBooks: {
        title: string,
        author: string,
        pages: number
        image: string
    }[]
}

const initialState: userLibraryState = {
    userBooks: []
}

export default function userLibrarySlice(state=initialState, action:any) {
    switch(action.type) {
        case 'library/AddBook': {
            return {
               ...state, userBooks: [...state.userBooks, {
                   title: action.payload.title,
                   author: action.payload.author,
                   pages: action.payload.pages,
                   image: action.payload.image
               }]
            }
        }

        case 'library/RemoveBook': {
            let bookArr = [...state.userBooks]
            bookArr.splice(action.payload, 1)

            return {
                ...state, userBooks: bookArr
            }
        }
        case 'library/GetLibrary': {
            return {
                ...state, userBooks: action.payload
            }
        }
        case 'library/EmptyLibrary': {
            return {
               ...state, userBooks: []
            }
        }
        default:
            return state
    }
}