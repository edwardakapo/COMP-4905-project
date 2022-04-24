import React, { Component, useState , setState, useEffect} from 'react'
import Chart from 'react-google-charts'

class GeoChart extends React.Component{

    constructor(){
        super();
        this.state = {
            hasBeenClicked : false,
            count : 0,
            changedProp : []
        };
    }
    componentDidUpdate(props){
      if(props.data[0] !== this.state.changedProp){
        this.setState({
          changedProp : this.props.data[0],
          count : 0
        })
      }
    }
    handleClick = () => {

            this.setState( (previousState) => {
            return{
            hasBeenClicked :true ,
            count : previousState.count + 1
            }
        })
    }

    render(){
      
      this.state.changedProp = this.props.data[0];
      var optionsData = {}
      if (this.props.data[0] == "Unemployment rate from 2015 - 2020"){
        // others
        optionsData = {colorAxis: {colors: ['#00853f',  '#e31b23'], minValue : '1', maxValue : '11'}}
      }
      else if (this.props.data[0] == "Consumer price index from 2015 - 2020"){
        // others
        optionsData = {colorAxis: {colors: ['#00853f',  '#e31b23'], minValue : '-1', maxValue : '10'}}
      }
      else{
        //gdp
        optionsData = {colorAxis: {colors: ['#e31b23','#00853f'], minValue : '-5', maxValue : '5'}}

      }
    return (
      <div>
        <div>
          <h2>{this.props.data[0]}</h2>
        </div>
        <div> 
        <Chart
          width={'1000px'}
          height={'500px'}
          chartType="GeoChart"
          data={this.props.data[1][this.state.count % 6]}
          options={optionsData}
        />
        </div>
        <div>
            <button onClick={this.handleClick}>Click to go to next year , year is {2015 + (this.state.count % 6)}</button>
        </div>

      </div>
    )
}}
export default GeoChart