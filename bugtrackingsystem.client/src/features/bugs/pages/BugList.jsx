import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import toast, { Toaster } from 'react-hot-toast';
import Pagination from '../../../components/pagination/Pagination.jsx';
import BugForm from './BugForm.jsx';

import api from '../../../services/api';
function BugList() {
    var [data, setData] = useState([]); //for stroing lists
    const [error, setError] = useState(""); //for error
    const [pageSize, setPageSize] = useState(15);
    const [pageNumber, setPageNumber] = useState(1);
    const [view, setView] = useState('List');
    const [selectedBug, setSelectedBug] = useState(null);

    //useEffect to call the api
    useEffect(() => {
        if (view == "List") {
            getList(pageNumber, pageSize);
        }
        else if (view == 'Read') {
            getListDataById(selectedBug.id);
        }
        else if (view == 'Update'){
            getListDataById(selectedBug.id);
            console.log("View from useEffects");
        }
       
    }, [pageNumber, view]);

    async function getList(pageNumber, pageSize) {
        const url = "Bugs?pageSize=" + pageSize + "&pageNumber=" + pageNumber; 
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

    async function getListDataById(id) {

        const Id = id.toString();
        //api/Bugs/{id}
        const url = 'Bugs/' + Id;
        console.log("The bug to be viewed", Id);
        console.log("View: ", view);
        try {
            const response = await api.get(url);
            //check status and give notification
            if (response.status >= 200 && response.status < 300) {
                //use toaster for delete notification
                toast.success('Viewing Bug with id ' + id);
                console.log("BugList By Id data", response.data);

            } else {
                // Handle unexpected status codes (e.g., 400, 403, 404)
                console.warn("Server responded with an issue:", response.status);
            }
        } catch (err) {
            setError(err.message);
            console.log("Something wrong while viewing. Error: ", setError);
        }
    }

    //List Page
    function viewBug(bug) {
        setSelectedBug(bug);
        setView('Read');
        //fetch the data
        getListDataById(bug.id);

       // <BugForm views={view} />

    }

    //update page
    function updateBug(bug) {
        setSelectedBug(bug);
        setView('Update');
    }

    //delete function
    async function deleteBug(id) {

        const Id = id.toString();
        //api/Bugs/{id}
        const url = 'Bugs/'+Id;
        console.log("The bug to be deleted", Id);
        try {
            const response =await api.delete(url);
            //check status and give notification
            if (response.status >= 200 && response.status < 300) {
                //use toaster for delete notification
                toast.success('Bug Deleted Sucessfully!! with id ' + id);

            } else {
                // Handle unexpected status codes (e.g., 400, 403, 404)
                console.warn("Server responded with an issue:", response.status);
            }
        } catch (err) {
            setError(err.message);
            console.log("Something wrong while deleting. Error: ", setError);
        }
       
    };



    
   
    return (
        <div className='Bug-List'>
            {/*//if view is list show the table*/}
            {view === 'List' && (
                <>
                <h1 style={h1}>My bugs</h1>
                <div style={tableResponsive}>
                    <table className="table-bordered table-scrollable" style={listtable}>
                        <thead>
                            <tr>
                                <th style={th}>SN</th>
                                <th style={th}>Title</th>
                                <th style={th}>Description</th>
                                <th style={th}>Status</th>
                                <th style={th}>Severity</th>
                                <th style={th}>Created Date</th>
                                <th style={th}>Action</th>
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
                                        <td style={td} className=''>
                                            <button className='btn btn-sm btn-info' onClick={() => viewBug(val)}>View</button> | 
                                            <button className='btn btn-sm btn-primary' onClick={() => updateBug(val)}>Update</button> |
                                            <button className='btn btn-sm btn-danger' onClick={() => deleteBug(val.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>

                    {/* pagination footer  //need to call getList when pageNumber changes*/}
                <div className="items-center justify-center">
                    <span>Size</span>: <span>{pageSize}</span>
                    <Pagination page={pageNumber} setPage={setPageNumber} />
                </div>
                </>
            )}

            {/*if view is read, show the form*/}
            {view === 'Read' || view === 'Update' && (
                <>
                    <button onClick={() => setView('List')}>Back to List</button>
                    <BugForm views={view} initialData={selectedBug} />
                </>
            )}

           
            <Toaster />
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
const tableResponsive = { //needs fixing 
    maxWidth: "1000px",   // Limit max width
    width: "100%",        // Allow shrinking on smaller screens
    overflowY: "auto",    // Horizontal scroll for small screens
    display: "block"      // Required for overflow to work
}
