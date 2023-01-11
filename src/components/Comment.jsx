// bootstrap imported stuff
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
// components
import { Tag } from './Tag'
import { Avatar } from './Avatar'
import { CommentButtons } from './CommentButtons'
// hooks
import { useEffect, useContext } from 'react'
import { useClassConditional } from '../hooks/useClassConditional'
// context
import { UserContext } from '../context/UserContext'


export const Comment = ({ isReply = false, isAuthor = false, comment }) => {
    const classNames = useClassConditional()
    const { user } = useContext(UserContext)
    // TO DO: for new comments, create "x time ago" format

    
    // I've made the replies work with a recursion,
    // to avoid creating the same component again
    const replies = (comment.replies || []).map(reply => {
        return <Comment isReply={true} isAuthor={user.username === reply.user.username} comment={reply} key={reply.id} />
    })

    return (
        <>
            <div className={classNames('ms-auto rounded bg-white p-2 py-4', isReply ? 'col-11' : 'col-12')}>
                <div className="row g-0">
                    <div className="col-1 d-flex justify-content-center align-items-start">
                        {/* like component */}
                        <ButtonGroup vertical className='bg-light-gray rounded'>
                            <Button className='bg-transparent border-0' size='sm' ><i className='bi-plus text-muted'></i></Button>
                            <p className='mb-0 w-100 d-flex justify-content-center align-items-center text-blue fw-bold'>{comment.score}</p>
                            <Button className='bg-transparent border-0' size='sm' ><i className='bi-dash text-muted'></i></Button>
                        </ButtonGroup>
                    </div>
                    <div className="col-11">
                        <div className='d-flex align-items-center'>
                            {/* user avatar */}
                            <Avatar user={comment.user} isAuthor={isAuthor} />
                            <p className='text-muted mb-0 ms-3 fw-500'>{comment.createdAt}</p>
                            {/* reply | delete edit */}
                            <div className='ms-auto me-3'>
                                {/* add delete and edit if comment is made by user */}
                                <CommentButtons isAuthor={isAuthor} commentId={comment.id}/>
                            </div>
                        </div>
                        <p className='text-muted mt-1 mb-0'>{comment.replyingTo && <Tag tag={comment.replyingTo} /> } {comment.content}</p>
                    </div>
                </div>
            </div>
            {replies}
        </>
    )
}