// Defines Routes
// Applies layout

import { Routes, Route } from 'react-router-dom';
import CustomNav from './layout/MainLayout.jsx';
import CreateBug from '../features/bugs/pages/BugForm.jsx';
import MyBugs from '../features/bugs/pages/BugList.jsx';
import Dashboard from '../features/dashboard/pages/DashBoard.jsx';

function App() {
    return (
        <>
            <Routes>
                <Route element={<CustomNav li={[
                    ["Dashboard", "dashboard.svg"],
                    ["My Bugs", "myBugs.jpg"],
                    ["Create Bug", "create.svg"]
                ]} />} >
                    <Route index element={<Dashboard />} />
                    <Route path="/create-bug" element={<CreateBug />} />
                    <Route path="/my-bugs" element={<MyBugs />} />
                </Route>
            </Routes></>

    );
}

export default App;