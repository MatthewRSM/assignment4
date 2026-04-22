import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ItemsContext } from '../context/ItemsContext'

export default function DetailView(){
  const { id } = useParams()
  const ctx = useContext(ItemsContext)
  
  const item = ctx.items.find((item) => item.id === id)

  if (!item) {
    return (
      <div>
        <div className="mb-3"><Link className="btn btn-sm btn-outline-secondary" to="/list">← Back to list</Link></div>
        <div className="alert alert-secondary">Could not find Pokémon with ID: {id}</div>
      </div>
    )
  }
  
  return (
    <div>
      <div className="mb-3">
        <Link className="btn btn-sm btn-outline-secondary" to="/list">← Back to list</Link>
      </div>

      <div className="card">
        <div className="card-body">
          <h2>#{item.id} {item.name}</h2>
          <p> 
            <strong>Type:</strong> {item.category}
            {item.category2 ? ` / ${item.category2}` : ''}
          </p>
          <p><strong>Height:</strong> {item.height} m</p>
          <p><strong>Weight:</strong> {item.weight} kg</p>
          <Link to={`/edit/${item.id}`} className="btn btn-primary">Edit</Link>
        </div>
      </div>
    </div>
  )
}
