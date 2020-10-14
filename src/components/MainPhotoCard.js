import React, { useState } from 'react';
import Modal from './Modal';

const MainPhotoCard = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const imgReg = props.photo.urls.regular
    const img = props.photo.urls.small
    const name = props.photo.user.name

    return ( 
        <div className="column">
            <div className="photo-ui-card" onClick={()=>setIsOpen(true)}>
                <div className="photo-card-image">
                    <img className="image" srcSet={`${img} 2x`} alt='movie'/>
                </div>
                <div className="card-title">
                    <h3> By {name}</h3>
                </div>
            </div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="modal-card-image">
                    <img className="modal-image" srcSet={`${imgReg} 3x`} alt='movie'/>
                </div>
                <div>
                    <h3> By {name}</h3>
                </div>
            </Modal>
        </div>
     );
}
 
export default MainPhotoCard;