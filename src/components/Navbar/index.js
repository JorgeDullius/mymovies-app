import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer  } from 'react-toastify';
import  { logout } from '../../services/auth';
import 'react-toastify/dist/ReactToastify.min.css'
import './styles.css';

class Navbar extends Component{
  handleLogout = () => {
    logout()
    this.props.history.push("/")
  }
  render(){
    return (
      <div className="header__container">
        <ToastContainer 
          rtl={false} pauseOnVisibilityChange position = "bottom-right" autoClose = {7000} hideProgressBar = {false}
          closeOnClick = {false} pauseOnHover = {true} draggable = {true} className = "toastifyStyle"
        />
        {this.props.page !== "Profile" ? 
          <div className="navbar__container">
            <Link className = "nav__button" to="./home">
              Início
            </Link>
            <Link className = "nav__button" to="./watchlist">
              Ver watchlist
            </Link>
            <button className = "nav__button" onClick={()=>this.props.history.push("/profile")}>Ver meus perfis</button>
            <button className = "nav__button" onClick={this.handleLogout}> Sair </button>

          </div>
        :
          <div className="navbar__container">
            <Link className = "nav__button" to="./home">
              Início
            </Link>
            <Link className = "nav__button" to="./watchlist">
              Ver watchlist
            </Link>
            <button className = "nav__button" onClick={this.handleLogout}> Sair </button>

          </div>
        }
      </div>
    );
  }
}
export default withRouter(Navbar)