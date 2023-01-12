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
import { CommentContext } from '../context/CommentsContext'


export const Comment = ({ isReply = false, isAuthor = false, comment }) => {
    const classNames = useClassConditional()
    const { user } = useContext(UserContext)
    const { comments, setComments } = useContext(CommentContext)
    // TO DO LIKES:
    // TO DO: for new comments, create "x time ago" format

    // only works its comments that aren't replies
    // const addLike = (id) => {
    //     const newComment = { ...comment, score: comment.score + 1 }
    //     const newList = comments.map(item => {
    //         if (item.id === id) {
    //             return newComment
    //         }
    //         return item
    //     })
    //     setComments(newList)
    // }

    const addLikeArray = (queryId, arr) => {
        // find 'arr' element with matching identifier
        const tgtObj = arr.find(
            ({ id }) => id === queryId
        );
        if (tgtObj) {            // found identifier, so update the name
            tgtObj.score = tgtObj.score + 1;      // this will mutate the original array passed as argument
        } else {                  // not found, recurse through 'children' array
            arr.filter(el => 'replies' in el).forEach(
                ({ replies }) => addLikeArray(queryId, replies)
            );
        };
        console.log(arr)
        setComments(arr)               // in all cases, return 'arr' as-is
    };

    // to call this using "setCategories", simply try this:
    /*
    setComments(prev => findAndUpdate("5", "New Fifth Tier", prev));
    */

    // to make it work with replies:
    // 0) create a new copy comments array
    // 1) find comment that contains that reply (in the copied array)
    // 2) update that found comment's reply array to contain the new array with imcremented score (in the copied array)
    // 3) update the state with the edited copy


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
                            <Button
                                className='bg-transparent border-0'
                                size='sm'
                                onClick={() => {
                                    addLikeArray(comment.id, comments)
                                }} >
                                <i className='bi-plus text-muted'></i>
                            </Button>
                            <p className='mb-0 w-100 d-flex justify-content-center align-items-center text-blue fw-bold'>{comment.score}</p>
                            <Button
                                className='bg-transparent border-0'
                                size='sm'
                            >
                                <i className='bi-dash text-muted'></i>
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className="col-11">
                        <div className='d-flex align-items-center'>
                            <Avatar user={comment.user} isAuthor={isAuthor} />
                            <p className='text-muted mb-0 ms-3 fw-500'>{comment.createdAt}</p>
                            <div className='ms-auto me-3'>
                                <CommentButtons isAuthor={isAuthor} commentId={comment.id} />
                            </div>
                        </div>
                        <p className='text-muted mt-1 mb-0'>{comment.replyingTo && <Tag tag={comment.replyingTo} />} {comment.content}</p>
                    </div>
                </div>
            </div>
            {replies}
        </>
    )
}