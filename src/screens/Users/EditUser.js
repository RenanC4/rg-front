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

  const handleInputChange = e => {
    const {name, value} = e.target
    console.log('a', e.target)
    setUser({...user, [name]: value})
  }
  
  async function updateUser() {
     const funfou = await UserService.updateUser(user)
     console.log(funfou)
  }

  return (
    <>
      <form>
        <label>
          Nome:
          <input 
            onChange={handleInputChange}
            name='name'
            value={user.name}
          />
        </label>
        <label>
          Email:
          <input 
            onChange={handleInputChange}
            name='email' 
            value={user.email} 
          />
        </label>
        <label>
          Endereço:
          <input 
            onChange={handleInputChange}
            name='address'
            value={user.address} 
          />
        </label>
        <label>
          Cidade:
          <input 
            onChange={handleInputChange}
            name='city'
            value={user.city} 
          />
        </label>
        <label>
          Estado:
          <input  
            onChange={handleInputChange}
            name='state'value={user.state} 
          />
        </label>
        <label>
          Criado em:
          <input readOnly value={formatDate(user.createdAt)}/>
        </label>
      </form>
      <button onClick={updateUser}>Butao</button>
    </>
  )
}