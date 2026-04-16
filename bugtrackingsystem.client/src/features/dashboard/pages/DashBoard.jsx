import React, { useState } from 'react';
import api from '../../../services/api';
import { useEffect } from 'react';
function Dashboard() {
    const [bugCount, setBugCount] = useState(); // Example bug count, replace with actual data
    const [bugClosed, setBugClosed] = useState();
    const [bugUrgent, setBugUrgent] = useState();
    const [fetching, setFetching] = useState(true); // State to track if data is being fetched

    useEffect(() => {
        if (fetching) {
            try {
                fetchBugCount();
                getClosedBugs();
                getBugUrgent();
            }
            catch (err) {
                console.log("Error fetching data:", err);
            }
            finally {
                setFetching(false); // Set fetching to false after data is fetched
            }
        }
    },[]);  
  

    //function for fetching bug count from the API
    async function fetchBugCount() {
        try {
            const response = await api.get("Bugs/bugs-count");

            if (response.status >= 200 && response.status < 300) {
                console.log("Bug Count", response);
                const length = response.data;

                //set the value to the state
                setBugCount(length);
            }
        } catch (err) {
            console.log("Error fetching bug count:", err);
        }
        finally {
            setFetching(false);
        }
    }
    //function for fetching bug count closed from the API
    async function getClosedBugs() {
        try {
            const response = await api.get("Bugs/closed-bugs-count");

            if (response.status >= 200 && response.status < 300) {
                console.log("Bug Closed", response);
                const dd = response.data;

                //set the value to the state
                setBugClosed(dd);
            }
        } catch (err) {
            console.log("Error fetching bug count:", err);
        }
    }

    //function for fetching bug count closed from the API
    async function getBugUrgent() {
        try {
            const response = await api.get("Bugs/urgent-bugs-count");

            if (response.status >= 200 && response.status < 300) {
                console.log("Bug Urgent", response);
                const dd = response.data;

                //set the value to the state
                setBugUrgent(dd);
            }
        } catch (err) {
            console.log("Error fetching bug urgent count:", err);
        }
    }
    
    return (
        <>
            <div className="header">
                <h1>Dashboard</h1>
            </div>

            <div className="container-fluid p-2">
                <div className="row p-6" style={BugCount }>
                    <div className="col-lg-4 ">
                        <p>Total Bugs Created</p>
                    </div>
                    <div className="col-lg-4 ">{bugCount }
                    </div>                  
                </div>

                <div className="row p-6" style={BugClosedCss}>
                    <div className="col-lg-4 ">
                        <p>Bugs Closed: </p>
                    </div>
                    <div className="col-lg-4 ">{bugClosed}
                    </div>
                </div>

                <div className="row p-6" style={BugClosedCss}>
                    <div className="col-lg-4 ">
                        <p>Urgent Bug: </p>
                    </div>
                    <div className="col-lg-4 ">{bugUrgent}
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
    padding: "5%",
    margin: "2%" //for adding gap and a nice look to it
}
const BugClosedCss ={
    borderRadius: "10px",
    border: "2px solid forestgreen",
    padding: "5%",
    margin: "2%"
}

