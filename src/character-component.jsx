import React, { Component } from 'react';
import './character-component.css';
import axios from 'axios';
import planetExpress from './planet-express.png';


export default class CharacterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            quote: "",
            image: planetExpress
        }
    }
    componentDidMount() {
        axios.get(`https://futuramaapi.herokuapp.com/api/characters/${this.props.name}/1`)
        .then((response) => {
            const characterInfo = response.data[0];
            this.setState({name: characterInfo.character, quote: characterInfo.quote, image: characterInfo.image});
        })
        .catch((error) => {
          alert(error)
        });
    }
    handleOnClick = () => {
        this.props.handleGetQuotes(this.props.name);        
    }
    render() {        
        return (
            <section className="character-container" onClick={this.handleOnClick}>
                <div className="character-picture-container">
                    <img className="character-picture" src={this.state.image} alt=""/>
                </div>
                <div className="character-name">
                    <p>{this.state.name}</p>
                </div>
                <div className="character-quote">
                    <p>{this.state.quote}</p>
                    <p className="character-click-more">Click to see more</p>
                </div>
            </section>
        );
    }
}