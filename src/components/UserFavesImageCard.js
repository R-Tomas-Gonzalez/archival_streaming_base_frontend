import React from 'react';
import { TiDeleteOutline } from "react-icons/ti";

const FavoriteImageCard = (props) => {
    // console.log(props.image)
    const img = props.image.image_url
    const name = props.image.name

    return ( 
        <div className="column">
            <div className="photo-ui-card" onClick={()=> props.handlePreviewClick(props.image)}>
                <div className="photo-card-image">
                    <img className="image" srcSet={`${img} 4x`} alt='movie'/>
                    <button className="delete-user-fave-btn" data-text="delete from faves" onClick={()=>props.handleDelete(props.image)}><TiDeleteOutline size="2em"/></button>
                </div>
                <div className="card-title">
                    <h3> By {name}</h3>
                </div>
            </div>
        </div>
     );
}
 
export default FavoriteImageCard;