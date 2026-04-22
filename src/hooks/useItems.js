import { useEffect, useMemo, useState } from 'react'
const STORAGE_KEY = 'a4_items'

// Sample data to populate on first load or if localStorage is cleared
const DEFAULT_ITEMS = [
  { id: "0001", name: "Bulbasaur", category: "Grass", category2: "Poison", height: 0.7, weight: 6.9 },
  { id: "0002", name: "Ivysaur", category: "Grass", category2: "Poison", height: 1.0, weight: 13.0 },
  { id: "0003", name: "Venusaur", category: "Grass", category2: "Poison", height: 2.0, weight: 100.0 },
  { id: "0004", name: "Charmander", category: "Fire", category2: "", height: 0.6, weight: 8.5 },
  { id: "0005", name: "Charmeleon", category: "Fire", category2: "", height: 1.1, weight: 19.0 },
  { id: "0006", name: "Charizard", category: "Fire", category2: "Flying", height: 1.7, weight: 90.5 },
  { id: "0007", name: "Squirtle", category: "Water", category2: "", height: 0.5, weight: 9.0 },
  { id: "0008", name: "Wartortle", category: "Water", category2: "", height: 1.0, weight: 22.5 },
  { id: "0009", name: "Blastoise", category: "Water", category2: "", height: 1.6, weight: 85.5 },
  { id: "0010", name: "Caterpie", category: "Bug", category2: "", height: 0.3, weight: 2.9 },
  { id: "0012", name: "Butterfree", category: "Bug", category2: "Flying", height: 1.1, weight: 32.0 },
  { id: "0016", name: "Pidgey", category: "Normal", category2: "Flying", height: 0.3, weight: 1.8 },
  { id: "0018", name: "Pidgeot", category: "Normal", category2: "Flying", height: 1.5, weight: 39.5 },
  { id: "0019", name: "Rattata", category: "Normal", category2: "", height: 0.3, weight: 3.5 },
  { id: "0020", name: "Raticate", category: "Normal", category2: "", height: 0.7, weight: 18.5 },
  { id: "0025", name: "Pikachu", category: "Electric", category2: "", height: 0.4, weight: 6.0 },
  { id: "0026", name: "Raichu", category: "Electric", category2: "", height: 0.8, weight: 30.0 },
  { id: "0039", name: "Jigglypuff", category: "Normal", category2: "Fairy", height: 0.5, weight: 5.5 },
  { id: "0052", name: "Meowth", category: "Normal", category2: "", height: 0.4, weight: 4.2 },
  { id: "0133", name: "Eevee", category: "Normal", category2: "", height: 0.3, weight: 6.5 }
]

export default function useItems(){
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortKey, setSortKey] = useState('id')
  const [sortDir, setSortDir] = useState('asc')
  const [minValue, setMinValue] = useState('')
  const [maxValue, setMaxValue] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (err) {
        console.error('Failed to parse items from localStorage, using defaults', err)
      }
    } else {
      setItems(DEFAULT_ITEMS)
    }

  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (err) {
      console.error('Failed to save items to localStorage', err)
    }
  }, [items])

  function addItem(data){
    // Ensures id is a 4-digit string, e.g. "0001", "0023", "1234" (pokemon style)
    const cleanId = String(Number(data.id)).padStart(4, '0')

    setItems(prev => {
      if (prev.some(item => item.id === cleanId)) {
        return prev
      }

      const newItem = { ...data, id: cleanId }
      return [...prev, newItem]
    })
  }

  function updateItem(id, patch){
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...patch } : item))
  }
  
  function deleteItem(id){
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const categories = useMemo(() => {
    // Get unique categories from both category and category2 fields
    const allCategories = items.flatMap(item => [item.category, item.category2])
    return [...new Set(allCategories.filter(type => type !== ''))].sort()
  }, [items])

  const derived = useMemo(() => {
    
    const filtered = items.filter(item => {
      if (search && !item.name.toLowerCase().includes(search.toLowerCase()) && !item.id.includes(search)) return false
      if (category && item.category !== category && item.category2 !== category) return false
      if (minValue && item.height < Number(minValue)) return false
      if (maxValue && item.height > Number(maxValue)) return false
      return true
    })

    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortKey]
      const bValue = b[sortKey]
      if (aValue < bValue) return sortDir === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return sorted
  }, [items, search, category, minValue, maxValue, sortKey, sortDir])

  return {
    items, setItems,
    search, setSearch,
    category, setCategory,
    sortKey, setSortKey,
    sortDir, setSortDir,
    minValue, setMinValue,
    maxValue, setMaxValue,
    categories,
    derived,
    addItem, updateItem, deleteItem
  }
}
