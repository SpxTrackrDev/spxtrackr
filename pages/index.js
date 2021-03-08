import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, { Component } from "react"
import Countdown from 'react-countdown';
const axios = require('axios');

 
export default class extends Component {
  state = {
    launches: [],
    showInfo: -1
  }
  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getBooster = this.getLaunchpad(this)
  }
  componentDidMount() {
    this.getData()
  }
  getLaunchpad(launchpad)
  {
    let link = 'https://api.spacexdata.com/v4/launchpads/'
    let pad=''
    console.log(launchpad)
    axios.get(link.concat(launchpad))
      .then(function (response) {
        console.log(link.concat(launchpad))
        console.log(response.data)
        return response.data.serial
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  getData() {
    let that = this
    axios.get('https://api.spacexdata.com/v4/launches/upcoming')
      .then(function (response) {
        console.log(response.data);
        that.setState({ launches: response.data })

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  handleClick(index) {
    if (index === this.state.showInfo)
      index = -1
    this.setState(state => ({ showInfo: index }))
  }
  renderCountdown(dateStart, dateEnd){
    let targetDate = dateEnd.getTime();
    let days, hours, minutes, seconds; 
    let countdown = document.getElementById("demo");
    let count = 0;
    let array = new Array(3);
    let getCountdown = function (c){
        let currentDate = new Date().getTime();
        let secondsLeft = ((targetDate - currentDate) / 1000) - c;
        days = pad( Math.floor( secondsLeft / 86400 ) );
        secondsLeft %= 86400;
        hours = pad( Math.floor( secondsLeft / 3600 ) );
        secondsLeft %= 3600;
        minutes = pad( Math.floor( secondsLeft / 60 ) );
        seconds = pad( Math.floor( secondsLeft % 60 ) );
        array[0] = days;
        array[1] = hours;
        array[2] = minutes;
        return array;
    }
    function pad(n) {
        return (n < 10 ? '0' : '') + n;
    }   
    getCountdown(count++);
    setInterval(function () { getCountdown(count++ ); }, 1000);
  }


  render() {
    return (

      <div className='page'>
        <div className='headerParent'>
          <div className='header'>
            <h1>SpaceX Tracker</h1>
          </div>
        </div>
        <div className='menuParent'>
          <div className='menuButton'>
            <h2>
              <a className='title' href="/posts/nasaPage">
                NASA
              </a>
            </h2>
          </div>
          <div className='menuButton'>
            <h2>
              <a className='title' href="/posts/spxPage">
                SpaceX
              </a>
            </h2>
          </div>
        </div>
        <div className='launch'>
          <h1>Upcoming Launches</h1>
        </div>
        {this.state.launches && this.state.launches.map((value, index) => {
          if (index < 2) {
            // const divStyle = { backgroundImage: 'url(https://wallpaperaccess.com/full/1145374.jpg)' }
            let date = new Date(value.date_local)
            let currentDate =  new Date()
            let launchlink = this.getLaunchpad(value.launchpad)
            //im not entirely sure how to make this better
            
            return (
              <div className='box' key={index} >
                <div className='timer' onClick={() => this.handleClick(index)}>
                <h1>Upcoming Launch: {value.name}</h1> 
                {/* <h2 className='timer'>{this.renderCountdown(currentDate,date)[1]}</h2>                 */}
                </div>
                {this.state.showInfo === index &&
                  <div className='info'>
                    <h1> Launch Info</h1>
                    <p className='paragraph'>{value.details}</p>
                    <h3>Flight No. : {value.flight_number}</h3>
                    <h3>Date: {date.toString()}</h3>
                    <h3>Launchpad: {console.log(launchlink)}</h3>
                  </div>}
              </div>
            )
          }
          else {
            return (<div key={index} ></div>)
          }
        })}

      </div>
    );
  }
}

