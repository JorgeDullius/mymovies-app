import React, { Component } from 'react';
import './styles.css';
import loginImage from '../../assets/Login.svg';
import loginMobileImage from '../../assets/mobile_login.svg'
import api from '../../services/api';
import  { login } from '../../services/auth';
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { ToastContainer, toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import { Link } from "react-router-dom";

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = { 
            name:{ value:'', error:'', touched:false }, 
            password:{ value:'', error:'', touched:false }, 
            email:{ value:'', error:'', touched:false },
            birthDate:{ value:'', error:'', touched:false },
            formIsValid: false
        }
    }
    
    componentDidUpdate(){
        if( this.validate(this.state.name.value, "name") === "" && this.validate(this.state.password.value, "password") === "" && this.validate(this.state.email.value, "email") === "" && this.validate(this.state.birthDate.value, "birthDate") === ""){
            if(this.state.formIsValid !== true){
                this.setState({ formIsValid: true })
            }
        }else{
            if(this.state.formIsValid !== false){
                this.setState({ formIsValid: false })
            }
        }       
    }
    validate = (fieldValue, fieldName) => {
        if(fieldValue.trim() === ''){
            return "Este campo é obrigatório";
        }
        if (fieldName === "password" && fieldValue.length < 6){
            return "Sua senha deve ter mais de 6 caracteres";
        }
        if (fieldName === "email" && ! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( fieldValue )){
            return "Por favor informe um email válido";
        }
        
        return "";        
    }
    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let newState = {
            value:value,
            touched:this.state[name].touched
        };
        newState.error = this.validate(value, name);
        this.setState(
            (prevState)=>{
                return {
                    ...prevState,
                    [name]:{...newState}
                };
            }
        )
    }
    handleOnBlur = (event) => {
        const name = event.target.name;
        this.setState((prevState) => {
            return {
                ...prevState,
                [name]:{
                    ...prevState[name],
                    touched:true
                }
            }
        });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        let { name, password, email, birthDate} = this.state;
        name = name.value;
        password = password.value;
        email = email.value;
        birthDate = birthDate.value;
        if(this.state.formIsValid){
            try{
                const response = await api.post('/auth/register', {
                    name,
                    password,
                    email,
                    birthDate
                });
                const profileId = response.data.profileData.id
                login(response.data.token, profileId);
                this.props.history.push("/home");
            }catch(error){
                toast.error(error.response.data.error);
            }
        }
    }
    render() {
        return(     
            <>
                <div className="topBarContainer">
                    <ToastContainer 
                        rtl={false} pauseOnVisibilityChange position = "bottom-right" autoClose = {7000} hideProgressBar = {false}
                        closeOnClick = {false} pauseOnHover = {true} draggable = {true} className = "toastifyStyle"
                    />
                </div>
                <section className="container">
                    <div className='login'>
                        <div>
                            <img id="loginDesktopImage" src={loginImage} alt=""/>
                            <img id="loginMobileImage" src={loginMobileImage} alt=""/>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            {[{"name":"name", "type":"text"}, {"name":"password", "type":"password"}, {"name":"email", "type":"text"}, {"name":"birthDate", "type":"date"}].map(element => 
                                <label id="labelForm">
                                    {element.name}:
                                    <input className = "input__signup" type={element.type} value = {this.state[element.name].value} placeholder={element.name} name={element.name} onChange={this.handleInputChange} onBlur={this.handleOnBlur} />
                                    <span className={this.state[element.name].error !== '' && this.state[element.name].touched === true ? "negativeFeedback" : "positiveFeedback"}>
                                        <FontAwesomeIcon icon={faExclamationCircle} />
                                        {this.state[element.name].error}
                                    </span>
                                </label>
                            )}
                            <button disabled = {!this.state.formIsValid}> 
                                <span>Cadastrar</span>
                            </button>
                            <Link to="/signin">Já tem conta? Clique aqui para acessar</Link>
                        </form>
                    </div>
                </section>
            </>
        );
   }
}
export default withRouter(Signup)