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
                    }]
            }
        }

        case 'library/removeBook': {
            let allBooksArr = [...state.allUserBooks]
            
            const title:string  = action.payload.title
          
            const find = (book: { title: string }) => book.title === title

            const index = allBooksArr.findIndex(find)

            if (allBooksArr[index].status === 'Reading') {
                const readingBooksArr = [...state.readingBooks]
                readingBooksArr.splice(action.payload.index, 1)
                allBooksArr.splice(index, 1)

                return {
                    ...state, 
                        allUserBooks: allBooksArr,
                        readingBooks: readingBooksArr
                }
            } else if (allBooksArr[index].status === 'Finished') {
                const finishedBooksArr = [...state.finishedBooks]
                finishedBooksArr.splice(action.payload.index, 1)
                allBooksArr.splice(index, 1)

                return {
                    ...state, 
                        allUserBooks: allBooksArr,
                        finishedBooks: finishedBooksArr
                } 
            } else if (allBooksArr[index].status === 'Not Started') {
                const notStartedBooksArr = [...state.notStartedBooks]
                notStartedBooksArr.splice(action.payload.index, 1)
                allBooksArr.splice(index, 1)

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

            // this is a temp solution, we are finding the index in the original array based on the title of the book...this is easily prone to errors with two books that have the same title
            
            const title:string  = action.payload.title
            
            const find = (book: { title: string }) => book.title === title
            
            const i = allBooksArr.findIndex(find)

            
            allBooksArr[i].status = action.payload.status
            allBooksArr[i].rating = action.payload.rating
            
            return {
               ...state, 
                    allUserBooks: allBooksArr,
            }
        }
        case 'library/getLibrary': {
            return {
                ...state, 
                    allUserBooks: action.payload.all_books
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