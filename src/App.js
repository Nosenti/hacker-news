import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {list:[]};
  }

  componentDidMount(){
    axios.get('https://hn.algolia.com/api/v1/search?tags=front_page')
  .then( response => {
    this.setState({
      list:response.data.hits,
    })
    console.log(response.data.hits);
  })
  .catch(function (error) {
    console.log(error);
  });
  }




  render() {
    return (
      <div className="App">
        <h1>HACKER NEWS!!!</h1>
        <ul>
      {
        this.state.list.map((list_item) =>
        <div>
          <li>{list_item.author}</li>
            <a href=''>{list_item.url}</a>
            </div>
        )
      }
        </ul>
      </div>
    );
  }
}

export default App;
