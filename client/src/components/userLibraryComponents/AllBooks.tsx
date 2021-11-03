import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import '../../styles/userLibrary.css'
import LibraryModal from './modals/LibraryModal';

const AllBooks: React.FC = () => {
    const library = useSelector((state: RootState) => state.userLibrary)
    
    return (
        <>
            <p>Total ({library.allUserBooks.length})</p>
            <div className='book-list'>
                {!library.allUserBooks ? 
                <h1>No Books</h1> : 
                library.allUserBooks.map((book: { title: string; image: string | undefined; status: string; rating: number }, index: number) => {
                    return <div className='book-card' key={index}>
                                <LibraryModal index={index} title={book.title} img={book.image} status={book.status} rating={book.rating}/>
                                <p>{book.status}</p>
                            </div>
                        })}
                    </div>
                </>
            );
        };

export default AllBooks;