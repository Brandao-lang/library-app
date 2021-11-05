import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { Button } from 'react-bootstrap'
import '../../styles/userLibrary.css'
import LibraryModal from './modals/LibraryModal';

const AllBooks: React.FC = () => {
    const [arrayName, setArrayName] = useState<'allUserBooks' | 'readingBooks' | 'notStartedBooks' | 'finishedBooks'>('allUserBooks')
    const library = useSelector((state: RootState) => state.userLibrary)
    
    return (
        <>
            <Button style={{position: 'absolute', right:'0'}} onClick={() => setArrayName('allUserBooks')}>all</Button>
            <Button style={{position: 'absolute', right:'50px'}} onClick={() => setArrayName('readingBooks')}>reading</Button>
            <Button style={{position: 'absolute', right:'140px'}} onClick={() => setArrayName('finishedBooks')}>finished</Button>
            <Button style={{position: 'absolute', right:'230px'}} onClick={() => setArrayName('notStartedBooks')}>not started</Button>
            <p>Total ({library[`${arrayName}`].length})</p>
            <div className='book-list'>
                {!library[`${arrayName}`] ? 
                <h1>No Books</h1> : 
                library[`${arrayName}`].map((book: { title: string; image: string | undefined; status: string; rating: number }, index: number) => {
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