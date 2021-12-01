import {GenreType} from "../components/Genres/Genres";

export const useGenres =(selectedGenres:GenreType[])=>{
    if(selectedGenres.length < 1)return ''

    const GenreIds = selectedGenres.map((g)=> g.id)
    // @ts-ignore
    return GenreIds.reduce((acc, curr)=> acc + ',' + curr)


}