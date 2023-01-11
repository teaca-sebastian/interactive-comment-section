// bootstrap imported stuff
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// hooks
import { useRecursiveDelete } from '../hooks/useRecursiveDelete'
import { useContext } from 'react'
// context
import { CommentContext } from '../context/CommentsContext'


export const DeleteCommentModal = ({ commentId, setShowModal, showModal }) => {
    const handleModalClose = () => setShowModal(false)
    const recursiveDelete = useRecursiveDelete()
    const { setComments, setShowToast } = useContext(CommentContext)

    const handleDelete = (id) => {
        setComments((prevComments) => recursiveDelete(prevComments, id));
        setShowToast(true)
    };

    return (
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
                        onClick={() => {
                            handleModalClose()
                            handleDelete(commentId)
                        }}
                        className="ms-2 bg-danger border-0 px-4 py-2" >
                        YES, DELETE
                    </Button>
                </div>
            </div>
        </Modal>
    )
}