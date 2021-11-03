interface userLibraryState {
    allUserBooks: {
        title: string,
        author: string,
        pages: number
        image: string,
        status: string,
        rating: number
    }[]
}

const initialState: userLibraryState = {
    allUserBooks: []
}

export default function userLibrarySlice(state=initialState, action:any) {
    switch(action.type) {
        case 'library/AddBook': {
            return {
               ...state, allUserBooks: [...state.allUserBooks, {
                   title: action.payload.title,
                   author: action.payload.author,
                   pages: action.payload.pages,
                   image: action.payload.image,
                   status: 'Not Started',
                   rating: 0
               }]
            }
        }

        case 'library/removeBook': {
            let bookArr = [...state.allUserBooks]
            bookArr.splice(action.payload, 1)

            return {
                ...state, allUserBooks: bookArr
            }
        }
        case 'library/updateBook' : {
            const bookArr = [...state.allUserBooks]

            bookArr[action.payload.index].status = action.payload.status
            bookArr[action.payload.index].rating = action.payload.rating

            return {
               ...state, allUserBooks: bookArr
            }
        }
        case 'library/getLibrary': {
            return {
                ...state, allUserBooks: action.payload
            }
        }
        case 'library/EmptyLibrary': {
            return {
               ...state, allUserBooks: []
            }
        }
        default:
            return state
    }
}