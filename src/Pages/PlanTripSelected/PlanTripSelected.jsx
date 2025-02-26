import { useLocation, useParams } from 'react-router-dom';
import "./WhereToSelected.css";
import useFetch from '../../components/hooks/useFetch';
import AllCity from "../../components/CityList/AllCity"
import { useNavigate } from 'react-router-dom';
import { TripPlannerContext } from '../../context';
import { useContext, useEffect } from 'react';
import AllCitySkeleton from './AllCitySkeleton';
export default function PlanTripSelected() {
    // const { someProp } = location.state || {};  // Access the passed state
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    const {TripCategory} = useContext(TripPlannerContext);
    const { data: cities, loading, error } = useFetch(`http://localhost:7000/api/trendingplace`);
    return (
        <div className='where-to-container'>
            <div className="place-card-content">
                <div className="where-to-header">
                    <img src={TripCategory?.image} alt="" />
                    <h1 className="where-to-title">{TripCategory?.name}</h1>
                    <p className="where-to-description">{TripCategory?.description}</p>
                </div>
            </div>
            <div className="where-to-content">
                {loading || error ? (
                    <AllCitySkeleton />
                ) : (
                    <AllCity cities={cities || []} navigate={null} />
                )}
            </div>
        </div>
    );
};
