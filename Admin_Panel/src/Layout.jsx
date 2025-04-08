import React from 'react'
import Navbar from './Components/NavBar/Navbar'
import { Outlet } from 'react-router-dom'
import bg from "./assets/background.webp"
export default function Layout() {
    return (
        <div>
            <img style={{position:"absolute", zIndex:"-1", width:"100%", height:"100vh", filter:"brightness(50%) blur(10px)", objectFit:"cover"}} src={bg} alt="" />
            <div style={{ display: "flex" }}>
                <div style={{
                    zIndex: 200,
                    backgroundColor: "black",
                    width: "15rem",
                    height: "100%",
                    position: "fixed",
                    top: "0",
                    left: "0",
                }}>
                    <Navbar />
                </div>

                {/* Content area: Scrollable */}
                <div style={{
                    flex: 1,
                    marginLeft: "15rem",
                    overflowY: "auto",
                    height: "100vh"
                }}>
                    <Outlet />
                </div>
            </div>
        </div>

    )
}
