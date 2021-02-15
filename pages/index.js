import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, { Component } from "react"
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
    // this.getBooster = this.getBooster(this)
  }
  componentDidMount() {
    this.getData()
  }
  // getBooster(core)
  // {
  //   console.log(core)
  //   axios.get('https://api.spacexdata.com/v4/cores/'+core)
  //     .then(function (response) {
  //       return response.data.serial
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  // }
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

  render () {
    return (

      <div className='page'>
        <div className='headerParent'>
          <div className='header'>
            <h1>SpaceX Tracker</h1>
          </div>
        </div>
        {this.state.launches && this.state.launches.map((value, index) => {
          if (index < 2) {
            // const divStyle = { backgroundImage: 'url(https://live.staticflickr.com/65535/49635401403_96f9c322dc_o.jpg)' }
            let date = new Date(value.date_local)
            return (
              <div className='box' key={index} >
                <div className='launch' onClick={() => this.handleClick(index)} >
                  <h1>{value.name}</h1>
                </div>
                {this.state.showInfo === index &&
                  <div className='info'>
                    <h1> Launch Info</h1>
                    <p className='paragraph'>{value.details}</p>
                    <h3>Flight No. : {value.flight_number}</h3>
                    <h3>Date: {date.toString()}</h3>
                    {/* <h2>Booster No. : {()=>this.getBooster(value.cores[0].core)}</h2> */}
                    {/* {console.log(value.cores[0].core)} */}
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

