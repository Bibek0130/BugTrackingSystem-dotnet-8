import React, { useState } from 'react';
import api from '../../../services/api';
import { useEffect } from 'react';
function Dashboard() {
    const [bugCount, setBugCount] = useState(); // Example bug count, replace with actual data

    fetchBugCount(); // Call the function to fetch bug count when the component mounts
    //function for fetching bug count from the API
    async function fetchBugCount() {
        try {
            const response = await api.get("Bugs/bugs-count");

            if (response.status >= 200 && response.status < 300) {
                const length = response.data;
                setBugCount(length); // Assuming response.data is an array of bugs
            }
        } catch (err) {
            console.log("Error fetching bug count:", err);
        }
    }
    
    return (
        <>
            <div className="header">
                <h1>Dashboard</h1>
            </div>

            <div className="container-fluid">
                <div className="row" style={BugCount }>
                    <div className="col-lg-4 ">
                        <p>Total Bugs Created</p>
                    </div>
                    <div className="col-lg-4 ">{bugCount }
                    </div>                  
                </div>
            </div>
        </>
      
    );
}

export default Dashboard;

const BugCount = {
    borderRadius: "10px",
    border: "2px solid forestgreen",
   // width: "200px",
    //height:"150px",
    padding: "5%"

}

