// bootstrap imported components
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
// components
import { DeleteCommentModal } from './DeleteCommentModal';
// hooks
import { useState } from 'react';
// contex

export const CommentButtons = ({ isAuthor, commentId, setComments }) => {
    const [showModal, setShowModal] = useState(false)

    const handleModalShow = () => setShowModal(true)

    if (isAuthor) return (
        <>
            <DeleteCommentModal showModal={showModal} setShowModal={setShowModal} commentId={commentId} setComments={setComments} />
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