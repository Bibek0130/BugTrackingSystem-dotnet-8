import { useState } from 'react';
import { createRoot } from 'react-dom/client';

import api from '../../../services/api';
function BugList() {
    const data = [
        
            {
                "id": 2,
                "title": "first Bug",
                "description": "this is the first bug",
                "status": "open",
                "severity": "immediate",
                "createdDate": "2026-03-17T17:43:02.49"
            },
            {
                "id": 3,
                "title": "sfdsf",
                "description": "dasgfa",
                "status": "Open",
                "severity": "Low",
                "createdDate": "2026-03-17T18:51:03.01"
            },
            {
                "id": 4,
                "title": "Notification",
                "description": "After creating bug, a create notification should be visible.",
                "status": "Open",
                "severity": "Low",
                "createdDate": "2026-03-17T18:55:24.908"
            },
           
            {
                "id": 22,
                "title": "asd",
                "description": "asd",
                "status": "Open",
                "severity": "Low",
                "createdDate": "2026-03-18T16:20:03.012"
            },
            {
                "id": 23,
                "title": "asd",
                "description": "asdasd saf asf",
                "status": "Open",
                "severity": "Low",
                "createdDate": "2026-03-18T16:21:10.381"
            },
            {
                "id": 24,
                "title": "test refresgh",
                "description": "asd",
                "status": "Open",
                "severity": "Low",
                "createdDate": "2026-03-18T16:21:31.452"
            }
        
    ];
    //getList();
    //async function getList() {
        //const url = "Bugs"
        //try {
        //    const response =await api.get(url);

        //    //check status and give notification
        //    if (response.status >= 200 && response.status < 300) {
        //        console.log("Bug List", response.data);
        //        data = response.data;
        //        console.log("data", data);

        //    } else {
        //        // Handle unexpected status codes (e.g., 400, 403, 404)
        //        console.warn("Server responded with an issue:", response.status);
        //    }

        //}
        //catch {
        //    console.log("Something is wrong in api.");
        //}
    //};
     



    
   
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