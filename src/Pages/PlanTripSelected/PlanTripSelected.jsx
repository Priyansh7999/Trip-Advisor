import { useLocation, useParams } from 'react-router-dom';
import styles from "./WhereToSelected.module.css";
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
        <div className="where-to-container" id='where-to-container'>
            <div className="place-card-content" id="place-card-content">
                <div className="where-to-header" id="where-to-header">
                    <img src={TripCategory?.image} alt="" />
                    <h1 className="where-to-title" id="where-to-title">{TripCategory?.name}</h1>
                    <p className="where-to-description" id="where-to-description">{TripCategory?.description}</p>
                </div>
            </div>
            <div className={styles["where-to-content"]} id="where-to-content">
                {loading || error ? (
                    <AllCitySkeleton />
                ) : (
                    <AllCity cities={cities || []} navigate={null} />
                )}
            </div>
        </div>
    );
};
