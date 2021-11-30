import React from "react";
import {img_300, unavailable} from "../../config/config";
import s from "./CardContent.module.scss"
import {Badge} from "@material-ui/core";


type CardContentType = {
    id: number
    media_type: string
    poster: string
    date: string
    title: string
    vote_average: number
}


const CardContent = ({
                         id,
                         media_type,
                         poster,
                         date,
                         title,
                         vote_average,
                     }: CardContentType) => {
    return (
        <div className={s.media}>
            <Badge badgeContent={vote_average} color={vote_average> 6 ? "primary" : "secondary"} />
            <img className={s.poster} src={poster ? `${img_300}/${poster}` : unavailable} alt={title}/>
            <div className={s.title}>{title}</div>
            <div className={s.subTitle}>
                <div>{media_type === 'tv' ? 'TV series' : 'Movie'}</div>
                <div>{date}</div>
            </div>

        </div>
    );
};

export default CardContent;