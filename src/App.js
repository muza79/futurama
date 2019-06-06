import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CharacterComponent from './character-component';
import QuotesModal from './quotes-modal';

const charactersArray = ["Bender", "Fry", "Leela", "Mom", "Zapp-Brannigan", "Hermes", "Dr-Zoidberg", "Bob-Barker", "Morgan-Proctor", "Kif"];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      quotes: []
    }
  }
  handleRenderCharactersComponents = () => {
    return (
        charactersArray.map((character) => {
            return (
                <CharacterComponent
                    handleGetQuotes={this.handleGetQuotes}
                    name={character}
                    key={character}
                />
            )
        })
    )
}
handleGetQuotes = (name) => {
  axios.get(`https://futuramaapi.herokuapp.com/api/characters/${name}/5`)
  .then((response) => {
    // eslint-disable-next-line
    response.data.map((item) => {
      this.setState({quotes: [...this.state.quotes, item.quote]});
    });
    this.handleModalToggle();
  })
  .catch((error) => {
    alert(error)
  });
}
handleClearQuotes = () => {
  !this.state.modalOpen && this.setState({quotes: []});
}
handleModalToggle = () => {
  this.setState({modalOpen: !this.state.modalOpen}, () => {
    this.handleClearQuotes();
  });
}
  render() {
    return(
      <section className="app">
          <QuotesModal
              modalOpen={this.state.modalOpen}
              handleModalToggle={this.handleModalToggle}
              quotes={this.state.quotes}
          />
          <h1 className="app-header">Futurama quotes</h1>
          {this.handleRenderCharactersComponents()}
      </section>
  );
  }
}
