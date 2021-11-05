import React, {useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { Modal, Button, Form } from 'react-bootstrap';
import { stars } from '../../../styles/assets/stars-rating';
import '../../../styles/userLibrary.css'

interface LibraryModalState {
  bookOptions : {
    status:string,
    rating: number
  }
}

interface LibraryModalProps {
  img: string | undefined,
  title: string,
  index: number,
  status: string,
  rating: number
}

const LibraryModal: React.FC<LibraryModalProps> = ({title, img, index, status, rating}) => {
    const [show, setShow] = useState(false)
    const [bookOptions, setBookOptions] = useState<LibraryModalState['bookOptions']>({
      status: status,
      rating: rating
    })
    
    const dispatch = useDispatch()
    const userID = useSelector((state:RootState) => state.userInfo.id)
    
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

   const handleChange = (e:any) => {
      setBookOptions({
        ...bookOptions,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = async(e:any) => {
      const update = {
          status: bookOptions.status,
          rating: bookOptions.rating,
          userID,
          index
      }

      dispatch({type:'library/updateBook', payload: update})

      try {
        await axios.put('/bookStatus', update)

      } catch (err) {
        console.log(`book status change failed: ${err}`)

      }
    }

    const deleteBook = async(index: number) => {
      dispatch({type: 'library/removeBook', payload: index})

      await axios.delete('/removeBook', {
          params: {
              index,
              userID
          }
      })
      .then(res => {
          console.log(res.data)
      }).catch(err => {
          console.log(`book could not be removed from the server: ${err}`)
      })
  }

  return (
    <div key={index}>
      <img src={img} alt='cover' onClick={handleShow}/>
      <Modal 
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
              value={bookOptions.status}
              onChange={handleChange}
              >
                <option>Change Status</option>
                <option value="Not Started">Not Started</option>
                <option value="Reading">Reading</option>
                <option value="Finished">Finished</option>
              </Form.Select>
              <Form.Select 
              className='rating-select'
              name='rating' 
              aria-label="Default select example"
              value={bookOptions.rating}
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
              <span className='current-rating'>{stars[bookOptions.rating]}</span>
            </div>
          </div>
          <br/>
          <Button className='delete-btn' variant='danger' onClick={() => deleteBook(index)}>Delete</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
};

export default LibraryModal;