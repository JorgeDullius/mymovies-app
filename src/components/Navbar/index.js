import React from 'react';
import { Link } from "react-router-dom";
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import './styles.css';

export default function Navbar() {
  return (
    <div className="header__container">
        <ToastContainer 
          rtl={false} pauseOnVisibilityChange position = "bottom-right" autoClose = {7000} hideProgressBar = {false}
          closeOnClick = {false} pauseOnHover = {true} draggable = {true} className = "toastifyStyle"
        />
        <div className="navbar__container">
            <Link className = "nav__button" to="./watchlist">
                Ver watchlist
            </Link>
            <button className = "nav__button">Ver meus perfis</button>
        </div>
    </div>
  );
}

