import React, {useState, useEffect} from 'react'
import UserService from '../../services/userService'
import {formatDate} from '../../Utils/Utils'

export default function EditUser({match}) {
  const [user, setUser] = useState({})

  useEffect(() => {
    async function userDetails(id) {
      const response = await UserService.getUser(id)
      setUser(response)
    }
    userDetails(match.params.id)
  }, [match.params.id])

  
  
  return (
    <>
      <form onSubmit={this.handleSubmit}>
        <label>
          Nome:
          <input type='text' value={user.name} />
        </label>
        <label>
          Email:
          <input type='text' value={user.email} />
        </label>
        <label>
          Endereço:
          <input type='text' value={user.address} />
        </label>
        <label>
          Cidade:
          <input type='text' value={user.city} />
        </label>
        <label>
          Estado:
          <input type='text' value={user.state} />
        </label>
        <label>
          Criado em:  <span>{formatDate(user.createdAt)}</span>
        </label>
        <input type="submit" value="Salvar" />
      </form>
       
        {console.log(user)}
    </>
  )
}