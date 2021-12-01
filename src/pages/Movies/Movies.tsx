import React, {useEffect, useState} from 'react';
import s from "./Movies.module.scss";
import CardContent from "../../components/CardContent/CardContent";
import Paginator from "../../components/Pagination/Paginator";
import axios from "axios";
import {CardResponseDataType, ResponseType} from "../Trending/Trending";
import Genres from "../../components/Genres/Genres";
import {useGenres} from "../../hooks/useGenre";

const Movies = () => {

    const [content, setContent] = useState<CardResponseDataType[]>()
    const [page, setPage] = useState(1)
    const [total_pages, setTotalPages] = useState(0)
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL = useGenres(selectedGenres)

    const fetchMovies = async () => {

        const {data} = await axios.get<ResponseType>(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL} `
        )
        setContent(data.results)
        setTotalPages(data.total_pages)


    }

    useEffect(() => {
        fetchMovies()
        // eslint-disable-next-line
    }, [page,genreforURL])


    return (
        <div className={s.container}>
            <span className={s.title}>Movies</span>
            <Genres type = "movie"
                selectedGenres={selectedGenres}
                    genres={genres}
                    setGenres={setGenres}
                    setSelectedGenres={setSelectedGenres}
                    setPage={setPage}
            />
            <div className={s.wrapper}>
                {content && content.map((c) => {
                    return (
                        <CardContent key={c.id} id={c.id}
                                     media_type={c.media_type}
                                     poster={c.poster_path}
                                     date={c.release_date}
                                     title={c.title}
                                     vote_average={c.vote_average}

                        />
                    )
                })}
            </div>
            {total_pages > 1 && <Paginator setPage={setPage} numOfPages={total_pages}/>}
        </div>
    );
};

export default Movies;