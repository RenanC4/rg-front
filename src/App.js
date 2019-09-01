import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ListUser from './screens/Users/ListUser'
import CreateUser from './screens/Users/CreateUser'
import EditUser from './screens/Users/EditUser'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPencilAlt, faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

library.add(faTrash, faPencilAlt, faGrinBeamSweat)


function App() {
  return (
    <Router>
        <Route path='/' exact component={ListUser}/>
        <Route path='/Novo' exact component={CreateUser}/>
        <Route path='/Editar/:id' exact component={EditUser}/>
    </Router>
  )
}

export default App
