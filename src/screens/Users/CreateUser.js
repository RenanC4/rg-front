import React, {useState} from 'react'
import UserService from '../../services/userService'

export default function CreateUser() {
  const [user, setUser] = useState({})


  const handleInputChange = e => {
    const {name, value} = e.target
    console.log('a', e.target)
    setUser({...user, [name]: value})
  }
  
  async function createUser() {
     const funfou = await UserService.createUser(user)
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
      </form>
      <button onClick={createUser}>Butao</button>
    </>
  )
}