import React, {useState, useEffect} from 'react'
import {Form, Input, Select} from '@rocketseat/unform'
import * as Yup from 'yup'
import {Redirect} from 'react-router-dom'
import UserService from '../../services/userService'
import {ToastContainer, toast} from 'react-toastify'
import {formatDate} from '../../Utils/Utils'
import {STATES, STATUS_SUCCESS} from '../../constants'
import './UserForm.css'

export default function EditUser({match}) {
  const [user, setUser] = useState({})
  const [redirectToList, setRedirectToList] = useState(false)

  useEffect(() => {
    async function userDetails(id) {
      const response = await UserService.getUser(id)
      setUser(response)
    }
    userDetails(match.params.id)
  }, [match.params.id])

  const handleChange = e => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }
  
  async function updateUser() {
    const {status, message} = await UserService.updateUser(user)
    if (status === STATUS_SUCCESS) {
      notifySuccess(message)
      setTimeout(
        function(){
          setRedirectToList(true)
        }, 2000
      )  
      return
    }
    notifyError(message)
  }

  const schema = Yup.object().shape({
    name: Yup.string()
      .required(<span className='form-error'>*Campo Nome obrigatório</span>),
    email: Yup.string()
      .email(<span className='form-error'>*Email invalido</span>)
      .required(<span className='form-error'>*Campo E-mail obrigatório</span>),
    address: Yup.string()
      .required(<span className='form-error'>*Campo Endereço obrigatório</span>),
      state: Yup.string()
        .required(<span className='form-error'>*Campo Estado obrigatório</span>),
    city: Yup.string()
    .required(<span className='form-error'>*Campo Cidade obrigatório</span>)      
  })

  const notifyError = message => toast.error(message)
  const notifySuccess = message => toast.success(message, {autoClose: 2000})

  return (
    <div className='main-container'>
      <ToastContainer />
      {redirectToList && <Redirect to='/' />}
      <h1>Editar Usuário</h1>
      <Form schema={schema} onSubmit={updateUser}>
        <Input  
            name='name' 
            onChange={handleChange}
            value={user.name}
            placeholder='Nome'
        />
        <Input  
            name='email'
            onChange={handleChange}
            value={user.email}
            placeholder='E-mail'
        />
        <Input  
            name='address' 
            onChange={handleChange}
            value={user.address}
            placeholder='Endereço'
        />
        <Input  
            name='city' 
            onChange={handleChange}
            value={user.city}
            placeholder='Cidade'
        />
        <Select 
            name='state'
            onChange={handleChange}
            options={STATES} 
            placeholder='Estado'/>
        <Input  
            name='createdAt'
            readOnly 
            value={'Criado em ' +formatDate(user.createdAt)}
        />
        <div className='user-button'>
         <button className='color-btn green' type='submit'>Salvar</button>
         <button className='color-btn red' onClick={() => setRedirectToList(true)}>Cancelar</button>
        </div>
      </Form>
    </div>
  )
}