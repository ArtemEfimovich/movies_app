import React, {useEffect, useState} from 'react';
import s from "./Search.module.scss";
import {Button, Tab, Tabs, TextField, ThemeProvider} from "@material-ui/core";
import {createTheme} from '@mui/material/styles';
import SearchIcon from '@material-ui/icons/Search'
import axios from "axios";
import {CardResponseDataType, ResponseType} from "../Trending/Trending";
import CardContent from "../../components/CardContent/CardContent";
import Paginator from "../../components/Pagination/Paginator";


export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#fff',
        },
    },
});


const Search = () => {

    const [type, setType] = useState(0)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState<string >("")
    const [content, setContent] = useState<CardResponseDataType[]>([])
    const [total_pages, setTotal_pages] = useState(0)


    const fetchSearch = async () => {
        try {
            const {data} = await axios.get<ResponseType>(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );

             setContent(data.results);
            setTotal_pages(data.total_pages);


        } catch (error) {
            console.error(error);
        }
    }



      useEffect(() => {
            window.scrollTo(0, 0);
            fetchSearch()
        }, [type,page])




    return (
        <div>
            <ThemeProvider theme={theme}>
                <TextField
                    style={{flex: 1,width:'90%'}}
                    className={s.searchBox}
                    label='Search'
                    variant='filled'
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant='contained' style={{marginLeft: 10, height: 55}}
                    onClick ={fetchSearch}
                >
                    <SearchIcon/>
                </Button>
                <Tabs value={type}
                      indicatorColor='primary'
                      textColor='primary'
                      style={{paddingBottom: 5}}
                      onChange={(event, newValue) => {
                          setType(newValue)
                          setPage(1)
                      }}
                >
                    <Tab style={{width: '50%'}} label='Search Movies'/>
                    <Tab style={{width: '50%'}} label='Search TV Series'/>
                </Tabs>
            </ThemeProvider>
            <div className={s.wrapper}>
                {content && content.map((c) => {
                    return (
                        <CardContent key={c.id} id={c.id}
                                     media_type={type ? 'tv' : 'movie'}
                                     poster={c.poster_path}
                                     date={c.release_date}
                                     title={c.title|| c.name}
                                     vote_average={c.vote_average}

                        />
                    )
                })}
                {searchText &&
                !content &&
                (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {total_pages > 1 && <Paginator setPage={setPage} numOfPages={total_pages}/>}
        </div>
    );
};

export default Search;
