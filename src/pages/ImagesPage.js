import React, { PureComponent } from 'react';
import axios from 'axios';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import ImagePreviewContainer from '../containers/images/ImagePreviewContainer'
import ImageFavesContainer from '../containers/images/ImageFavesContainer'
import AllImageFavesContainer from '../containers/images/AllImageFavesContainer'

const pixAPI = process.env.REACT_APP_PIX_KEY

class ImagesPage extends PureComponent {
    state = { 
        imagePreview: {},
        trendingImages: [],
        grayscaleImages: [],
        travelImages: [],
        sportsImages: [],
        industryImages: [],
        peopleImages: [],
        userFaves: [],
    }

    componentDidMount = () => {
        Promise.all([
            fetch(`https://pixabay.com/api/?key=${pixAPI}&orientation=horizontal&image_type=photo&editors_choice=true`),
            fetch(`https://pixabay.com/api/?key=${pixAPI}&colors=grayscale&orientation=horizontal&image_type=photo&editors_choice=true`),
            fetch(`https://pixabay.com/api/?key=${pixAPI}&category=travel&orientation=horizontal&image_type=photo&editors_choice=true`),
            fetch(`https://pixabay.com/api/?key=${pixAPI}&category=sports&orientation=horizontal&image_type=photo&editors_choice=true`),
            fetch(`https://pixabay.com/api/?key=${pixAPI}&category=industry&orientation=horizontal&image_type=photo&editors_choice=true`),
            fetch(`https://pixabay.com/api/?key=${pixAPI}&category=people&orientation=horizontal&image_type=photo&editors_choice=true`),
        ])
        .then(function (response){
            return Promise.all(response.map(function (response){
                return response.json();
            }));
        })
        .then(data => {
            const trending = data[0].hits;
            const grayscale = data[1].hits;
            const travel = data[2].hits;
            const sports = data[3].hits;
            const industry = data[4].hits;
            const people = data[5].hits;

            fetch("http://localhost:3001/image_favorites")
                .then(resp=>resp.json())
                .then(imageFaves=>this.setUserFaves(imageFaves))

            this.setState({
                trendingImages: trending,
                grayscaleImages: grayscale,
                travelImages: travel,
                sportsImages: sports,
                industryImages: industry,
                peopleImages: people
            })
        })
    }

    setUserFaves = (imageFaves) => {
        const newImageFaves = imageFaves.filter(imageFave => (imageFave.user_id === this.props.currentUser.id))
        this.setState({userFaves: newImageFaves})
    }

    addToFaves = (image) => {
        axios.post("http://localhost:3001/image_favorites", {
            image_id: image.id,
            name: image.user,
            image_url: image.largeImageURL,
            user_id: this.props.currentUser.id,
        },
        {withCredentials: true})
        .then(response => {if(this.props.currentUser.id === response.data.user_id){
            this.setState({userFaves: [...this.state.userFaves, response.data]})
        }})
    }

    handlePreviewClick = (image) => {
        const id = image.image_id ? image.image_id : image.id 
        
        fetch(`https://pixabay.com/api/?key=${pixAPI}&id=${id}`)
        .then(resp=>resp.json())
        .then(data => this.setState({imagePreview: data.hits[0]}))

    }

    handleDelete = (image) => {
        fetch(`http://localhost:3001/image_favorites/${image.id}`, {
            method: 'DELETE',
            headers: {
              Accepts: 'application/json',
              'Content-type': 'application/json'
            }
            })
            this.setState({ userFaves: this.state.userFaves.filter(imageFave => imageFave !== image)})
    }

    handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", {withCredentials: true})
        .then(r => {this.props.handleLogout();})
        .catch(error => {
            console.log("logout error", error)
        })
    }

    render() { 
        return ( 
            <div className="wrapper">
                <nav>
                    <ul className="main-nav">
                        <li>
                            <NavLink className="mid-links"to="/main-page">
                                <div className="home-icon-container">
                                    <div className="home-icon">
                                        <HiOutlineUser size="3.5em" />
                                    </div>
                                    <div>
                                    {this.props.currentUser.name}
                                    </div>
                                </div>
                            </NavLink>   
                        </li>
                        <span className="middle-links">
                        <li><NavLink className="mid-links-images-movies" to="/movies">Movies</NavLink></li>
                        <li><NavLink className="mid-links-images-games" to="/games">Games</NavLink></li>
                        <li><NavLink className="mid-links-images" to="/images">Images</NavLink></li>
                        </span>
                        <NavLink className="mid-links" to="/" onClick={() => this.handleLogoutClick()}>
                            <li>
                                <div className="logout-icon-container">
                                    <div>
                                        <HiOutlineLogout size="3.5em"/>
                                    </div>
                                    <div>
                                        LOGOUT
                                    </div>
                                </div>
                            </li>
                        </NavLink>
                    </ul>
                </nav>
                <div >
                    <div>
                    {Object.keys(this.state.imagePreview).length === 0 ? <ImagePreviewContainer image={this.props.photos[1]} addToFaves={(image) => this.addToFaves(image)}/> : <ImagePreviewContainer image={this.state.imagePreview} addToFaves={(image) => this.addToFaves(image)}/> }
                    </div>                    
                        <div className="user-favorites-container">
                            <ImageFavesContainer currentUser={this.props.currentUser} images={this.state.userFaves} handlePreviewClick={this.handlePreviewClick} handleDelete={this.handleDelete}/>
                        </div>
                </div>
                <hr></hr>
                <div className="user-faves-containers">
                    <AllImageFavesContainer currentUser={this.props.currentUser} images={this.state.trendingImages} genre={"Trending"} handlePreviewClick={this.handlePreviewClick} addToFaves={(image) => this.addToFaves(image)}/>
                    <AllImageFavesContainer currentUser={this.props.currentUser} images={this.state.grayscaleImages} genre={"Black and White"} handlePreviewClick={this.handlePreviewClick} addToFaves={(image) => this.addToFaves(image)}/>
                    <AllImageFavesContainer currentUser={this.props.currentUser} images={this.state.travelImages} genre={"Travel"} handlePreviewClick={this.handlePreviewClick} addToFaves={(image) => this.addToFaves(image)}/>
                    <AllImageFavesContainer currentUser={this.props.currentUser} images={this.state.sportsImages} genre={"Sports"} handlePreviewClick={this.handlePreviewClick} addToFaves={(image) => this.addToFaves(image)}/>
                    <AllImageFavesContainer currentUser={this.props.currentUser} images={this.state.industryImages} genre={"Industry"} handlePreviewClick={this.handlePreviewClick} addToFaves={(image) => this.addToFaves(image)}/>
                    <AllImageFavesContainer currentUser={this.props.currentUser} images={this.state.peopleImages} genre={"People"} handlePreviewClick={this.handlePreviewClick} addToFaves={(image) => this.addToFaves(image)}/>
                </div>
            </div>
         );
    }
}
 
export default ImagesPage;
