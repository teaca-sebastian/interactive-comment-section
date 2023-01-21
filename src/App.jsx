// bootstrap imported stuff
import '../src/assets/css/main.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
// components
import { Comment } from './components/Comment'
import { AddCommentContainer } from './components/AddCommentContainer'
// data
import data from '../src/data/data.json'
// hooks
import { useState } from 'react'
// context
import { UserContext } from './context/UserContext'


function App() {
  const [user, setUser] = useState(data.currentUser)
  const [comments, setComments] = useState(JSON.parse(JSON.stringify(data)).comments)
  const [replying, setReplying] = useState("0")

  const handleReplying = (index) => {
    if (replying === index) {
      return setReplying("0");
    }
    setReplying(index);
  }

  return (
    <UserContext.Provider value={{ user }}>
      <div className="App container row mx-auto my-5 gap-3">
        {comments.map(comment => {
          return <>
            <Comment handleReplying={() => handleReplying(comment.id)} replying={replying === comment.id} comment={comment} isAuthor={user.username === comment.user.username} comments={comments} setComments={setComments} key={comment.id} />
            {(comment.replies || []).map(reply => <Comment isReply={true} handleReplying={() => handleReplying(reply.id)} replying={replying === reply.id} comment={reply} isAuthor={user.username === reply.user.username} comments={comments} setComments={setComments} key={reply.id} />)}
          </>
        })}
        <AddCommentContainer comments={comments} setComments={setComments} />
      </div>
    </UserContext.Provider>
  )
}

export default App
