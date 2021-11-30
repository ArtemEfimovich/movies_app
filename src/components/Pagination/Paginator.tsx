import React, { ChangeEvent } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Pagination from '@mui/material/Pagination';

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
    },
});

type PaginatorType = {
    setPage:( page: number)=>void
    numOfPages:number |10
}

export default function Paginator({ setPage, numOfPages = 10 }:PaginatorType) {


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scroll(0, 0);
    };

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
            }}
        >
            <ThemeProvider theme={darkTheme}>
                <Pagination
                    onChange={handlePageChange}
                    count={numOfPages}
                    color="primary"
                    hideNextButton
                    hidePrevButton
                />
            </ThemeProvider>
        </div>
    );
}