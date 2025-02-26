import React, { useEffect } from 'react'
import { useContext } from 'react'
import { TripPlannerContext } from '../../context'
import { useParams } from 'react-router-dom'
import AllCity from '../../components/CityList/AllCity'
import useFetch from '../../components/hooks/useFetch'
export default function MonthBased() {
    const {Month}=useContext(TripPlannerContext);
    const params = useParams();
    // console.log(params?.month)
    console.log(Month)
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    const { data , loading, error } = useFetch('http://localhost:7000/api/trendingcity');
  return (
    <div className='where-to-container'>
        <div className="place-card-content">
            <div className="where-to-header">
                <img src={Month?.img} alt="" />
                <h1 className="where-to-title" style={{fontSize:"4rem"}}>{Month?.month}</h1>
            </div>
        </div>
        <div className="where-to-content">
            <AllCity cities={data || [] } navigate={null}/>
        </div>
    </div>
  )
}
