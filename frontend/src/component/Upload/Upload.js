import React, { useState } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import './Upload.css';


const Upload = () => {
    const navigate = useNavigate();
    const [selectedVideos, setSelectedVideos] = useState(null);
    const [loaded, setLoaded] = useState(0);
    const [input, setInput] = useState('')

    const maxSelectFile = (event) => {
        let files = event.target.files;
        if (files.length > 1) {
            toast.error('Maximum 1 file is allowed');
            event.target.value = null;
            return false;
        } else {
            let err = '';
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > 52428800) { // 50 MB
                    err += files[i].name + ', ';
                }
            }
            if (err !== '') {
                // error caught
                event.target.value = null;
                toast.error(err + " is/are too large. Please select file size < 50Mb");
            }
        }
        return true;
    };

    const fileChangeHandler = (event) => {
        const files = event.target.files;
        if (maxSelectFile(event)) {
            setSelectedVideos(files);
            setLoaded(0);
        }
    };

    const fileUploadHandler = (event) => {
        event.preventDefault();
        const data = new FormData();
        for (let i = 0; selectedVideos && i < selectedVideos.length; i++) {
            data.append('file', selectedVideos[i]);
            data.append('video_description', input);
        }
        axios.post('http://localhost:5050/api/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
            },
            onUploadProgress: ProgressEvent => {
                setLoaded((ProgressEvent.loaded / ProgressEvent.total * 100));
            }
        })
            .then(res => {
                toast.success('Upload Successful');
            }).catch(err => {
                toast.error(`Upload Fail with status: ${err.statusText}`);
            });
    };


    if (!localStorage.getItem('userTokenTime')) navigate("/signin");

    return (
        <>
            <Navbar />
            <div className="upload-container">
                <div className="form-group">
                    <ToastContainer />
                </div>
                <h4>Upload New video</h4>

                <form method="post" name="videoUpload" action="/api/upload" id="#" encType="multipart/form-data">
                    <div className="form-group">
                        <input
                            type="file"
                            name="file"
                            className="form-control"
                            multiple="multiple"
                            accept="video/*"
                            onChange={fileChangeHandler} />
                        <h4 className='Description'>Description</h4>
                        <input type="text" name='video_description' id="video-description" value={input}
                            onInput={(e) => setInput(e.target.value)} />
                        <Progress max="100" color="success" value={loaded} className="mt-4 mb-1 progress-bar-custom">
                            {isNaN(Math.round(loaded, 2)) ? 0 : Math.round(loaded, 2)}%
                        </Progress>

                        <button
                            type="button"
                            className="btn btn-success btn-block"
                            onClick={fileUploadHandler}>Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Upload;
