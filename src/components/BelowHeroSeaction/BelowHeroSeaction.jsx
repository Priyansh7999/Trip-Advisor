import React from 'react'
import "./BelowHeroSeaction.css"

export default function BelowHeroSeaction() {
  return (
    <div>
      <div className="below-hero-section">
            <h3>The Curators of Extraordinary Journeys</h3>
            <p>The world is vast, filled with endless beauty, and yet, in the sea of choices, it can often feel overwhelming. With so many options, it’s easy to lose sight of what truly matters—how you want to feel. At our core, we believe in the power of connection, not just to destinations, but to you. We’re a team of passionate people who genuinely care about crafting unforgettable experiences that make your heart sing. We don't just plan trips; we create memories that are rich with joy, warmth, and wonder.</p>
            <p>So, let’s embark on this journey together. Let’s make magic happen and create moments that will stay with you forever.</p>
            <button className="explore-but" onClick={() => window.location.href = "#Search"}>Let's Explore</button>      
          </div>
    </div>
  )
}
