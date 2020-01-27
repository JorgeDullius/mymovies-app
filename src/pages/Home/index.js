import React, { Component } from 'react';
import api, { themoviedbapi } from '../../services/api';
import Card from '../../components/Card'
import Navbar from '../../components/Navbar'
import { toast  } from 'react-toastify';

import './styles.css';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            query:'',
            movies:[],
        }
    }
    timer = null

    componentDidUpdate = async () => {
        if(this.state.query !== ''){
            try{
                clearTimeout(this.timer);
                this.timer = setTimeout(async () => {
                    const { data } = await themoviedbapi.get(`search/movie?language=pt-BR&include_adult=true&page=1&query=${this.state.query}`);
                    var newMovies = data.results 
                    let diferent = false
                    for(var i = 0; i < newMovies.length; i++){
                        if(JSON.stringify(this.state.movies[i]) !== JSON.stringify(newMovies[i])){
                            diferent = true
                        }
                    }
                    if(diferent === true){                        
                        this.setState({movies: newMovies})
                    }
                }, 200)
            }catch(error){
                toast.error(error.response.data.error);
            }
        }else{
            if(this.state.movies != ''){
                this.setState({movies: []})
            }
        }
    }
    handleInputChange = async (event) =>{
        const value = event.target.value
        this.setState({query: value});
    }
    handleSubmit = async (event) =>{
        try{
            const data = await api.put(`/watchlist`,{
                id:event.currentTarget.id,
                profileId:localStorage.getItem("profileId")
            });         
            toast.success("Adicionado com sucesso!");
        }catch(error){
            toast.error(error.response.data.error);
        }
    }
    render() {
        return(
            <>
                <Navbar page="Home"/>
                <div style={{ width:"100%", display:"flex",alignItems:"center", flexDirection:"column" }}>
                    <input className="search__input" value = {this.state.query} type="text" onChange={this.handleInputChange} />
                    <div style={{height:"100%", display:"flex", flexDirection:"row", flexWrap:"wrap", maxWidth:"90%"}}>
                        {this.state.movies.map((item)=>(
                            <Card key = {item.id} title={item.title} id={item.id} buttonText="Adicionar à watchlist" poster_src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} onButtonClick={this.handleSubmit}/>
                        ))}
                    </div>
                </div>
            </>
        )
    }
}
