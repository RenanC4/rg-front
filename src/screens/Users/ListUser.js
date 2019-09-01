import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import UserService from '../../services/userService'
import {formatDate} from '../../Utils/Utils'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {ToastContainer, toast} from 'react-toastify'
import {STATUS_SUCCESS} from '../../constants'
import './ListUser.css'


export default function ListUser() {
  const [users, setUsers] = useState([])
  const [statusSearch, setStatusSerch] = useState(false)
  useEffect(() => {
    getUsers()
  },[])

  const getUsers = async function() {
    const usuarios = await UserService.getUsers()
    setUsers(usuarios)
  }

  const handleInputChange = e => {
    if (e.target.value.length === 0) getUsers()
    setStatusSerch(true)  
    const usersListFilter = users.filter(user => {
      return (user.name.toLowerCase().search(
        e.target.value.toLowerCase()) !== -1 ) || (
          user.email.toLowerCase().search(
            e.target.value.toLowerCase()) !== -1
        ) 
    })
    setUsers(usersListFilter)
    console.log('a', usersListFilter)
  }

  async function deleteUser(id) {
    const {status, message} = await UserService.deleteUser(id)
    if (status === STATUS_SUCCESS) {
      notifySuccess(message)
      const usersListAtt = users.filter(user => {
        return user._id !== id
      })
      setUsers(usersListAtt)
      return
    }  
    notifyError(message)
  }
  
  const notifyError = message => toast.error(message)
  const notifySuccess = message => toast.success(message)

  function userList(users) {
    return (
      users.map(user => (
        <li key={user._id}>
          <span>{user.name}</span>
          <span>{user.email}</span>
          <span>{formatDate(user.createdAt)}</span>
          <div className='action-icons'>
            <Link to={`/editar/${user._id}`}>
              <FontAwesomeIcon
                icon='pencil-alt'
                color='#333'
                size='lg'
              />
            </Link>    
            <FontAwesomeIcon onClick={() => deleteUser(user._id)}
              icon='trash'
              color='#333'
              size='lg'
            />  
          </div>
        </li>						
      ))
    )
  }

  return (  
    <div className='dashboard-container'>
      <ToastContainer />
      {users.length > 0 || statusSearch === true ? (
        <>
          <input onChange={handleInputChange} placeholder='Filtrar por nome ou e-mail' />
          <div className='dashboard-users-container'>
            <ul>
              <div className='list-header'>
                <span>Nome</span>
                <span>E-mail</span>
                <span>Data de Criação</span>
                <div className='action-labels'>
                  <span>Editar</span>
                  <span>Excluir</span>
                </div>
              </div>
                {userList(users)}
            </ul>
        </div>
        { users.length === 0 && statusSearch === true &&            
          <div className='empty'> 
            OPS... nenhum usuario encontrado! <br />
          </div> 
        }
      </>
      ):(
        <>
          <FontAwesomeIcon
                  icon='grin-beam-sweat'
                  color='#999'
                  size='10x'
            />
          <div className='empty'> 
            OPS... ainda não temos usuarios para mostrar! <br />
            Clique abaixo para adicionar.
          </div>
        </>
      )}
      
      <div className='new-user--button'>
        <Link to={'/novo'} style={{ textDecoration: 'none' }}>
          <span>+</span>
        </Link>
      </div>
    </div>
  )
}