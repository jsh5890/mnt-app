import React, {useEffect, useState} from 'react';
import {API_KEY, API_URL, IMAGE_BASE_URL} from "../../Config";
import MainImage from "../commons/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import {Button, Row} from "antd";
import Favorite from "./Sections/Favorite";

const MovieDetail = (props) => {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
        // console.log(movieId)
        fetch(endpointInfo)
            .then(res => res.json())
            .then(res => {
                res.image = `${IMAGE_BASE_URL}w1280`+res.backdrop_path
                console.log(res)
                // setMovie(null)
                setMovie(res)
            })

        fetch(endpointCrew)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                setCasts(res.cast)
            })
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {/* Header */}
            {/*{!LoadingForMovie ?*/}
                <MainImage
                    image={Movie.image}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            {/*    :*/}
            {/*    <div>loading...</div>*/}
            {/*}*/}


            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>


                {/* Movie Info */}
                {/*{!LoadingForMovie ?*/}
                    <MovieInfo movie={Movie} />
                {/*    :*/}
                {/*    <div>loading...</div>*/}
                {/*}*/}

                <br />
                {/* Actors Grid*/}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>Toggle Actor View </Button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            //!LoadingForCasts ?
                                Casts.map((cast, index) => (
                                    cast.profile_path &&
                                    <GridCards
                                        image={cast.profile_path ?
                                            `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                        characterName={cast.name}
                                    />))
                                // :<div>loading...</div>
                        }
                    </Row>
                }
                <br />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/*    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />*/}
                </div>

                {/* Comments */}
                {/*<Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />*/}

            </div>
        </div>
    );
}

export default MovieDetail;