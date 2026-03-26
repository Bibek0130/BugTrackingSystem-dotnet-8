import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import './MainLayout.css';



const CustomNav = ({ li }) => {
    const [window, setWindow] = useState(false); //window  is false when the menu is closed and true when the menu is opened.

    //logic for opening and closing the menu
    let openClose = () => {
        if (window === false) {
            setWindow(true);
        } else {
            setWindow(false);
        }

    };
    return (
        <div className="container-fluid">
            <div className="container-fluid row ">
                <div className="col-lg col-lg-3 app-container ">
                    <nav
                        className="navbar-menu"
                        onClick={openClose}
                        style={{ width: window === false ? 250 : 60 }}
                    >
                        <div className="burger" zxc>
                            <img src="menu.png" alt="burger" />
                        </div>
                        <ul className="navbar__list">
                            {li.map((item, i) => {
                                const path = `/${item[0].toLowerCase().replace(/\s/g, "-")}`;
                                return (
                                    <li key={i} className="navbar__li-box">
                                        <Link to={path} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={item[1]}
                                                alt={item[0]}
                                                style={{ paddingLeft: window ? 17 : 27, width: '20px' }}
                                            />
                                            {!window && (
                                                <span className="navbar__li" style={{ marginLeft: '10px' }}>
                                                    {item[0]}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
                <div className="col-lg col-md-auto">
                    <main style={{ marginLeft: window === false ? 20 : 50, transition: 'margin-left 0.3s' }}>
                        <Outlet />
                    </main>
                </div>
               
            </div>     
        </div>
    );
};

export default CustomNav;