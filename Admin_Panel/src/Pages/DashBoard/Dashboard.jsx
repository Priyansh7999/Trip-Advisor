import React from 'react'
import Cards from './Cards/Cards'
import styles from './Dashboard.module.css'
import Recent from './Recent/Recent'
export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <h1>Overview</h1>
            <Cards />
        </div>
    )
}
