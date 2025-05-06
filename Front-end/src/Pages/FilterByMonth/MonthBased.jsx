import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AllCity from '../../components/CityList/AllCity';
import axios from 'axios';

export default function MonthBased() {
    const params = useParams();
    const currentMonth = params?.month;

    const month = [
        { month: "January", img: "https://media.istockphoto.com/id/460682111/photo/panorama-of-the-winter-sunrise-in-mountains.jpg?s=612x612&w=0&k=20&c=DYe99hLsrxeGCIFy-sYTCnQCBllnoPVn3digKa7-J9I=" },
        { month: "February", img: "https://media.istockphoto.com/id/496577538/photo/trees-covered-with-hoarfrost-in-a-fog.jpg?s=612x612&w=0&k=20&c=zZsyKelWpEJHTLRdRgLufV4Jrd8b8tyj5JWOKOcgwG4=" },
        { month: "March", img: "https://plus.unsplash.com/premium_photo-1674917000586-b7564f21540e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFyY2glMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww" },
        { month: "April", img: "https://images.unsplash.com/photo-1614667864607-aeebdc464e98?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcmNoJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D" },
        { month: "May", img: "https://images.unsplash.com/photo-1615277715412-2244e4a8ea62?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hcmNoJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D" },
        { month: "June", img: "https://plus.unsplash.com/premium_photo-1712685912275-943ff90aac7c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VtbWVyYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D" },
        { month: "July", img: "https://media.istockphoto.com/id/1362644903/photo/kailash-himalaya-mountain-slopes-at-narkanda-himachal-pradesh-india.jpg?s=612x612&w=0&k=20&c=P5OiP9QnX29KjoXZ0YLRmU9pmAHuV1KIoRy4mdD44DY=" },
        { month: "August", img: "https://media.istockphoto.com/id/1165083109/photo/coconut-palm-trees-on-sandy-beach.webp?a=1&b=1&s=612x612&w=0&k=20&c=6Hn55IhnV2eIe818c4cbUXGrFvVbwT1v78PgmZeH6us=" },
        { month: "September", img: "https://media.istockphoto.com/id/1170896292/photo/heart-of-autumn-yellow-orange-trees-in-forest-with-heart-shape-sunny-weather-good-day.jpg?s=612x612&w=0&k=20&c=xiRn7BhRHuePPMbszEks-z7fGVEEzXxPe1nN0658IeU=" },
        { month: "October", img: "https://media.istockphoto.com/id/1137936848/photo/vachellia-nilotica.jpg?s=612x612&w=0&k=20&c=YdavOAKOwayFbLLDXCGBE84tVu7lvjfzyv5k2OuuAWg=" },
        { month: "November", img: "https://media.istockphoto.com/id/1272710341/photo/empty-dirt-beach-with-traces-against-canadian-rockies.jpg?s=612x612&w=0&k=20&c=MbtNBo7_Vau2tRxilesny4w6c8KN1dR0LXqQOwMRKt4=" },
        { month: "December", img: "https://media.istockphoto.com/id/1362644903/photo/kailash-himalaya-mountain-slopes-at-narkanda-himachal-pradesh-india.jpg?s=612x612&w=0&k=20&c=P5OiP9QnX29KjoXZ0YLRmU9pmAHuV1KIoRy4mdD44DY=" },
    ];

    const [filteredCities, setFilteredCities] = useState([]);
    const selectedMonth = month.find((m) => m.month === currentMonth);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchCities = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/get-city-data');
                const allCities = response.data;

                const result = allCities.filter(city => {
                    const { start, end } = city.peakseason || {};
                    if (!start || !end) return false;

                    const monthOrder = [
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];

                    const startIndex = monthOrder.indexOf(start);
                    const endIndex = monthOrder.indexOf(end);
                    const currentIndex = monthOrder.indexOf(currentMonth);

                    if (startIndex === -1 || endIndex === -1 || currentIndex === -1) return false;

                    if (startIndex <= endIndex) {
                        return currentIndex >= startIndex && currentIndex <= endIndex;
                    } else {
                        // For wrap-around months like Nov to Feb
                        return currentIndex >= startIndex || currentIndex <= endIndex;
                    }
                });

                setFilteredCities(result);
            } catch (error) {
                console.error('Error fetching city list:', error);
            }
        };

        fetchCities();
    }, [currentMonth]);

    return (
        <div className='where-to-container'>
            <div className="place-card-content">
                <div className="where-to-header">
                    <img src={selectedMonth?.img} alt={selectedMonth?.month} />
                    <h1 className="where-to-title" style={{ fontSize: "4rem" }}>
                        {selectedMonth?.month}
                    </h1>
                </div>
            </div>
            <div className="where-to-content">
                <AllCity cities={filteredCities} trending="trendingcity" navigate={null} />
            </div>
        </div>
    );
}
