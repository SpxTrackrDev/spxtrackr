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
              <Link href="/posts/nasaPage">
                <a>NASA</a>
              </Link>
            </h2>
          </div>
          <div className='menuButton'>
            <h2>
              <Link href="/posts/spxPage">
                <a>SpaceX</a>
              </Link>
            </h2>
          </div>
        </div>
<<<<<<< HEAD
        <div className='countdown'>

        </div>
        <div className='launch'>
          <h1>Upcoming Launches</h1>
          <p1>These are the two upcoming spaceX launches.</p1>
          <p1> Select one to view additional information</p1>
        </div>
=======
>>>>>>> parent of af71e26 (Changed titles)
        {this.state.launches && this.state.launches.map((value, index) => {
          if (index < 1) {
            // const divStyle = { backgroundImage: 'url(https://wallpaperaccess.com/full/1145374.jpg)' }
            let date = new Date(value.date_local)
<<<<<<< HEAD
            let currentDate =  new Date()
            let launchlink = this.getLaunchpad(value.launchpad)
            //im not entirely sure how to make this better
            
            return (
              <div className='box' key={index} >
                <div className='timer' onClick={() => this.handleClick(index)}>
                <h1>Upcoming Launch: {value.name}</h1> 
=======
            var deadline = date;
            var x = setInterval(function () {
              let now = new Date().getTime();
              var t = deadline - now;
              var days = Math.floor(t / (1000 * 60 * 60 * 24));
              var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = Math.floor((t % (1000 * 60)) / 1000);
              document.getElementById("demo").innerHTML = days + "d "
                + hours + "h " + minutes + "m " + seconds + "s ";
              if (t < 1) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "LAUNCHED/LIVE";
              }
            }, 1000);
            return (
              <div className='box' key={index} >
                <div className='timer' onClick={() => this.handleClick(index)}>
                <h1>{value.name}</h1>
                  <h2 id="demo"></h2>
>>>>>>> parent of af71e26 (Changed titles)
                </div>
                {/* <div className='launch' onClick={() => this.handleClick(index)} >
                  <h1>{value.name}</h1>
                </div> */}
                {this.state.showInfo === index &&
                  <div className='info'>
                    <h1> Launch Info</h1>
                    <p className='paragraph'>{value.details}</p>
                    <h3>Flight No. : {value.flight_number}</h3>
                    <h3>Date: {date.toString()}</h3>
<<<<<<< HEAD
                    {/* <h3>Launchpad: {console.log(launchlink)}</h3> */}
=======
                    {/* <h2>Booster No. : {()=>this.getBooster(value.cores[0].core)}</h2> */}
                    {/* {console.log(value.cores[0].core)} */}
>>>>>>> parent of af71e26 (Changed titles)
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

