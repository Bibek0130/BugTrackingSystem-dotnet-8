import React, { useState } from 'react';
import api from '../../../services/api';
import { useEffect } from 'react';
function Dashboard() {
    const [bugCount, setBugCount] = useState(); // Example bug count, replace with actual data
    const [bugClosed, setBugClosed] = useState();
    const [bugUrgent, setBugUrgent] = useState();
    const [bugInProgress, setBugInProgress] = useState();
    const [fetching, setFetching] = useState(true); // State to track if data is being fetched

    const STATS = [
        { label: "Total Bugs", value:bugCount, sub: "+12 this week", subColor: "#639922", accent: "#639922", icon: "🐛" },
        { label: "Urgent Bugs", value: bugUrgent, sub: "Needs immediate action", subColor: "#A32D2D", accent: "#E24B4A", valueColor: "#A32D2D", icon: "🔥" },
        { label: "Bugs Closed", value: bugClosed, sub: "63.3% resolution rate", subColor: "#639922", accent: "#3B6D11", valueColor: "#3B6D11", icon: "✅" },
        { label: "Still Open", value: bugCount - bugClosed, sub: "Awaiting resolution", subColor: "#185FA5", accent: "#185FA5", valueColor: "#185FA5", icon: "📂" },
    ];

    const MINI_STATS = [
        { label: "In Progress", value: bugInProgress, bg: "#E6F1FB", color: "#185FA5", accent: "#97C459", icon: "⚙️" },
        { label: "In Review (dummy)", value: 18, bg: "#EEEDFE", color: "#534AB7", accent: "#7F77DD", icon: "🔍" },
        { label: "Reopened (dummy)", value: 7, bg: "#FAEEDA", color: "#854F0B", accent: "#EF9F27", icon: "🔁" },
    ];

    useEffect(() => {
        if (fetching) {
            try {
                fetchBugCount();
                getClosedBugs();
                getBugUrgent();
                getBugInProgress();
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

    //get bug in progress count from the API
    //function for fetching bug count closed from the API
    async function getBugInProgress() {
        try {
            const response = await api.get("Bugs/in-progress-bugs-count");

            if (response.status >= 200 && response.status < 300) {
                console.log("Bug In Progress", response);
                const dd = response.data;

                //set the value to the state
                setBugInProgress(dd);
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

            {/* stats*/}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 14, marginBottom: 16 }}>
                {STATS.map(s => (
                    <div key={s.label} style={{
                        background: "#fff", borderRadius: 12, border: "1px solid #e4f0dc",
                        padding: "18px 20px", position: "relative", overflow: "hidden"
                    }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.accent, borderRadius: "12px 12px 0 0" }} />
                        <div style={{ position: "absolute", right: 16, top: 16, fontSize: 20, opacity: 0.4 }}>{s.icon}</div>
                        <div style={{ fontSize: 11, color: "#7a9270", marginBottom: 6, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                        <div style={{ fontSize: 30, fontWeight: 600, color: s.valueColor || "#1a2e0e", lineHeight: 1 }}>{s.value}</div>
                        <div style={{ fontSize: 11, marginTop: 6, color: s.subColor }}>{s.sub}</div>
                    </div>
                ))}
            </div>

            {/* Mini Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 14, marginBottom: 20 }}>
                {MINI_STATS.map(s => (
                    <div key={s.label} style={{
                        background: "#fff", borderRadius: 12, border: "1px solid #e4f0dc",
                        padding: "14px 18px", display: "flex", alignItems: "center", gap: 14,
                        position: "relative", overflow: "hidden"
                    }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.accent, borderRadius: "12px 12px 0 0" }} />
                        <div style={{ fontSize: 22, opacity: 0.8 }}>{s.icon}</div>
                        <div>
                            <div style={{ fontSize: 11, color: "#7a9270", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                            <div style={{ fontSize: 22, fontWeight: 600, color: s.color }}>{s.value}</div>
                        </div>
                    </div>
                ))}
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

