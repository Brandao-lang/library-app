import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { Button } from 'react-bootstrap'
import '../../styles/userLibrary.css'
import LibraryModal from './modals/LibraryModal';
import { stars } from '../../styles/assets/stars-rating';


const AllBooks: React.FC = () => {
    const [arrayName, setArrayName] = useState<'allUserBooks' | 'readingBooks' | 'notStartedBooks' | 'finishedBooks'>('allUserBooks')
    const library = useSelector((state: RootState) => state.userLibrary)
    const dispatch = useDispatch()

    const updateReading = () => {
        dispatch({type:'library/readingFilter'})
        setArrayName('readingBooks')
    }
    const updateFinished = () => {
        dispatch({type:'library/finishedFilter'})
        setArrayName('finishedBooks')
    }
    const updateNotStarted = () => {
        dispatch({type:'library/notStartedFilter'})
        setArrayName('notStartedBooks')
    }
    
    return (
        <>
            <div className='filter-btn-container'>
                <Button className='filter-btn' variant='secondary' onClick={() => setArrayName('allUserBooks')}>all</Button>
                
                <Button className='filter-btn' variant='secondary' onClick={ updateReading}>reading</Button>
                
                <Button className='filter-btn' variant='secondary' onClick={updateFinished}>finished</Button>
                
                <Button className='filter-btn' variant='secondary' onClick={updateNotStarted}>not started</Button>
            </div>
            
            <p>Total ({library[`${arrayName}`].length})</p>
            <div className='book-list'>
                {!library[`${arrayName}`] ? 
                <h1>No Books</h1> : 
                library[`${arrayName}`].map((book: { title: string; image: string | undefined; status: string; rating: number }, index: number) => {
                    return <div className='book-card' key={index}>
                                <LibraryModal index={index} title={book.title} img={book.image} propStatus={book.status} propRating={book.rating} arrayName={arrayName}/>
                                <strong className={
                                    book.status === 'Reading' ? 'status-reading' : book.status === 'Finished' ? 'status-finished' : 'status-not-started'
                                }>{book.status}</strong>
                                <br/>
                                {arrayName === 'finishedBooks' ? stars[book.rating] : ''}
                            </div>
                        })}
                    </div>
                </>
            );
        };

export default AllBooks;