import React, { Children, createContext, useState } from 'react'
export const TripPlannerContext = createContext(null);

export default function TripPlanner({children}) {
    const [Month ,setMonth]=useState({
      month:null,
      image:null,
    })
    const [TripCategory,setTripCategory]=useState({
      name:null,
      image:null,
      description:null,
    })
  return (
    <div>
      <TripPlannerContext.Provider value={{Month ,setMonth,TripCategory,setTripCategory}}>
        {children}
      </TripPlannerContext.Provider>
    </div>
  )
}
