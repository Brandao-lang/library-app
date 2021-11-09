import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios';
import { RootState } from '../../../redux/rootReducer';
// import axios from 'axios'

interface CreateShelfModalState {
    shelfName: string
}

const CreateShelfModal:React.FC = () => {
    const [shelfName, setShelfName] = useState<CreateShelfModalState['shelfName']>('')
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const userID = useSelector((state:RootState) => state.userInfo.id)
   
    const handleClose = () => setShow(false) 
    const handleShow = () => setShow(true)

    const handleChange = (e:any) => {
        setShelfName(e.target.value)
    }

    const handleSubmit = async(e:any) => {
        e.preventDefault()
        
        dispatch({type:'library/addShelf', payload: shelfName})
        console.log(userID)

        try {
          const shelf = {
            name: shelfName,
            id: userID
          }

          await axios.post('/addShelf', shelf)
        } catch (err) {
          console.log(`add shelf client request failed: ${err}`)

        } finally {
          handleClose()

        }
      }

    return (
        <>
          <Button variant='secondary' onClick={handleShow}>
            <svg style={{marginRight: '10px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFFF" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
            Add Shelf
            </Button>
          <Modal
            show={show} 
            onHide={handleClose}
            centered
           >
          <Modal.Header>
          <Modal.Title>Create a Shelf</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Control onChange={handleChange} placeholder='Enter name'></Form.Control>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
};

export default CreateShelfModal;