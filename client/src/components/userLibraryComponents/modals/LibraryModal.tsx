import React, {useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { Modal, Button, Form } from 'react-bootstrap';
import { stars } from '../../../styles/assets/stars-rating';
import '../../../styles/userLibrary.css'

interface LibraryModalProps {
  img: string | undefined,
  title: string,
  index: number
}

const LibraryModal: React.FC<LibraryModalProps> = ({title, img, index}) => {
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(0)
    
    const dispatch = useDispatch()
    const user = useSelector((state:RootState) => state.userInfo.email)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e:any) => {
        setRating(e.target.value)
    }

    const deleteBook = async(index: number) => {
      dispatch({type: 'library/removeBook', payload: index})

      await axios.delete('/removeBook', {
          params: {
              index,
              user
          }
      })
      .then(res => {
          console.log(res.data)
      }).catch(err => {
          console.log(`book could not be removed from the server: ${err}`)
      })
  }

  return (
    <>
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
              <Form.Select className='modal-select' aria-label="Default select example">
                <option>Change Status</option>
                <option value="1">Not Started</option>
                <option value="2">Reading</option>
                <option value="3">Finished</option>
              </Form.Select>
              <Form.Select 
              className='rating-select' 
              aria-label="Default select example"
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
              <span className='current-rating'>{stars[rating]}</span>
            </div>
          </div>
          <br/>
          <Button className='delete-btn' variant='danger' onClick={() => deleteBook(index)}>Delete</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
};

export default LibraryModal;