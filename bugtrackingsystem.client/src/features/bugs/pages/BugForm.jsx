import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
//import CreateNotification from '../../../components/common/CreateNotification';
import ConfirmModal from '../../../components/common/ConfirmModal';
import toast, { Toaster } from 'react-hot-toast';

import api from '../../../services/api';


function BugForm({ views, initialData }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('Low');
    const [status, setStatus] = useState('Open');
    const [showModal, setShowModal] = useState(false);
    var view = views;
    console.log("view state", view);


    useEffect(() => {
        if (view == "Read" || view =="Update" && initialData) {

            setTitle(initialData.title);
            setDescription(initialData.description);
            setSeverity(initialData.severity);
            setStatus(initialData.status);
        }
       
    }, [view, initialData]);
    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleChangeStatus(e) {
        setStatus(e.target.value);
    }

    function handleChangeSeverity(e) {
        setSeverity(e.target.value);
    }

    //handlilng confirmation
    async function handleConfirm(e) {

        //Browser refreshes the page when submitting using form. 
        //prevent default refreshes
        e.preventDefault();


        var bug = {
            Title: title,
            Description: description,
            Status: status,
            Severity: severity,
            CreatedDate: new Date()
        };

       
           
            try {
                
                //create logic
                if (view == 'Create') {
                    const url = 'Bugs';
                    const response = await api.post(url, bug);
                    //check status and give notification
                    if (response.status >= 200 && response.status < 300) {
                        console.log("Confirmed submitted Response:", response.data);

                        //use toaster for create notification
                        toast.success(response.data.title + ' Bug Sucessfully created!!');

                    } else {
                        // Handle unexpected status codes (e.g., 400, 403, 404)
                        console.warn("Server responded with an issue:", response.status);
                    }
                    //reset form
                    resetForm();
                }
                //update logic
                else if (view == 'Update') {
                    //api:Bugs/{id}
                    const urlId = initialData.id;
                    console.log("Bugs data", bug);

                    var updatedBug = {
                        Id: initialData.id,
                        Title: title,
                        Description: description,
                        Status: status,
                        Severity: severity,
                        CreatedDate: initialData.createdDate
                    }
                    const url = 'Bugs/' + urlId; 
                    const response = await api.put(url, updatedBug);

                    //check status and give notification
                    if (response.status >= 200 && response.status < 300) {
                        console.log("Confirmed submitted Response:", response.data);

                        //use toaster for create notification
                        toast.success(' Bug Updated created!!');

                    } else {
                        // Handle unexpected status codes (e.g., 400, 403, 404)
                        console.warn("Server responded with an issue:", response.status);
                    }
                }              
            } catch {
                console.log("Something is wrong in api.");
            }
    
        setShowModal(false);
      
    }

    //habling submit
    function handleSubmit(e) {
        e.preventDefault();
        //validation
        if (title.trim() === '') {
            alert('Please enter a title for the bug');
            return;
        }
        if (description.trim() === '') {
            alert('Please enter a description for the bug');
            return;
        }
        if (status.trim() == '') {
            alert('Please select status');
            return;
        }
        if (severity.trim() == '') {
            alert("Please select severity");
            return;
        }

        setShowModal(true);
    }

    //clear bug
    function resetForm() {
        //reset form using useState()
        setTitle('');
        setDescription('');
        setStatus('Low');
        setSeverity('Open');
    }

    return (
      ( view != 'List' || view === 'Create') && (
        <>
                <h1 className="heading-4">{(view === 'Read' || view =='Update') ? 'View Bug Details' : 'Create a New Bug'}</h1>
            <form>
                {/* // Title Input   */}
                <div className='form-group'>
                    <label>Enter your title:
                            <input required className="form-control" type="text" value={title} onChange={handleChangeTitle} disabled={ view === 'Read'} />
                    </label>
                </div>

                {/* // Description Input   */}
                <div className='form-group'>
                    <label >Description
                            <textarea required className="form-control" type="text" value={description} onChange={handleChangeDescription} disabled={view === 'Read' }>  </textarea>
                    </label>
                </div>

                {/* Severity dropdown */}
                <div className='form-group'>
                    <label>Severity
                            <select value={severity} onChange={handleChangeSeverity} className='form-control' disabled={view === 'Read' }>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                </div>

                {/* Status dropdown */}
                <div className='form-group'>
                    <label>Status
                            <select value={status} onChange={handleChangeStatus} className='form-control' disabled={view === 'Read'}>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </label>
                </div>

                    {(view === 'Create' || view === 'Update') && (                     
                            <div className='form-group'>
                                <label>
                                    <button className='btn btn-primary btn-sm' type="button" value='Submit' onClick={handleSubmit} >Submit</button>
                                </label>

                                {/* // Confirmation Modal */}

                                <ConfirmModal
                                    isOpen={showModal}
                                    title="Confirm Submit"
                                    message="Are you sure you want to submit this bug?"
                                    onConfirm={handleConfirm}
                                    onCancel={() => setShowModal(false)}
                                />
                            </div>          
                    )}        
            </form>
            <Toaster />
        </>
    )
    );
}

export default BugForm;