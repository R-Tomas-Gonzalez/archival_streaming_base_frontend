import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import '../App.css'
import '../index.css';

const RegistrationModal = ({ open, children, onClose}) => {
    if(!open) return null
    return ReactDom.createPortal( 
        <Fragment>
            <div className="overlay-styles" onClick={onClose}/>
            <div className="registration-modal-styles">
                <button className="modal-button" onClick={onClose}>X</button>
                {children} 
            </div>
        </Fragment>,
        document.getElementById('portal')
     );
}
 
export default RegistrationModal;