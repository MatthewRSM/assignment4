import React, { useContext } from 'react'
import ItemCard from '../components/ItemCard'
import { ItemsContext } from '../context/ItemsContext'

export default function ListView(){
  const ctx = useContext(ItemsContext)

  return (
    <div>
      <div className="row g-2 align-items-end mb-3">
        <div className="col-md-4">
          <label className="form-label">Search</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or ID"
            value={ctx.search}
            onChange={(e) => ctx.setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            value={ctx.category}
            onChange={(e) => ctx.setCategory(e.target.value)}
          >
            <option value="">All Types</option>
            {ctx.categories.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="col-md-4">
          <label className="form-label">Height</label>
          <div className="input-group">
            <input
              type="number"
              min="0"
              step="0.1"
              className="form-control"
              placeholder="Min (in metres)"
              value={ctx.minValue}
              onChange={(e) => ctx.setMinValue(e.target.value)}
            />
            <input
              type="number"
              min="0"
              step="0.1"
              className="form-control"
              placeholder="Max (in metres)"
              value={ctx.maxValue}
              onChange={(e) => ctx.setMaxValue(e.target.value)}
            />
          </div>
        </div>
        
        <div className="col-md-4">
          <label className="form-label">Sort</label>
          <div className="input-group">
            <select
              className="form-select"
              value={ctx.sortKey}
              onChange={(e) => ctx.setSortKey(e.target.value)}
            >
              <option value="">None</option>
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="category">Primary Type</option>
              <option value="category2">Secondary Type</option>
              <option value="height">Height</option>
              <option value="weight">Weight</option>
            </select>

            <select
              className="form-select"
              value={ctx.sortDir}
              onChange={(e) => ctx.setSortDir(e.target.value)}
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
        </div>
      </div>

      {ctx.derived.length === 0 && (
        <div className="alert alert-info" role="alert">Could not find any Pokémon to display.</div>
      )}

      <div className="row g-3">
        {ctx.derived.map((item) => (
          <div key={item.id} className="col-md-4">
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
