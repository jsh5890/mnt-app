import React, {useEffect, useState} from 'react'
//import { FaCode } from "react-icons/fa";
import {API_KEY, API_URL, IMAGE_BASE_URL} from "../../Config";
import MainImage from "../commons/MainImage";
import GridCards from "../commons/GridCards";
import {Row} from "antd";
import {useInView} from "react-intersection-observer";

function LandingPage() {
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurPage, setCurPage] = useState(0)
    const [ref, inView] = useInView()

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(res => res.json())
            .then(res=> {
                console.log(res)
                setCurPage(res.page)
                setMovies([...Movies, ...res.results])
                // setMainMovieImage(null)
                if(CurPage === 0) {
                    setMainMovieImage(res.results[0])
                }
            })
    }
    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${CurPage + 1}`;
        fetchMovies(endpoint)
    }

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있으면
        if (inView) {
            loadMoreItems()
        }
    }, [inView])
    
    // useEffect(() => {
    //     // fetchMovies(endpoint)
    //     const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    //     fetchMovies(endpoint)
    //
    // }, []);

    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/* Main Image */}
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>최신 영화</h2>
                <hr />

                 {/*Movie Grid Cards*/}

                <Row gutter={[16, 16]}>

                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}

                </Row>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }} ref={ref}>
                <button onClick={loadMoreItems}> 더보기</button>
            </div>

        </div>
    )
}

export default LandingPage
