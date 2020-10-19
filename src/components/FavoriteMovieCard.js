import React from 'react';

const FavoriteMovieCard = (props) => {

    // console.log(props)
    const title = props.movie.original_title
    const img = `https://image.tmdb.org/t/p/w300/${props.movie.poster_path}`
    // const regImg = `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`
    
    return (  
        <div className="favorite-column">
            <div className="ui-faves-card" onClick={() => props.handleStateClick(props.movie)}>
                <div className="faves-card">
                    <img className="faves-image" srcSet={`${img} 1.5x`} alt='movie'/>
                </div>
                <div className="faves-card-title">
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    );
}
 
export default FavoriteMovieCard;