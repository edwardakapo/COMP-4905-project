import React from 'react';
import Plot from './Pictures/SummaryPlot.png'

class LinePlot extends React.Component {
  render() {
    return (
     <div>
         <p>
             Line plot
         </p>
        <img src={Plot} alt = "Plot" height={400} width ={700}/>

     </div>
    );
  }
}
export default LinePlot