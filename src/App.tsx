import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav/MainNav";
import Movies from "./pages/Movies/Movies";
import Trending from "./pages/Trending/Trending";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
import {Route, Routes} from 'react-router-dom';
import { Container } from '@material-ui/core';


function App() {
    return (
        <>
            <Header/>
            <div className="App">
                <Container>
                    <Routes>
                        <Route path={"/"} element={<Trending/>}/>
                        <Route path={"/movies"} element={<Movies/>}/>
                        <Route path={"/series"} element={<Series/>}/>
                        <Route path={"/search"} element={<Search/>}/>
                    </Routes>
                </Container>
            </div>
            <SimpleBottomNavigation/>
        </>

    );
}

export default App;
