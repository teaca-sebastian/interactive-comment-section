// bootstrap imports
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// hooks
import { useContext, useState } from 'react'
import { useClassConditional } from "../hooks/useClassConditional"
import { useArrayHandlers } from "../hooks/useArrayHandlers"
// context
import { UserContext } from '../context/UserContext'

export const AddCommentContainer = ({ comments, setComments, isReply, isMain = true, commentId, handleReplying }) => {
    const classNames = useClassConditional()
    const { findCommentById } = useArrayHandlers()
    const { user } = useContext(UserContext)
    const [inputComment, setInputComment] = useState('')

    
    function findLastId() {
        const lastReplyId = comments
            .filter(comment => comment.replies.length !== 0)
            .map(comment => comment.replies)
            .flat(1)
            .reduce((prev, current) => (prev.id > current.id) ? prev : current)
        const lastCommentId = comments.reduce((prev, current) => (prev.id > current.id) ? prev : current)
        return (lastCommentId > lastReplyId ? lastCommentId : lastReplyId).id
    }

    const commentObj = {
        "id": findLastId() + 1,
        "content": inputComment,
        "createdAt": "now",
        "score": 0,
        "user": user,
        "replies": []
    }

    const handleAddComment = () => {
        setComments([...comments, commentObj])
        setInputComment('')
    }

    const handleAddReply = () => {
        const newArray = comments.map(comment => {
            if (!isReply) {
                if (comment.id === commentId) {
                    return { ...comment, replies: [...comment.replies, commentObj]}
                }
                return comment
            } else {
                if (comment.replies.find(reply => reply.id === commentId)) {
                    return { ...comment, replies: [...comment.replies, commentObj]}
                }
                return comment
            }
        })
        setComments(newArray)
        handleReplying()
    }

    return (
        <div className={classNames('ms-auto rounded bg-white p-2 py-4', isReply ? 'col-11' : 'col-12')}>
            <div className="row px-3">
                <div className="col-9 col-md d-flex align-items-start">
                    <img className='avatar me-4' src={user.image.png} alt="avatar" />
                    <Form.Control
                        as="textarea"
                        value={inputComment}
                        rows={3}
                        placeholder="Add a comment..."
                        onChange={(e) => setInputComment(e.target.value)}
                        required
                    />
                </div>
                {/* text-area */}
                <div className="col-2">
                    <Button
                        className='text-white bg-blue px-4 py-2 ms-auto d-block'
                        onClick={() => {
                            if (isMain) {
                                handleAddComment()
                            } else {
                                handleAddReply()
                            }
                        }}
                    >
                        SEND
                    </Button>
                </div>
            </div>
        </div>
    )
}