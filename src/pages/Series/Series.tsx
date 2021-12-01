import React, {useEffect, useState} from 'react';
import s from './Series.module.scss'
import {CardResponseDataType, ResponseType} from "../Trending/Trending";
import axios from "axios";
import CardContent from "../../components/CardContent/CardContent";
import Paginator from "../../components/Pagination/Paginator";
import {useGenres} from "../../hooks/useGenre";
import Genres from "../../components/Genres/Genres";

const Series = () => {
    const [content, setContent] = useState<CardResponseDataType[]>()
    const [page, setPage] = useState(1)
    const [total_pages, setTotalPages] = useState(0)
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL = useGenres(selectedGenres)

    const fetchSeries = async () => {

        const {data} = await axios.get<ResponseType>(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL} `
        )
        setContent(data.results)
        setTotalPages(data.total_pages)


    }

    useEffect(() => {
        fetchSeries()
        // eslint-disable-next-line
    }, [page, genreforURL])


    return (
        <div className={s.container}>
            <span className={s.title}>Series</span>
            <Genres type="tv"
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
                                     media_type={'tv'}
                                     poster={c.poster_path}
                                     date={c.release_date || c.first_air_date}
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

export default Series;