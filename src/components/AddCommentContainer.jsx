// bootstrap imports
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// hooks
import { useContext, useState, useEffect } from 'react'
import { useClassConditional } from "../hooks/useClassConditional"
import { useArrayHandlers } from "../hooks/useArrayHandlers"
// context
import { UserContext } from '../context/UserContext'
// components
import { Tag } from './Tag'

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

    class Comment {
        constructor() {
            this.id = findLastId() + 1
            this.content = inputComment
            this.createdAt = "now"
            this.score = 0
            this.user = user
            this.replies = []
            if (!isMain) this.replyingTo = findCommentById(comments, commentId).user.username
        }
    }

    const handleAddComment = () => {
        const commentObj = new Comment
        setComments([...comments, commentObj])
        setInputComment('')
    }

    const handleAddReply = () => {
        const commentObj = new Comment
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
        <div className={classNames('ms-auto rounded bg-white p-2 py-4 mb-3', isReply ? 'col-11' : 'col-12')}>
            <div className="row px-3 position-relative pb-5 pb-md-0">
                <div className="col-md d-flex align-items-start pb-2">
                    <img className='avatar me-4 AddCommentAvatar' src={new URL(`../assets/images/avatars/image-${user.username}.png`, import.meta.url).href} alt="avatar" />
                    <Form.Control
                        as="textarea"
                        value={inputComment}
                        rows={3}
                        placeholder={isMain ? "Add a comment..." : `Replying to ${findCommentById(comments, commentId).user.username}...`}
                        onChange={(e) => setInputComment(e.target.value)}
                        required
                    />
                </div>
                <div className="col-2">
                    <Button
                        className='text-white bg-blue px-4 py-2 ms-auto d-block AddCommentButton'
                        onClick={() => {
                            if (isMain) {
                                handleAddComment()
                            } else {
                                handleAddReply()
                            }
                        }}
                    >
                        {isMain ? 'SEND' : 'REPLY'}
                    </Button>
                </div>
            </div>
        </div>
    )
}