import React, { Component } from 'react'
import './App.css'
import axios from 'axios';
export default class App extends Component {
  constructor(){
    super();
    this.state={
       newsTitle:[],
       newsLink:[],
       image:[],
       show:[]
    }
}
  componentDidMount(){
    this.sendRequest();
  }
  sendRequest(){
    axios.get(`http://localhost:4000/data`).then(
            (response)=>{
                //this.makeTable(response.data.data,response.data.uName,response.data.info);
                this.setState({
                   newsTitle:response.data.newsBody,
                   newsLink:response.data.newsLink,
                   image:response.data.imageLink,
                });
               // alert(this.state.newsTitle.length+' '+this.state.newsLink.length+' '+this.state.image)
               let temp = [];
                for(let i=0;i<this.state.newsLink.length;i++){
                  temp.push(<div className="news-sec">
                       <img src={this.state.image[i]} alt="news pic"/>
                       <a href={this.state.newsLink[i]}>{this.state.newsTitle[i]}</a>
                  </div>)
                }
                this.setState({
                  show:temp
                })
                temp=[];

            }
        ).catch(
            (error)=>{
                alert('Try again '+error);
            }
        );
  }
  render() {
    return (
      <div className="main-body">
          {this.state.show}
      </div>
    )
  }
}
