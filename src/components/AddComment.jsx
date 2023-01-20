// bootstrap imports
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// hooks
import { useContext, useState } from 'react'
// context
import { UserContext } from '../context/UserContext'

export const AddCommentContainer = ({ comments, setComments}) => {
    const { user } = useContext(UserContext)
    const [inputComment, setInputComment] = useState('')


    const handleAddComment = (commentText) => {
        const commentObj = {
            "id": findLastId() + 1,
            "content": commentText,
            "createdAt": "now",
            "score": 0,
            "user": user,
            "replies": []
        }
        setComments([...comments, commentObj])
        console.log(commentObj)
        setInputComment('')
    }

    function findLastId() {
        const lastReplyId = comments
            .filter(comment => comment.replies.length !== 0)
            .map(comment => comment.replies)
            .flat(1)
            .reduce((prev, current) => (prev.id > current.id) ? prev : current)
        const lastCommentId = comments.reduce((prev, current) => (prev.id > current.id) ? prev : current)
        return (lastCommentId > lastReplyId ? lastCommentId : lastReplyId).id
    }

    return (
        <div className="ms-auto rounded bg-white p-2 py-4 col-12">
            <div className="row px-3">
                <div className="col-1">
                    <img className='avatar' src={user.image.png} alt="avatar" />
                </div>
                <div className="col">
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
                        className='text-white bg-blue px-4 py-2'
                        onClick={() => {
                            handleAddComment(inputComment)
                        }}
                    >
                        SEND
                    </Button>
                </div>
            </div>
        </div>
    )
}