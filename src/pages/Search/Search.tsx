import React, {useState} from 'react';
import s from "./Search.module.scss";
import {TextField, ThemeProvider} from "@material-ui/core";
import {createTheme} from '@mui/material/styles';


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


    return (
        <div>
            <ThemeProvider theme={theme}>
                <TextField
                    style={{flex: 1}}
                    className={s.searchBox}
                    label='Search'
                    variant='filled'
                    /*onChange={(e)=> setSearchText(e.target.value)}*/
                />
            </ThemeProvider>

        </div>
    );
};

export default Search;
