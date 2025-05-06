import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Train() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center' }}>
    <button className='glow-on-hover' onClick={() => navigate(`/search`)}>Search The Trains</button>
  </div>
  )
}
