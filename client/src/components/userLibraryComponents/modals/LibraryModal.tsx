import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { Modal, Button, Form } from 'react-bootstrap';
import { stars } from '../../../styles/assets/stars-rating';
import '../../../styles/userLibrary.css'

interface LibraryModalState {
  bookOptions : {
    status: string,
    rating: number
  }
}

interface LibraryModalProps {
  img: string | undefined,
  title: string,
  index: number,
  propStatus: string,
  propRating: number,
  arrayName: string
}

const LibraryModal: React.FC<LibraryModalProps> = ({title, img, index, propStatus, propRating, arrayName}) => {
    const dispatch = useDispatch()
    const userID = useSelector((state:RootState) => state.userInfo.id)
    const library = useSelector((state: RootState) => state.userLibrary.allUserBooks)
    // const allShelves = useSelector((state: RootState) => state.userLibrary.userShelves)
    const [show, setShow] = useState(false)
    const [options, setOptions] = useState<LibraryModalState['bookOptions']>({
      status: '',
      rating: 0
    })
    
    const topIndex = library.findIndex((book: { title: string }) => book.title === title)

    const handleClose = () => setShow(false) 
    const handleShow = () => setShow(true)

    const checkArray = (arrayName: string) => {
      if (arrayName === 'readingBooks') {
        dispatch({type:'library/readingFilter'}) 
        } 
      else if (arrayName === 'finishedBooks') {
        dispatch({type:'library/finishedFilter'})
        } 
      else if (arrayName === 'notStartedBooks') {
        dispatch({type:'library/notStartedFilter'})
      }
    }

   const handleChange = (e:any) => {
      setOptions({
        ...options,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = async(topIndex:number) => {
      const update = {
          status: options.status,
          rating: options.rating,
          userID,
          topIndex,
          title
      }

      dispatch({type:'library/updateBook', payload: update})
      checkArray(arrayName)

      try {
        await axios.put('/bookStatus', update)
      } 
      catch (err) {
        console.log(`book status change failed: ${err}`)
      }
    }

    const deleteBook = async(index: number, topIndex:number) => {
      dispatch({type: 'library/removeBook', payload: {index, title}})
      checkArray(arrayName)
      
      await axios.delete('/removeBook', {
          params: {
              topIndex,
              userID
          }
      })
      .then(res => {
          console.log(res.data)
      }).catch(err => {
          console.log(`book could not be removed from the server: ${err}`)
      })
      
  }

  useEffect(() => {
    setOptions({
      status: propStatus,
      rating: propRating
    })
  }, [propStatus, propRating])


  return (
    <div className='modal-container'>
      <img src={img} alt='cover' onClick={handleShow}/>
      <Modal
      key={index++}
      show={show} 
      onHide={handleClose}
      centered
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modal-box'>
            <img src={img} alt='cover-art' />
            <div className='options-container'>
              <Form.Select 
              className='status-select'
              name='status' 
              aria-label="Default select example"
              value={options.status}
              onChange={handleChange}
              >
                <option value="Not Started">Not Started</option>
                <option value="Reading">Reading</option>
                <option value="Finished">Finished</option>
              </Form.Select>

              {/* <Form.Select
              className='shelf-select'
              >
                {allShelves.map((shelf, index) => {
                  return <option value={index}>{shelf.name}</option>
                })}
              </Form.Select> */}

              <Form.Select 
              className='rating-select'
              name='rating' 
              aria-label="Default select example"
              value={options.rating}
              onChange={handleChange}
              >
                <option value="0">0</option>
                <option value="0.5">0.5</option>
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
                <option value="3.5">3.5</option>
                <option value="4">4</option>
                <option value="4.5">4.5</option>
                <option value="5">5</option>
              </Form.Select>
              <br/>
              <span className='current-rating'>{stars[options.rating]}</span>
            </div>
          </div>
          <br/>
          <Button className='delete-btn' variant='danger' onClick={() => deleteBook(index, topIndex)}>Delete</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit(topIndex)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
};

export default LibraryModal;