import React, {useEffect, useState} from 'react';
import s from './Trending.module.scss'
import axios from "axios";
import CardContent from "../../components/CardContent/CardContent";
import Paginator from '../../components/Pagination/Paginator';

export type ResponseType = {
    page: number,
    results: CardResponseDataType[],
    total_pages: number,
    total_results: number
}


export type CardResponseDataType = {
    tagline: string
    name:string
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    media_type: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    first_air_date:string
}


const Trending = () => {

    const [content, setContent] = useState<CardResponseDataType[]>()
    const [page,setPage] = useState(1)
    const [total_pages,setTotalPages] = useState(0)

    const fetchTrending = async () => {

        const {data} = await axios.get<ResponseType>(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        )
        setContent(data.results)
        setTotalPages(data.total_pages)


    }

    useEffect(() => {
        fetchTrending()
        // eslint-disable-next-line
    }, [page])


    return (
        <div className={s.container}>
            <span className={s.title}>Trending</span>
            <div className={s.wrapper}>
                {content && content.map((c) => {
                    return (
                        <CardContent key={c.id} id={c.id}
                                     media_type={c.media_type}
                                     poster={c.poster_path}
                                    date={c.release_date || c.first_air_date }
                                     title={c.title || c.name}
                                     vote_average={c.vote_average}


                        />
                    )
                })}
            </div>
            <Paginator setPage={setPage} numOfPages={total_pages}/>
        </div>
    );
};

export default Trending;