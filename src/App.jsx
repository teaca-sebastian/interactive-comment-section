// bootstrap imported stuff
import '../src/assets/css/main.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
// components
import { Comment } from './components/Comment'
// data
import data from '../src/data/data.json'
// hooks
import { useEffect, useContext, useState } from 'react'
// context
import { UserContext } from './context/UserContext'


function App() {
  const [ user, setUser ] = useState(data.currentUser)
  const comments = JSON.parse(JSON.stringify(data)).comments

  return (
    <UserContext.Provider value={user}>
      <div className="App container row mx-auto my-5 gap-3">
        {comments.map(comment => <Comment comment={comment} key={comment.id} />)}
      </div>
    </UserContext.Provider>
  )
}

export default App
