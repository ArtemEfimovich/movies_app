import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box} from '@mui/system';
import s from "../CardContent/CardContent.module.scss"
import st from "./ContentModal.module.scss"
import ModalUnstyled from '@mui/base/ModalUnstyled';
import shadows from "@mui/material/styles/shadows";
import axios from "axios";
import {img_500, unavailable, unavailableLandscape} from "../../config/config";
import {Button} from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import {styled} from "@mui/material";
import {CardResponseDataType} from "../../pages/Trending/Trending";
import Carousel from "../Carousel/Carousel";


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    height: '66%',
    width: '90%',
    bgcolor: '#39445a',
    border: '1px solid white',
    borderRadius: 5,
    boxShadow: shadows[5],
    color: 'white',
    p: 1,
    px: 1,
    pb: 3,
};


export const ContentModal = ({children, media_type, id}: any) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<CardResponseDataType>();
    const [video, setVideo] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const fetchData = async () => {
        const {data} = await axios.get<CardResponseDataType>(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setContent(data);
    };

    const fetchVideo = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);


    return (
        <div>
            <div
                style={{cursor: "pointer"}}
                className={s.media}
                onClick={handleOpen}>
                {children}
            </div>
            <StyledModal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
                onClose={handleClose}
                BackdropComponent={Backdrop}

            >
                <Box sx={style}>
                    {content && (
                        <div>
                            <div className={st.ContentModal}>
                                <img
                                    src={
                                        content.poster_path
                                            ? `${img_500}/${content.poster_path}`
                                            : unavailable
                                    }
                                    alt={content.name || content.title}
                                    className={st.ContentModal__portrait}
                                />
                                <img
                                    src={
                                        content.backdrop_path
                                            ? `${img_500}/${content.backdrop_path}`
                                            : unavailableLandscape
                                    }
                                    alt={content.name || content.title}
                                    className={st.ContentModal__landscape}
                                />
                                <div className={st.ContentModal__about}>
                  <span className={st.ContentModal__title}>
                    {content.name || content.title} (
                      {(
                          content.first_air_date ||
                          content.release_date ||
                          "-----"
                      ).substring(0, 4)}
                      )
                  </span>
                                    {content.tagline && (
                                        <i className={st.tagline}>{content.tagline}</i>
                                    )}

                                    <span className={st.ContentModal__description}>
                    {content.overview}
                  </span>

                                    <div>
                                        <Carousel id={id} media_type={media_type}/>
                                    </div>

                                    <Button
                                        style ={{paddingTop: 10}}
                                        variant="contained"
                                        startIcon={<YouTubeIcon/>}
                                        color="secondary"
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                        Watch the Trailer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Box>
            </StyledModal>
        </div>
    );
}