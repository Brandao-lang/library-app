interface userLibraryState {
    allUserBooks:  Array<{
        title: string,
        author: Array<string>,
        pages: number
        image: string,
        status: string,
        rating: number
        id: number 
    }>,
    readingBooks: Array<{
        title: string,
        author: Array<string>,
        pages: number
        image: string,
        status: string,
        rating: number
        id: number 
    }>,
    notStartedBooks: Array<{
        title: string,
        author: Array<string>,
        pages: number
        image: string,
        status: string,
        rating: number
        id: number 
    }>,
    finishedBooks: Array<{
        title: string,
        author: Array<string>,
        pages: number
        image: string,
        status: string,
        rating: number
        id: number 
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
                        rating: 0,
                        id: action.payload.bookID
                    }]
            }
        }

        case 'library/removeBook': {
            let allBooksArr = [...state.allUserBooks]
            
            if (allBooksArr[action.payload.topIndex].status === 'Reading') {
                const readingBooksArr = [...state.readingBooks]
                readingBooksArr.splice(action.payload.index, 1)
                allBooksArr.splice(action.payload.topIndex, 1)

                return {
                    ...state, 
                        allUserBooks: allBooksArr,
                        readingBooks: readingBooksArr
                }
            } else if (allBooksArr[action.payload.topIndex].status === 'Finished') {
                const finishedBooksArr = [...state.finishedBooks]
                finishedBooksArr.splice(action.payload.index, 1)
                allBooksArr.splice(action.payload.topIndex, 1)

                return {
                    ...state, 
                        allUserBooks: allBooksArr,
                        finishedBooks: finishedBooksArr
                } 
            } else if (allBooksArr[action.payload.topIndex].status === 'Not Started') {
                const notStartedBooksArr = [...state.notStartedBooks]
                notStartedBooksArr.splice(action.payload.index, 1)
                allBooksArr.splice(action.payload.topIndex, 1)

                return {
                    ...state, 
                        allUserBooks: allBooksArr,
                        notStartedBooks: notStartedBooksArr
                } 
            } 
            
                return state
        }
        case 'library/readingFilter': {
            let filteredArr = state.allUserBooks.filter(books => (books.status === 'Reading'))

            return {
                ...state, readingBooks: filteredArr
            }
        }
        case 'library/finishedFilter': {
            let filteredArr = state.allUserBooks.filter(books => (books.status === 'Finished'))
            
            return {
                ...state, finishedBooks: filteredArr
            }
        }
        case 'library/notStartedFilter': {
            let filteredArr = state.allUserBooks.filter(books => (books.status === 'Not Started'))

            return {
                ...state, notStartedBooks: filteredArr
            }
        }
        case 'library/updateBook' : {
            const allBooksArr = [...state.allUserBooks]
            
            allBooksArr[action.payload.topIndex].status = action.payload.status
            allBooksArr[action.payload.topIndex].rating = action.payload.rating
            
            return {
               ...state, 
                    allUserBooks: allBooksArr,
            }
        }
        case 'library/getLibrary': {
            return {
                ...state, 
                    allUserBooks: action.payload
            }
        }
        case 'library/EmptyLibrary': {
            return {
               ...state, 
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