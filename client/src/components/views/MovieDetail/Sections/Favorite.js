import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button} from "antd";

const Favorite = (props) => {
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variables)
            .then(res => {
                if(res.data.success) {
                    // console.log(res)
                    setFavoriteNumber(res.data.favoriteNumber)
                } else {
                    alert('숫자 정보를 가져오는데 실패 하였습니다.')
                }
            })

        axios.post('/api/favorite/favorited', variables)
            .then(res => {
                if(res.data.success) {
                    // console.log(res)
                    setFavorited(res.data.favorited)
                } else {
                    alert('정보를 가져오는데 실패 하였습니다.')
                }
            })
    },[])

    const favoriteChenk = () => {
        if (Favorited) {
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(res => {
                    if (res.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 지우지 못했습니다.')
                    }
                })
        } else {
            axios.post('/api/favorite/addToFavorite', variables)
                .then(res => {
                    if (res.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 추가하지 못했습니다.')
                    }
                })
        }
    }

    return (
        <div>
            <Button onClick={favoriteChenk}> {Favorited ? " Not Favorite ": "Add to Favorite "} {FavoriteNumber}</Button>
        </div>
    );
}

export default Favorite;