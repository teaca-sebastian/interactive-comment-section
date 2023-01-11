// bootstrap imported components
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Modal from 'react-bootstrap/Modal'
// components
import { DeleteCommentModal } from './DeleteCommentModal';
import { DeleteCommentToast } from './DeleteCommentToast';
// hooks
import { useContext, useState } from 'react';
import { useRecursiveDelete } from '../hooks/useRecursiveDelete';
// contex
import { CommentContext } from '../context/CommentsContext';

export const CommentButtons = ({ isAuthor, commentId }) => {
    const [ showModal, setShowModal] = useState(false)

    const handleModalShow = () => setShowModal(true)

    if (isAuthor) return (
        <>
            <DeleteCommentModal showModal={showModal} setShowModal={setShowModal} commentId={commentId}/>
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