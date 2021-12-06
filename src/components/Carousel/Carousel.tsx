import axios from "axios";
import React, {useEffect, useState} from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {img_300, noPicture} from "../../config/config";
import s from "./Carousel.module.scss";


type CarouselType = {
    id: number
    media_type: string
}


type ResponseType = {
    id: number
    cast: CastType[]
    crew: CrewType[]
}

type CastType = {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number
}

type CrewType = {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    credit_id: string,
    department: string,
    job: string
}


const Carousel = ({id, media_type}: CarouselType) => {
    const [credits, setCredits] = useState<CastType[]>([]);
    const handleDragStart = (event: any) => event.preventDefault();


    const items = credits.map((c) => (
        <div className={s.carouselItem}>
            <img
                src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                alt={c?.name}
                onDragStart={handleDragStart}
                className={s.carouselItem__img}
            />
            <b className={s.carouselItem__txt}>{c?.name}</b>
        </div>
    ));

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    };

    const fetchCredits = async () => {
        const {data} = await axios.get<ResponseType>(
            `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setCredits(data.cast);
    };

    useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
    }, []);

    return (
        <div style={{padding: 20}}>
            <AliceCarousel
                mouseTracking
                infinite
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay
            />
        </div>
    );
};

export default Carousel;