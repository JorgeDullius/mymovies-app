import React, { Component } from 'react';
import mymoviesApi from '../../services/api';
import Navbar from '../../components/Navbar'
import { toast  } from 'react-toastify';

import './styles.css';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            newProfile:"",
            profiles:[],
        }
    }
    componentDidMount = async () => {
        try{
            let profiles = await mymoviesApi.post("/profile",{
                userId: localStorage.getItem("userId"),
            })
            profiles = [...profiles.data]
            profiles.push(...this.state.profiles)

            this.setState({profiles: profiles})
            
        }catch(error){
            toast.error(error.response.data.error);
        }
    }
    handleInputChange = async (event) =>{
        const value = event.target.value
        this.setState({newProfile: value});
    }
    handleChangePerfil = (id) =>(
        localStorage.setItem("profileId", id), 
        toast.success("Selecionado")
    )
    handleSubmit = async () =>{
        try{
            const {data} = await mymoviesApi.put(`/profile`,{
                profileName:this.state.newProfile
            });         
            localStorage.setItem("profileId", data.id)
            toast.success("Adicionado com sucesso! Atualize para visualizar.");
        }catch(error){
            toast.error(error.response.data.error);
        }
    }
    render() {
        return(
            <>
                <Navbar page="Profile"/>
                <div style={{ width:"100%", display:"flex",alignItems:"center", flexDirection:"column" }}>
                    Adicionar perfil: 
                    <input className="search__input" value = {this.state.newProfile} type="text" onChange={this.handleInputChange} />
                    <button className="button" onClick={this.handleSubmit}>Salvar</button>
                    <div style={{height:"100%", display:"flex", flexDirection:"row", flexWrap:"wrap", maxWidth:"90%"}}>
                        {this.state.profiles.map((item, index)=>(
                            <div className="perfil__container">
                                <h4> {item.name} </h4>
                                <button className="button" onClick={() => this.handleChangePerfil(item.id)}>
                                    Selecionar perfil
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    }
}
