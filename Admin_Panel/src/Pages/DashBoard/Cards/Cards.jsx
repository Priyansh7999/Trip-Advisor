import React from 'react'
import styles from './Cards.module.css'
export default function Cards() {
    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                <p>Total Cities</p>
                <h2>12</h2>
            </div>
            <div className={styles.cards}>
                <p>Total Places</p>
                <h2>12</h2>
            </div>
            <div className={styles.cards}>
                <p>Total Hotels</p>
                <h2>12</h2>
            </div>
            <div className={styles.cards}>
                <p>Total Restaurant</p>
                <h2>12</h2>
            </div>
            <div className={styles.cards}>
                <p>Total Places</p>
                <h2>12</h2>
            </div>
        </div>
    )
}
