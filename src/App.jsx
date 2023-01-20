// bootstrap imported stuff
import '../src/assets/css/main.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
// components
import { Comment } from './components/Comment'
import { AddCommentContainer } from './components/AddComment'
// data
import data from '../src/data/data.json'
// hooks
import { useState } from 'react'
// context
import { UserContext } from './context/UserContext'


function App() {
  const [user, setUser] = useState(data.currentUser)
  const [comments, setComments] = useState(JSON.parse(JSON.stringify(data)).comments)

  return (
      <UserContext.Provider value={{ user }}>
        <div className="App container row mx-auto my-5 gap-3">
          {comments.map(comment => <Comment comment={comment} isAuthor={user.username === comment.user.username} comments={comments} setComments={setComments} key={comment.id} />)}
          <AddCommentContainer comments={comments} setComments={setComments} />
        </div>
      </UserContext.Provider>
  )
}

export default App
