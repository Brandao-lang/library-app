interface bookInfoState {
    title: string,
    author: Array<string>,
    publisher: string,
    publishedDate: string,
    rating: string,
    pages: number,
    image: string,
    description: string,
    id: number
}

const initialState: bookInfoState = {
    title: 'N/A',
    author: [],
    publisher: 'N/A',
    publishedDate: 'N/A',
    rating: 'N/A',
    pages: 0,
    image: 'N/A',
    description: 'N/A',
    id: 0
}

export default function bookInfoSlice(state=initialState, action:any) {
    switch(action.type) {
        case 'book/SelectedBook': {
            return {
                ...state,
                    title: action.payload.bookTitle,
                    author: action.payload.author,
                    publisher: action.payload.publisher,
                    publishedDate: action.payload.publishedDate,
                    rating: action.payload.averageRating,
                    pages: action.payload.pageCount,
                    image: action.payload.imageLinks,
                    description: action.payload.description,
                    id: action.payload.id
            }
        }
        default:
            return state
    }
}