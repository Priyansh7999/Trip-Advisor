import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Flight() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center' }}>
      <button className='glow-on-hover' onClick={() => navigate(`/search`)}>Search The Flights</button>
    </div>
  )
}
