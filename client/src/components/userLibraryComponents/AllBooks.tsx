import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { Alert, Button } from 'react-bootstrap'
import '../../styles/userLibrary.css'
import LibraryModal from './modals/LibraryModal';
import { stars } from '../../styles/assets/stars-rating';


const AllBooks: React.FC = () => {
    const [arrayName, setArrayName] = useState<'allUserBooks' | 'readingBooks' | 'notStartedBooks' | 'finishedBooks'>('allUserBooks')
    const library = useSelector((state: RootState) => state.userLibrary)
    const dispatch = useDispatch()
    console.log(library)

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
            <div className='library-nav'>
                <div>
                    <Button className='filter-btn' variant='secondary' onClick={() => setArrayName('allUserBooks')}>all</Button>
                    
                    <Button className='filter-btn' variant='secondary' onClick={updateNotStarted}>not started</Button>
                    
                    <Button className='filter-btn' variant='secondary' onClick={ updateReading}>reading</Button>
                    
                    <Button className='filter-btn' variant='secondary' onClick={updateFinished}>finished</Button>
                    
                </div>
                <p>Total ({library[`${arrayName}`].length})</p>
            </div>
                
            <div className='book-list'>
                {arrayName === 'allUserBooks' && library[`${arrayName}`].length < 1 ? 
                <Alert variant='secondary'>
                    No books in this library, <Alert.Link href='/search'>try making a search</Alert.Link> to begin a collection.
                </Alert> : 
                library[`${arrayName}`].map((book: { title: string; image: string | undefined; status: string; rating: number, bookID: number }, index: number) => {
                    return <div className='book-card' key={index}>
                                <LibraryModal index={index} title={book.title} img={book.image} propStatus={book.status} propRating={book.rating} bookID={book.bookID}arrayName={arrayName}/>
                                <strong className={
                                    book.status === 'Reading' ? 'status-reading' : book.status === 'Finished' ? 'status-finished' : 'status-not-started'
                                }>{book.status}</strong>
                                <br/>
                                {arrayName === 'finishedBooks' ? <p>{stars[book.rating]}</p> : ''}
                            </div>
                        })}
                    </div>
                </>
            );
        };

export default AllBooks;