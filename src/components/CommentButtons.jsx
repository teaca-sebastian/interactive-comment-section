// bootstrap imported components
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Modal from 'react-bootstrap/Modal'
// hooks
import { useContext, useState } from 'react';
import { useRecursiveDelete } from '../hooks/useRecursiveDelete';
// contex
import { CommentContext } from '../context/CommentsContext';

export const CommentButtons = ({ isAuthor, commentId }) => {
    const [ showModal, setShowModal ] = useState(false)
    const { setComments } = useContext(CommentContext)
    const recursiveDelete = useRecursiveDelete()

    const handleModalClose = () => setShowModal(false)
    const handleModalShow = () => setShowModal(true)
    // Create modal for deleting
    const handleDelete = (id) => {
        setComments((prevComments) => recursiveDelete(prevComments, id));
    };

    if (isAuthor) return (
        <>
            <Modal className='deleteModal' show={showModal} onHide={handleModalClose} size="md" centered> 
                <div className='p-4'>
                    <h1 className='fs-3'>Delete comment</h1>
                    <p className='text-muted' >Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                    <div className="d-flex justify-content-end align-items-center">
                        <Button
                            onClick={handleModalClose} 
                            className="ms-2 bg-secondary border-0 px-4 py-2" >
                            NO, CANCEL
                        </Button>
                        <Button
                            onClick={handleModalClose} 
                            className="ms-2 bg-danger border-0 px-4 py-2" >
                            YES, DELETE
                        </Button>
                    </div>
                </div>
            </Modal>
            <ButtonGroup className=' border-0 fw-bold'>
                <Button
                    className='text-danger d-flex fw-bold align-items-center bg-transparent border-0'
                    onClick={handleModalShow} >
                    <i className='bi-trash-fill fs-5 me-1'></i>
                    Delete
                </Button>
                <Button className='text-blue d-flex fw-bold align-items-center bg-transparent border-0'>
                    <i className='bi-pen-fill fs-5 me-1'></i>
                    Edit
                </Button>
            </ButtonGroup>
        </>
    )

    return (
        <Button className='bg-transparent border-0 text-blue fw-bold d-flex align-items-center my-0'>
            <i className='bi-reply-fill fs-4'></i>
            Reply
        </Button>
    )
}