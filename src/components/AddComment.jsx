// bootstrap imports
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// hooks
import { useContext, useState, useEffect } from 'react'
// context
import { UserContext } from '../context/UserContext'

export const AddCommentContainer = () => {
    const { user } = useContext(UserContext)
    const [inputComment, setInputComment] = useState('')

    // const addComment = (commentText) => {
    //     const commentObj = {
    //         "id": (comments[comments.length - 1].replies.length === 0 ? comments[comments.length - 1].id + 1 : comments[comments.length - 1].replies[(comments[comments.length - 1].replies.length) - 1].id + 1),
    //         "content": commentText,
    //         "createdAt": "now",
    //         "score": 0,
    //         "user": user,
    //         "replies": []
    //     }
    //     setComments([...comments, commentObj])
    //     setInputComment('')
    // }


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
                    />
                </div>
                {/* text-area */}
                <div className="col-2">
                    <Button
                        className='text-white bg-blue px-4 py-2'
                        >
                        SEND
                    </Button>
                </div>
            </div>
        </div>
    )
}