import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ConfirmModal from '../../../components/common/ConfirmModal';
import api from '../../../services/api';


function BugForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('Low');
    const [status, setStatus] = useState('Open');
    const [showModal, setShowModal] = useState(false);

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
     function handleConfirm() {

        var bug = {
            Title: title,
            Description: description,
            Status: status,
            Severity: severity,
            CreatedDate: new Date()
        };


        const url = 'Bugs';
        try {
            const response = api.post(url, bug);
            console.log("Bug: ", bug);
            if (response.data) {
                console.log("Confirmed  submitted Response", response.data);
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

    return (
        <>
            <h1 className="heading-4">Create a New Bug</h1>
            <form>
                {/* // Title Input   */}
                <div className='form-group'>
                    <label>Enter your title:
                        <input required className="form-control" type="text" value={title} onChange={handleChangeTitle} />
                    </label>
                </div>

                {/* // Description Input   */}
                <div className='form-group'>
                    <label >Description
                        <textarea required className="form-control" type="text" value={description} onChange={handleChangeDescription}>  </textarea>
                    </label>
                </div>

                {/* Severity dropdown */}
                <div className='form-group'>
                    <label>Severity
                        <select value={severity} onChange={handleChangeSeverity} className='form-control'>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                </div>

                {/* Status dropdown */}
                <div className='form-group'>
                    <label>Status
                        <select value={status} onChange={handleChangeStatus} className='form-control'>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </label>
                </div>

                <div className='form-group'>
                    <label>
                        <button className='btn btn-primary btn-sm' type="button" value='Submit' onClick={handleSubmit}>Submit</button>
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
            </form>
        </>
    );
}

export default BugForm;