import React, {useEffect, useState} from 'react';
import axios from "axios";
import './favorite.css'
import {Button, Popover} from "antd";
import favorite from "../MovieDetail/Sections/Favorite";
import {IMAGE_BASE_URL} from "../../Config";

const FavoritePage = () => {
    const [Favorites, setFavorites] = useState([])
    useEffect(() => {

        fetchFavoredMovie()

    },[])

    const fetchFavoredMovie = () => {
        axios.post('/api/favorite/getFavoredMovie', {userFrom: localStorage.getItem('userId')})
            .then(res => {
                if (res.data.success) {
                    setFavorites(res.data.favorites)
                } else {
                    alert('영화 정보를 가져오는데 실패 했습니다.')
                }
            })
    }
    const favoriteDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }
        axios.post('/api/favorite/removeFromFavorite', variables)
            .then(res => {
                if (res.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert('리스트에서 지우는데 실패 했습니다.')
                }
            })
    }

    const renderCards = Favorites.map((favorite, index) => {
        const content = (
            <div>
                {favorite.moviePost ? <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "No Image"}
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime}</td>
            <td><Button onClick={() => favoriteDelete(favorite.movieId, favorite.userFrom)}>제거</Button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> Favorite Movies </h2>
            <hr />

            <table>
                <thead>
                <tr>
                    <th>Movie Title</th>
                    <th>Movie RunTime</th>
                    <td>Remove from favorites</td>
                </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    );
}

export default FavoritePage;