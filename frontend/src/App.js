import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './component/form/SignIn/SignIn';
import SignUp from './component/form/SignUp/SignUp';
import Dashboard from './component/Dashboard/Dashboard';
import Upload from './component/Upload/Upload';
import VideoPlayer from './component/VideoPlayer/videoPlayer';
import ExistingPage from './component/ExistingPage/ExistingPage'
import MyVideos from './component/my-video/My-videos';
import NewVideo from './component/ExistingPage/NewVideo';
import NewDashboard from './component/Dashboard/NewDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact="true" path="/signin" element={<SignIn />} />
        <Route exact="true" path="/signup" element={<SignUp />} />
        <Route exact="true" path="/home" element={<Dashboard />} />
        <Route exact="true" path="/" element={<ExistingPage />} />
        <Route exact="true" path="/upload" element={<Upload />} />
        <Route exact="true" path="/videos" element={<VideoPlayer />} />
        <Route exact="true" path="/myvideos" element={<MyVideos />} />
        <Route exact="true" path="/profile/:id" element={<NewVideo />} />
        <Route exact="true" path="/profile/:id" element={<NewDashboard />} />
      </Routes>
    </Router>
  );
}
export default App;
