import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import UserService from '../../services/userService'
export default function ListUser() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUsers() {
      const usuarios = await UserService.getUsers()
      setUsers(usuarios)
    }
    getUsers()
  },[])

  async function deleteUser(id) {
    const {status, message} = await UserService.deleteUser(id)
    if (status === 200) {
      const UsersListAtt = users.filter(user => {
        return user._id !== id;
      });
      setUsers(UsersListAtt);
      alert(message)
    }  
	};

  return (
    <>
    <div>
    <ul>
      {users.map(user => (
        <li key={user._id}>
          <span>{user.address}</span>
          <span>{user.city}</span>
          <span>{user.createdAt}</span>
          <span>{user.email}</span>
          <span>{user.state}</span>
          <button onClick={() => deleteUser(user._id)}>Remover amigo</button>
          <Link to={`/editar/${user._id}`}>
          <button>edit amigo</button>
          </Link>
        </li>						
      ))}
      </ul>
    </div>    
    <Link to={'/novo'}>
      <button>Novo usuario</button>
    </Link>
      
    <Link to={'/editar/' + 32}>
      <button>tio cuca Editar</button>
    </Link>
    </>
  )
}