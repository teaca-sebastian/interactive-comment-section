// bootstrap imported stuff
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
// components
import { Tag } from './Tag'
import { Avatar } from './Avatar'
import { CommentButtons } from './CommentButtons'
// hooks
import { useContext, useEffect, useState } from 'react'
import { useClassConditional } from '../hooks/useClassConditional'
// context
import { UserContext } from '../context/UserContext'


export const Comment = ({ isReply = false, isAuthor = false, comment, setComments, comments }) => {
    const classNames = useClassConditional()
    const { user } = useContext(UserContext)
    const [ isLiked, setIsLiked ] = useState(null)

    // TO DO: for new comments, create "x time ago" format

    const handleLike = (queryId, arr, action) => {
        const tgtObj = arr.find(
            ({ id }) => id === queryId
        );
        if (tgtObj) {
            // REMINDER:
            // this method is VERY redundant, and not practical,
            // it is just for the sake of the design,
            // please don't use this way of limiting likes on a real database
            // i'm only doing it this way beacause the original data doesn't have
            // any keys to indicate if it was liked or not, there are probably better
            // ways, but this works for now.
            if (action === 'like') {
                if (isLiked === null || !isLiked) {
                    tgtObj.score = tgtObj.score + 1;
                    setIsLiked(isLiked === null ? true : null)
                }
            } else if (action === 'dislike') {
                if (isLiked === null || isLiked) {
                    tgtObj.score = tgtObj.score - 1;
                    setIsLiked(isLiked === null ? false : null)
                }
            }
        } else {
            arr.filter(el => 'replies' in el).forEach(
                ({ replies }) => handleLike(queryId, replies, action)
            );
        };
        return arr
    };

    // I've made the replies work with a recursion,
    // to avoid creating the same component again
    const replies = (comment.replies || []).map(reply => {
        return <Comment isReply={true} isAuthor={user.username === reply.user.username} comments={comments} setComments={setComments} comment={reply} key={reply.id} />
    })

    return (
        <>
            <div className={classNames('ms-auto rounded bg-white p-2 py-4', isReply ? 'col-11' : 'col-12')}>
                <div className="row g-0">
                    <div className="col-1 d-flex justify-content-center align-items-start">
                        <ButtonGroup vertical className='bg-light-gray rounded'>
                            <Button
                                className='bg-transparent border-0'
                                size='sm'
                                disabled={isLiked === null ? false : isLiked}
                                onClick={() => {
                                    setComments([...handleLike(comment.id, comments, 'like')])
                                }}>
                                <i className='bi-plus text-muted'></i>
                            </Button>
                            <p className='mb-0 w-100 d-flex justify-content-center align-items-center text-blue fw-bold user-select-none'>{comment.score}</p>
                            <Button
                                className='bg-transparent border-0'
                                size='sm'
                                disabled={isLiked === null ? false : !isLiked}
                                onClick={() => {
                                    setComments([...handleLike(comment.id, comments, 'dislike')])
                                }}>
                                <i className='bi-dash text-muted'></i>
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className="col-11">
                        <div className='d-flex align-items-center'>
                            <Avatar user={comment.user} isAuthor={isAuthor} />
                            <p className='text-muted mb-0 ms-3 fw-500'>{comment.createdAt}</p>
                            <div className='ms-auto me-3'>
                                <CommentButtons isAuthor={isAuthor} commentId={comment.id} setComments={setComments} />
                            </div>
                        </div>
                        <p className='text-muted mt-1 mb-0'>{comment.replyingTo && <Tag tag={comment.replyingTo} />} {comment.content}</p>
                    </div>
                </div>
            </div>
            {
            // these are the recursively added replies
            replies}

        </>
    )
}