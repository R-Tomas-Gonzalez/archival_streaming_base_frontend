import {useEffect, useState} from 'react';
import axios from 'axios';

const pixAPI = process.env.REACT_APP_PIX_KEY

export default function useImageLoad(pageNumber) {

    useEffect(() => {
        setLoading(true)
        setError(false)
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(false)
        const [image, setImages] = useState([])
        const [hasMore, setHasMore] = useState(false)

        axios({
            method: 'GET',
            url: `https://pixabay.com/api/?key=${pixAPI}&orientation=horizontal&image_type=photo`,
            params: { page: pageNumber}
        }).then(resp => {console.log(resp)})
    }, [pageNumber])
    return null
}