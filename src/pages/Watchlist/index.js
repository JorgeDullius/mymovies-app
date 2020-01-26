import React, { Component } from 'react';
import mymoviesApi, { themoviedbapi } from '../../services/api';
import Card from '../../components/Card'
import Navbar from '../../components/Navbar'
import './styles.css';
import {  toast  } from 'react-toastify';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies:[],
            watched:[]
        }
    }
    componentDidMount = async () => {
        try{
            const watchlist = await mymoviesApi.post("/watchlist",{
                profileId: localStorage.getItem("profileId")
            })
            const {movies, watched } = watchlist.data
            if(watched != [null]){
                this.setState({watched: await Promise.all(watched.map(async (movie)=>{
                    try{
                        var {data} = await themoviedbapi.get(`https://api.themoviedb.org/3/movie/${movie}?api_key=090e5a604d43f025fd717485e09d6186&language=pt-BR`)
                    }catch(error){
                        throw new Error(error);
                    }
                    return data;
                }))})
            }
            if(movies != [null]){
                this.setState({movies: await Promise.all(movies.map(async (movie)=>{
                    try{
                        var {data} = await themoviedbapi.get(`https://api.themoviedb.org/3/movie/${movie}?api_key=090e5a604d43f025fd717485e09d6186&language=pt-BR`)
                    }catch(error){
                        throw new Error(error);
                    }
                    return data;
                }))})
            }

            
        }catch(error){
            toast.error(error.response.data.error);
        }
    }
    handleSubmit = async (event) =>{
        try{
            const data = await mymoviesApi.put(`/watchedlist`,{
                id:event.currentTarget.id,
                profileId:localStorage.getItem("profileId")
            });      
            toast.success("Adicionado com sucesso!")  
        }catch(error){
            toast.error(error.response.data.error);
        }
    }
    render() {
        return(
            <>
                <Navbar />
                <div className="watchlist__container">
                    <h1> Para assistir: </h1>
                    <div style={{ width:"100%", display:"flex",alignItems:"center", flexDirection:"column" }}>
                        <div style={{height:"100%", display:"flex", flexDirection:"row", flexWrap:"wrap", maxWidth:"90%"}}>
                            {this.state.movies.map((item)=>(
                                <Card  title={item.title} id={item.id} buttonText="Adicionar aos assistidos" poster_src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} onButtonClick={this.handleSubmit}/>
                            ))}
                        </div>
                    </div>
                    <h1> Assistidos: </h1>
                    <div style={{ width:"100%", display:"flex",alignItems:"center", flexDirection:"column" }}>
                        <div style={{height:"100%", display:"flex", flexDirection:"row", flexWrap:"wrap", maxWidth:"90%"}}>
                            {this.state.watched.map((item)=>(
                                <Card  title={item.title} id={item.id} poster_src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} onButtonClick={this.handleSubmit}/>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
