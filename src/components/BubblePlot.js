import React, { Component } from 'react'
import Chart from 'react-google-charts'

class BubblePlot extends Component {
  render() {

    const optionsData = {
        title: this.props.data[0][0],
        hAxis: {
          title: this.props.data[1][0][1]
        },
        vAxis: {
          title: this.props.data[1][0][2]
        },
        bubble: {
          textStyle: {
            fontSize: 11
          }
          
        },
        sizeAxis : { maxSize : 40 , minSize : 10},
        colorAxis: {colors: ['#e31b23','#00853f'], minValue : '-9', maxValue : '1'},
        sizeAxis: {minValue : '1', maxValue : '35'}

      };
    console.log("bubble")
    console.log(this.props.data)
    return (
      <div className="container mt-5">
        <Chart
          width={'1000px'}
          height={'500px'}
          chartType="BubbleChart"
          data={this.props.data[1]}
          options={optionsData}
        />
      </div>
    )
  }
}
export default BubblePlot