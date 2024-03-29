// bootstrap imported stuff
import Toast from 'react-bootstrap/Toast'
// hooks
import { useEffect } from 'react';

export const Notification = ({ showToast, setShowToast, message, setToastMessage}) => {
    return (
        <Toast 
            onClose={() => setShowToast(false)} 
            show={showToast} 
            delay={3000} 
            autohide
            className='p-4 pb-2 mb-3 d-flex justify-content-center align-items-center w-100' >
            <p className='fw-bold'>{message}</p>
        </Toast>
    )
}