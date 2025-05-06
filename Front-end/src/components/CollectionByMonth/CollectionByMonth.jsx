import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import styles from "./CollectionByMonth.module.css"
export default function CollectionByMonth() {
    
    const navigate=useNavigate()
    const month=[
        {
            month:"January",
            img:"https://media.istockphoto.com/id/460682111/photo/panorama-of-the-winter-sunrise-in-mountains.jpg?s=612x612&w=0&k=20&c=DYe99hLsrxeGCIFy-sYTCnQCBllnoPVn3digKa7-J9I=",
        },
        {
            month:"February",
            img:"https://media.istockphoto.com/id/496577538/photo/trees-covered-with-hoarfrost-in-a-fog.jpg?s=612x612&w=0&k=20&c=zZsyKelWpEJHTLRdRgLufV4Jrd8b8tyj5JWOKOcgwG4=",
        },
        {
            month:"March",
            img:"https://plus.unsplash.com/premium_photo-1674917000586-b7564f21540e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFyY2glMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
        },
        {
            month:"April",
            img:"https://images.unsplash.com/photo-1614667864607-aeebdc464e98?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcmNoJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
        },
        {
            month:"May",
            img:"https://images.unsplash.com/photo-1615277715412-2244e4a8ea62?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hcmNoJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
        },
        {
            month:"June",
            img:"https://plus.unsplash.com/premium_photo-1712685912275-943ff90aac7c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VtbWVyYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
        },
        {
            month:"July",
            img:"https://media.istockphoto.com/id/1362644903/photo/kailash-himalaya-mountain-slopes-at-narkanda-himachal-pradesh-india.jpg?s=612x612&w=0&k=20&c=P5OiP9QnX29KjoXZ0YLRmU9pmAHuV1KIoRy4mdD44DY=",
        },
        {
            month:"August",
            img:"https://media.istockphoto.com/id/1165083109/photo/coconut-palm-trees-on-sandy-beach.webp?a=1&b=1&s=612x612&w=0&k=20&c=6Hn55IhnV2eIe818c4cbUXGrFvVbwT1v78PgmZeH6us=",
        },
        {
            month:"September",
            img:"https://media.istockphoto.com/id/1170896292/photo/heart-of-autumn-yellow-orange-trees-in-forest-with-heart-shape-sunny-weather-good-day.jpg?s=612x612&w=0&k=20&c=xiRn7BhRHuePPMbszEks-z7fGVEEzXxPe1nN0658IeU=",
        },
        {
            month:"October",
            img:"https://media.istockphoto.com/id/1137936848/photo/vachellia-nilotica.jpg?s=612x612&w=0&k=20&c=YdavOAKOwayFbLLDXCGBE84tVu7lvjfzyv5k2OuuAWg=",
        },
        {
            month:"November",
            img:"https://media.istockphoto.com/id/1272710341/photo/empty-dirt-beach-with-traces-against-canadian-rockies.jpg?s=612x612&w=0&k=20&c=MbtNBo7_Vau2tRxilesny4w6c8KN1dR0LXqQOwMRKt4=",
        },
        {
            month:"December",
            img:"https://media.istockphoto.com/id/1362644903/photo/kailash-himalaya-mountain-slopes-at-narkanda-himachal-pradesh-india.jpg?s=612x612&w=0&k=20&c=P5OiP9QnX29KjoXZ0YLRmU9pmAHuV1KIoRy4mdD44DY=",
        }
    ]
    function handleClick(name,image){
        navigate(`/month/${name}`)
    }
  return (
    <div className={styles['collection-by-month']}>
            <h2>Collections by Month</h2>
            <div className={styles['collection-cards']} id='collection-cards'>
                    {
                        month.map((item,index)=>(
                            <div key={index} className={styles['collection-card']} id='collection-card' onClick={()=>{ handleClick(item.month,item.img) }}>
                                <div className={styles['collection-card-img']} id='collection-card-img'>
                                    <img src={item.img} alt={item.name} />
                                </div>
                                <div className={styles['collection-card-info']} id='collection-card-info'>
                                    <h3>{item.month}</h3>
                                </div>
                            </div> 
                        ))
                    }
            </div>
    </div>
  )
}
