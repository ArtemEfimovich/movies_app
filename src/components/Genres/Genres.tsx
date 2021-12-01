import React, { useEffect } from 'react';
import axios from "axios";
import {Chip} from "@material-ui/core";



type ResponseType= {
    genres: GenreType[]
}

export type GenreType ={
    id: number
    name:string
}

type GenresType = {
    type: string
    selectedGenres:GenreType[]
    genres: GenreType[]
    setGenres: (genres:any) => void
    setSelectedGenres: (selectedGenres:any) => void
    setPage: (page:any) => void
}


const Genres = ({
                    selectedGenres,
                    genres,
                    setGenres,
                    setSelectedGenres,
                    setPage,
                    type
                }: GenresType) => {


    const handleAdd =(genre:any)=>{
        setSelectedGenres([...selectedGenres,genre])
        setGenres(genres.filter((g)=> g.id !== genre.id))
    }

    const handleDelete =(genre:any)=>{
        setSelectedGenres(selectedGenres.filter((selected)=> selected.id !== genre.id))
        setGenres([...genres,genre])
        setPage(1)
    }

    const fetchGenres = async () =>{
      const {data} = await  axios.get<ResponseType>(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )

        setGenres(data.genres)
    }


    useEffect(()=>{
        fetchGenres()

        return () =>{
            setGenres({})
        }
        // eslint-disable-next-line
    },[])


    return (
        <div  style={{padding:'6px 0'}}>
            {selectedGenres && selectedGenres.map((genre)=>{
                return(
                    <Chip key={genre.id}
                          label={genre.name}
                          style={{margin:4}}
                          size='small'
                          color='primary'
                          clickable
                    onDelete={()=>handleDelete(genre)}
                    />
                )

            })}
            {genres && genres.map((genre)=>{
                return(
                    <Chip key={genre.id}
                          label={genre.name}
                          style={{margin:4}}
                          size='small'
                          onClick={()=>handleAdd(genre)}
                          clickable/>
                    )

            })}
        </div>
    );
};

export default Genres;