import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import api from '../../../services/api';
function BugList() {
    var [data, setData] = useState([]); //for stroing lists
    const [error, setError] = useState(""); //for error

    //useEffect to call the api
    useEffect(() => {
        getList();
    }, []);

    async function getList() {
        const url = "Bugs"
        try {

            setError("");
            var response =await api.get(url);

            //check status and give notification
            if (response.status >= 200 && response.status < 300) {
                console.log("Bug List", response.data);
                const fetchedData = typeof response.data === 'string'
                    ? JSON.parse(response.data)
                    : response.data;

                setData(fetchedData);
                console.log("data", setData);

            } else {
                // Handle unexpected status codes (e.g., 400, 403, 404)
                console.warn("Server responded with an issue:", response.status);
                return;
            }
            data = response.data;
        }
        catch (err) {
            setError(err.message);
            console.log("Something is wrong in api.", setError);
        }
    };
     



    
   
    return (
        <div className='Bug-List'>
            <h1 style={h1 }>My bugs</h1>
            <table className="table-bordered" style={listtable}>
                <thead>
                    <tr>
                        <th style={th}>SN</th>
                        <th style={th}>Title</th>
                        <th style={th}>Description</th>
                        <th style={th}>Status</th>
                        <th style={th}>Severity</th>
                        <th style={th}>Created Date</th>
                    </tr>
                   
                </thead>

                <tbody>
                    {data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td style={td}>{key + 1}</td>
                                <td style={td}> {val.title}</td>
                                <td style={td}>{val.description}</td>
                                <td style={td}>{val.status}</td>
                                <td style={td}>{val.severity}</td>
                                <td style={td}>{val.createdDate}</td>
                            </tr>
                        )
                    })}
                </tbody>
                
            </table>
        </div>
    );
}

export default BugList;

//styles
const h1 = {
    color:"#81c43b"
}
const listtable ={
    border: "2px solid forestgreen",
    width: "800px",
    height: "200px"
};

const th = {
    borderbottom: "1px solid black"
}

const td = {
    textalign :"center"
}