import React from 'react';
import s from './Header.module.scss'


const Header = () => {
    return (
        <div>
            <span
                onClick={() =>window.scroll(0,0)}
                className={s.header}>Movies Hub</span>
        </div>
    );
};

export default Header;
