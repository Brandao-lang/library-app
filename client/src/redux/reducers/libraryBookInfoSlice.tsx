interface libraryBookInfoState {
    title: string,
    author: string,
    image: string,
    status: boolean,
    rating: number,
    notes: string
}

const initialState: libraryBookInfoState = {
    title: 'N/A',
    author: 'N/A',
    image: 'N/A',
    status:  false,
    rating: 0,
    notes: 'N/A'
}

export default function libraryBookInfo(state=initialState, action:any) {
    switch (action.type) {
        case 'book/SelectBook': {
            return {
                ...state, 
                    title: action.payload,
                    author: action.payload,
                    status: action.payload,
                    rating: action.payload,
                    notes: action.payload
            }
        }
        default:
            return state
    }
}

