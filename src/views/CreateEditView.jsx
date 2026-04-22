import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ItemForm from '../components/ItemForm'
import { ItemsContext } from '../context/ItemsContext'

export default function CreateEditView(){
  const { id } = useParams()
  const navigate = useNavigate()
  const ctx = useContext(ItemsContext)
  
  const existingItem = ctx.items.find(i => i.id === id)

  if (id && !existingItem) {
    return <div>Pokémon not found</div>
  }

  const initial = id ? existingItem : {
    id: '',
    name: '',
    category: '',
    category2: '',
    height: '',
    weight: ''
  }

  return (
    <div>
      <h2 className="h5 mb-3">{id ? 'Edit Item' : 'Add Item'}</h2>
      <ItemForm initial={initial} onSave={(data) => {
        if (id) {
          ctx.updateItem(id, data)
        } else {
          ctx.addItem(data)
        }
        
        navigate('/list')
      }} onCancel={()=>navigate(-1)} />
    </div>
  )
}
