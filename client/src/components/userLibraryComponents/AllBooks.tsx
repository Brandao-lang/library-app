import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import '../../styles/userLibrary.css'
import LibraryModal from './modals/LibraryModal';

const AllBooks: React.FC = () => {
    const library = useSelector((state: RootState) => state.userLibrary)
    
    return (
        <>
            <p>Total ({library.userBooks.length})</p>
            <div className='book-list'>
                {!library.userBooks ? 
                <h1>No Books</h1> : 
                library.userBooks.map((book: { title: string; image: string | undefined; }, index: number) => {
                    return <div className='book-card' key={index}>
                                <LibraryModal index={index} title={book.title} img={book.image}/>
                                <p>Not Started</p>
                            </div>
                        })}
                    </div>
                </>
            );
        };

export default AllBooks;