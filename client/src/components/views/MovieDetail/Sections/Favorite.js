import React, {useEffect} from 'react';
import axios from "axios";

const Favorite = (props) => {
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runTime

    useEffect(() => {
        let variables = {
            userFrom,
            movieId
        }
        axios.post('/api/favorite/favoriteNumber', variables)
            .then(res => {
                if(res.data.success) {
                    console.log(res)
                } else {
                    alert('숫자 정보를 가져오는데 실패 하였습니다.')
                }
            })
    },[])

    return (
        <div>
            <button>Favorite</button>
        </div>
    );
}

export default Favorite;