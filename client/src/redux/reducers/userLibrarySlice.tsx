interface userLibraryState {
    allUserBooks:  Array<{
        title: string,
        author: string,
        pages: number
        image: string,
        status: string,
        rating: number 
    }>,
    readingBooks: Array<{
        title: string,
        author: string,
        pages: number
        image: string,
        status: string,
        rating: number 
    }>,
    notStartedBooks: Array<{
        title: string,
        author: string,
        pages: number
        image: string,
        status: string,
        rating: number 
    }>,
    finishedBooks: Array<{
        title: string,
        author: string,
        pages: number
        image: string,
        status: string,
        rating: number 
    }>,
}

const initialState: userLibraryState = {
    allUserBooks: [],
    readingBooks: [],
    notStartedBooks: [],
    finishedBooks: []
}

export default function userLibrarySlice(state=initialState, action:any) {
    switch(action.type) {
        case 'library/AddBook': {
            return {
               ...state, 
                    allUserBooks: [...state.allUserBooks, {
                        title: action.payload.title,
                        author: action.payload.author,
                        pages: action.payload.pages,
                        image: action.payload.image,
                        status: 'Not Started',
                        rating: 0
                    }],
                    notStartedBooks: [...state.notStartedBooks, {
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
            const allBooksArr = [...state.allUserBooks]
            const readingBooksArr = [...state.readingBooks]
            const finishedBooksArr = [...state.finishedBooks]
            const notStartedBooksArr = [...state.notStartedBooks]

            allBooksArr[action.payload.index].status = action.payload.status
            allBooksArr[action.payload.index].rating = action.payload.rating

            if (allBooksArr[action.payload.index].status === 'Reading') {
                readingBooksArr.push(allBooksArr[action.payload.index])
            } else if (allBooksArr[action.payload.index].status === 'Finished') {
                finishedBooksArr.push(allBooksArr[action.payload.index])
            } else {
                notStartedBooksArr.push(allBooksArr[action.payload.index])
            }

            return {
               ...state, 
                    allUserBooks: allBooksArr,
                    readingBooks: readingBooksArr,
                    finishedBooks: finishedBooksArr,
                    notStartedBooks: notStartedBooksArr
            }
        }
        case 'library/getLibrary': {
            return {
                ...state, allUserBooks: action.payload
            }
        }
        case 'library/EmptyLibrary': {
            return {
               ...initialState, 
                    allUserBooks: [],
                    readingBooks: [],
                    finishedBooks: [],
                    notStartedBooks: []
            }
        }
        default:
            return state
    }
}