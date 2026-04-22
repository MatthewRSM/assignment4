import React, { useState } from 'react'
import { useItemsContext } from '../context/ItemsContext'

const TYPES = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison',
'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy']

export default function ItemForm({ initial, onSave, onCancel }){
  
  const [form, setForm] = useState(initial)
  const [error, setError] = useState('')

  const ctx = useItemsContext()

  function onSubmit(e){
    e.preventDefault();

    const paddedId = String(Number(form.id)).padStart(4, '0')
    const trimmedName = form.name.trim()
    const trimmedId = form.id.trim()

    if (!trimmedId || trimmedId.length > 4 || isNaN(Number(trimmedId)) || trimmedId.includes('.')) {
      setError('ID must be a 4-digit whole number.')
      return
    }

    if (!trimmedName) {
      setError('Name is required.')
      return
    }

    if (!form.category) {
      setError('Primary Type is required.')
      return
    }

    if (ctx.items.some(item => item.id === paddedId && item.id !== initial.id)) {
      setError('A Pokémon with that ID already exists.')
      return
    }

    if (Number(form.height) <= 0) {
      setError('Height must be a positive number.')
      return
    }
    
    if (Number(form.weight) <= 0) {
      setError('Weight must be a positive number.')
      return
    }
    
    if (form.category === form.category2) {
      setError('Primary and Secondary Type cannot be the same.')
      return
    }

    setError('')
    onSave({...form, id: paddedId, name: trimmedName})
    
  }

  return (
    <form className="row g-3" onSubmit={onSubmit} noValidate>
      <div className="col-md-6">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">ID</label>
        <input
          type="text"
          className="form-control"
          value={form.id}
          onChange={e => setForm({...form, id: e.target.value})}
          required
        />
      </div>
      
      <div className="col-md-3">
        <label className="form-label">Primary Type</label>
        <select
          className="form-select"
          value={form.category}
          onChange={(e) => setForm({...form, category: e.target.value})}
          required
        >
          <option value="">Select Type</option>
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <label className="form-label">Secondary Type</label>
        <select
          className="form-select"
          value={form.category2}
          onChange={(e) => setForm({...form, category2: e.target.value})}
        >
          <option value="">None</option>
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
      <div className="col-md-3">
        <label className="form-label">Height (m)</label>
        <input
          type="number"
          step="0.1"
          className="form-control"
          value={form.height}
          onChange={(e) => setForm({...form, height: e.target.value})}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Weight (kg)</label>
        <input
          type="number"
          step="0.1"
          className="form-control"
          value={form.weight}
          onChange={(e) => setForm({...form, weight: e.target.value})}
          required
        />
      </div>

      {error && (
        <div className="col-12">
          <div className="alert alert-danger mb-0">
            {error}
          </div>
        </div>
      )}

      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary" type="submit">Save</button>
        <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
