import React from 'react'
import { Link } from 'react-router-dom'
import { useItemsContext } from '../context/ItemsContext'

export default function ItemCard({ item }){
  
  const { deleteItem } = useItemsContext()

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">#{item.id} {item.name}</h5>
        <p className="card-text mb-1">
          <strong>Type:</strong> {item.category}
          {item.category2 ? ` / ${item.category2}` : ''}
        </p>
        <p className="card-text mb-1">
          <strong>Height:</strong> {item.height} m
        </p>
        <p className="card-text mb-1">
          <strong>Weight:</strong> {item.weight} kg
        </p>
      </div>
      <div className="card-footer d-flex justify-content-end gap-2">
        <Link to={`/item/${item.id}`} className="btn btn-sm btn-outline-primary">View</Link>
        <Link to={`/edit/${item.id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>
        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(item.id)}>Delete</button>
      </div>
    </div>
  )
}
