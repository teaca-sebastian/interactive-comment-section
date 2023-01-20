// bootstrap imported stuff
import '../src/assets/css/main.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import ToastContainer from 'react-bootstrap/ToastContainer'
// components
import { Comment } from './components/Comment'
import { AddCommentContainer } from './components/AddComment'
import { Notification } from './components/Notification'
// data
import data from '../src/data/data.json'
// hooks
import { useEffect, useContext, useState } from 'react'
// context
import { UserContext } from './context/UserContext'
import { ToastContext } from './context/ToastContext'


function App() {
  const [user, setUser] = useState(data.currentUser)
  const [comments, setComments] = useState(JSON.parse(JSON.stringify(data)).comments)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null)

  useEffect(() => {
    setInterval(() => {
      setToastMessage(null)
    }, 3000);
  }, [toastMessage])

  return (
    <ToastContext.Provider value={{ setShowToast, setToastMessage }}>
      <UserContext.Provider value={{ user }}>
        <div className="App container row mx-auto my-5 gap-3">
          <ToastContainer position='bottom-end'>
            <Notification showToast={showToast} setShowToast={setShowToast} message={toastMessage} setToastMessage={setToastMessage} />
          </ToastContainer>
          {comments.map(comment => <Comment comment={comment} isAuthor={user.username === comment.user.username} comments={comments} setComments={setComments} key={comment.id} />)}
          <AddCommentContainer />
        </div>
      </UserContext.Provider>
    </ToastContext.Provider>
  )
}

export default App
