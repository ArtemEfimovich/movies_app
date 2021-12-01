import React, {useState} from 'react';
import s from "./Search.module.scss";
import {TextField} from "@material-ui/core";
import {ThemeProvider} from "@mui/styles";
import { createTheme } from '@mui/material/styles';
import {red} from "@mui/material/colors";


const Search = () => {

    const [type,setType]=useState(0)


    const theme = createTheme({
        palette: {
            mode:'light',
            primary: {
                main: '#fff',
            },
            secondary: {
                main: '#fff',
            },
        },
    });


    return (
        <div>
            <ThemeProvider theme={theme}>
                <TextField
                    style={{flex:1}}
                    className={s.searchBox}
                    label='Search'
                    variant = 'filled'
                    /*onChange={(e)=> setSearchText(e.target.value)}*/
                />
            </ThemeProvider>

        </div>
    );
};

export default Search;
