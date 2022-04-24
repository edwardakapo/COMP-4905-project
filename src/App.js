import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import GeoChart from './components/GeoChart';
import BubblePlot from './components/BubblePlot';
import LinePlot from './components/LinePlot';

// Data for Bubbles
const dataExports = [["Percent change 2019-2020 of total exports vs Average stringecy"],[
	["Country ", "Average stringency (2020)", "percent change 2019 - 2020", "GDP growth 2020", "% of GDP 2019"], 
	["China", 72.99333333, 3.589279329, 2.35, 18.41123328], 
	["USA", 58.2575, -15.72873176, -3.4, 11.75626371], 
	["Germany", 57.09916667, -7.882398367, -4.57, 46.62808642], 
	["Japan", 38.48, 21.76656641, -4.59, 12.53654175], 
	["UK", 61.65, -13.67480382, -9.4, 31.01223072], 
	["France", 58.71916667, -14.95593349, -7.86, 31.6021261], 
	["Netherlands", 53.62666667, -5.291181364, -3.8, 82.5368051], 
	["Hong Kong", 58.64333333, -5.024962014, -6.08, 177.6706518], 
	["Singapore", 48.45833333, -7.600499607, -5.39, 173.213141], 
	["South Korea", 52.58583333, -7.964724565, -0.85, 39.28588734]
]]
const dataOil = [["Percent change 2019-2020 of oil exports vs Average stringecy"],[
	["Country ", "Average stringency (2020)", "percent change", "GDP growth 2020", "% of GDP (2019)"], 
	["Saudi Arabia", 60.26333333, -32.56, -4.11, 21.26112035], 
	["Russia", 52.8175, -40.2, -2.95, 7.194564714], 
	["Iraq", 67.90166667, -38.7, -15.67, 35.24930906], 
	["USA", 58.2575, -23, -3.4, 0.304782367], 
	["UAE", 53.31666667, -14.5, -6.13, 13.42778194], 
	["Canada", 58.56666667, -30.1, -5.23, 3.909098738], 
	["Kuwait", 67.70916667, -39.2, -8.69, 34.17478167], 
	["Nigeria", 59.06666667, -38.7, -1.79, 9.17372546], 
	["Kazakhstan", 67.7475, -29.4, -2.5, 18.47823256], 
	["Norway", 44.59833333, -21.4, -0.72, 7.132021318]
]]
const dataManu = [["Percent change 2019-2020 of manufaturing value vs Average stringecy"],[
	["Country ", "Average stringency (2020)", "percent change 2019 -> 2020 (billions)", "GDP growth 2020", "% of GDP (2019)"], 
	["China", 72.99333333, 0.768947092, 2.35, 26.77645493], 
	["Germany", 57.09916667, -7.535787051, -4.57, 19.44084362], 
	["South Korea", 52.58583333, -2.439200058, -0.85, 25.22895215], 
	["india", 70.21333333, -9.174575034, -7.25, 13.36213203], 
	["italy", 69.71416667, -6.170526034, -8.94, 14.87210112], 
	["France", 58.71916667, -9.545953863, -7.86, 10.01099707], 
	["UK", 61.65, -6.235818794, -9.4, 8.881862404], 
	["Indonesia", 57.1375, -4.580498866, -2.07, 19.70333304], 
	["Brazil", 59.8, -25.87827548, -4.06, 10.14112259], 
	["Russia", 52.8175, -10.29559347, -2.95, 14.77721604]
]]
const dataTourism = [["Percent change 2019-2020 of tourism revenue vs Average stringecy"],[
	["Country ", "Average stringency (2020)", "percent change 2019 -> 2020 (billions)", "GDP growth 2020", "% of GDP (2019)"], 
	["USA", 58.2575, -64.83355398, -3.4, 1.11717698], 
	["France*", 58.71916667, -49.19464225, -7.86, 2.593601014], 
	["Australia", 57.56166667, -45.29226534, 0, 3.445023169], 
	["Austria", 51.465, -40.73059713, -6.73, 5.825487068], 
	["Thailand", 49.27333333, -76.13832316, -6.1, 11.82725168], 
	["Japan ", 38.48916667, -76.84366681, -4.59, 0.955740972], 
	["Turkey", 56.945, -66.74876253, 1.79, 5.44218134], 
	["UAE*", 53.31666667, -35.92013121, -6.13, 9.206893246], 
	["Italy*", 69.71416667, -60.58755538, -8.94, 2.583383929], 
	["India*", 70.21333333, -57.63557689, -7.25, 1.102978575], 
	["macao", 35.4025, -77.06359617, -54.01, 74.57608696]
]]
const dataMarket = [["Percent change 2019-2020 of Market capitalization vs Average stringecy"],[
	["Country ", "Average stringency (2020)", "percent change 2019 -> 2020 ()", "GDP growth 2020", "% of GDP (2019)"], 
	["USA", 58.2575, 20.14949177, -3.4, 158.12], 
	["China", 72.99333333, 43.43808349, 2.35, 59.63], 
	["Japan", 38.48916667, 8.514683245, -4.59, 120.24], 
	["Hong Kong", 58.64333333, 25.13027557, -6.08, 1349.59], 
	["Canada", 58.56666667, 9.644680586, -5.23, 138.29], 
	["India", 70.21333333, 13.49107096, -7.25, 79.67], 
	["Saudi Arabia", 60.26333333, 0.925702795, -4.11, 303.52], 
	["Germany", 57.09916667, 8.862008322, -4.57, 53.96], 
	["South korea", 52.58583333, 46.56057218, -0.85, 89.91], 
	["Australia", 57.56166667, 15.66012369, 0, 106.87]
]]

// Text

const title = "Visualization of the effects of Government Covid policies on major economic sectors and indicators around the world"
const intro = "The sudden outbreak of Covid-19 in 2020 had great effects on every national economy as many sectors and businesses were left counting costs, as the government rapidly announced lockdown measures to tackle the spread of the virus."
const intro2 = "To visualize these effects on the major economic indicators and sectors here is a selection of charts and maps that will hopefully help you understand the impact of the virus"
const introMaps = "First set of visualizations will be a set of Choropleth Maps for the economic indicators, GDP growth, Unemployment Rate and Consumer price index. These maps show the values for these indicators for each country from 2015 to 2020.  "
const textMaps = ["Looking at the trend from 2015 till 2020 we can see from 2015 to 2019 many countries were having good economic growth year by year then when it gets to 2020, we see that almost every country is in a recession, this shows that leading up to 2020 most countries were experiencing growth then when covid-19 hit most of the economies went into recession.",
                  "Looking at the trend from 2015 till 2020 we can see that from 2015 to 2019 there are fluctuations in the unemployment rates but in general most countries were at lower unemployment rates in 2019, especially developed nations then when we get to 2020 most major economies were experiencing higher than normal unemployment rates. This shows that leading up to 2020 most countries were experiencing usual unemployment rate fluctuations then when covid-19 hit most of the major economies experienced higher than normal unemployment rates.",
                  "Looking at the trend from 2015 till 2020 we see that every country experience inflation year to year and that this inflation in general was slowing down from the high levels in 2015, in 2019 most countries had a lower index, looking at 2020 we see that a lot of developing nations were hit with very high indexes for inflation when covid 19 hit."]
const mapOutro = "The maps above show the damage that 2020 did to many economies through different indicators, now we want to go a bit deeper and investigate the sectors of the economy and find trends within the top countries in these sectors relative to the strictness of government policies."
const introBubble = "The second visualization we will be looking at will be Bubble plots, these plots will show relative to Government policy strictness the percentage changes from 2019-2020 for Gross Exports, Market Capitalization, Oil exports Manufacturing value added and Tourism revenue for the top countries in those categories. The plot also considers the 2020 GDP growth of the countries and the 2019 % share of GDP these categories had for the respective countries, the GDP growth dictates the colour of the bubble while the % share tells the size of the bubble."
const textBubble = ["Firstly, looking at the x and y distribution of points we can see that there is a negative correlation which suggests that as the average stringency increases the percentage loss in total export revenue also increases. Next looking at the vertical colour spread there is not a strong correlation but there is some indication that with increase in percent loss in Export revenue correlates with more negative GDP growth. Lastly looking at the size of the bubbles we see that the bigger bubbles are grouped more at the bottom this shows that increase in % of GDP for total exports could mean an increase in percent loss.",
                    "Firstly, looking at the distribution of points we see a strong negative correlation, implying that as stringency increases the percent loss in Oil Export revenue increases. Next looking at the colour spread there isn’t any trend to be seen. Lastly looking at the size of bubbles we see that the bigger bubble size follows the same strong negative correlation as the point distribution meaning that percent losses also increase with % share total GDP for Oil exports.",
                    "There is no correlation between the distribution of points, but we can see some correlation with the colour spread, going from less stringency to more we see a negative correlation with 2020 GDP growth, as you go from left to right the GDP growth reduces",
                    "Firstly, looking at the distribution of points we see a positive correlation. This contradiction is brough about by Macao and Japan being so low on the graph with lower values of stringency. Next looking at the colour spread there is not any noticeable correlation. Lastly looking at the size of the bubbles we see that going from left to right with an increase in stringency there is a reduction in %share of total GDP for tourism revenue. Going vertically, we can see hints that as percentage loss increases the percent share of GDP could be reducing but more data will be needed to be sure.",
                    "Firstly, from the data set chosen we see that our x and y distribution have a positive correlation this implies that with increase in stringency the total valuation of companies in a country increased. This shows that even though some businesses were closing and stock prices falling during lockdown, overall, the values of companies during 2020 were increasing. Moreover, looking at the horizontal colour shifts from left to right, it moves from green to red indicating that with higher stringencies the GDP growth of the countries reduces."]
const outroBubble = "The various bubble plots above each show their own trends specific parts of the economy, the bubble distribution showed a lot more trends and gave more information than the size and colour did. Looking more into the datapoint spread we can plot the lines of best fit for all the bubble plots on the same graph to see how their trends all compare."
const textSumm = "we can see that Total exports and Oil exports both had negative correlations, while Market cap and tourism revenue had positive correlations leaving Manufacturing value added as the only plot that did not show any correlation. We can also see that Market cap was the sector indicator with the highest percentage gain across 2019 and 2020, whilst Tourism revenue was the lowest."
// fetch data from API , after this works we can set up an express server


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count : 0,
      count2: 0,
      mapItems : [],
      bubbleItems : [],
      DataisLoaded : false
    };
  };
  //const [count, setCount] = useState(0); 
  async componentDidMount() {

    // fetch all 3 economic indicators from api calls

  //GDP growth
    const url = 'http://api.worldbank.org/v2/country/indicator/NY.GDP.MKTP.KD.ZG?date=2015:2020&format=json&per_page=2000'
    const response = await fetch(url);
    const data = await response.json();
    var plotdata = []
    for (let year = 0 ; year <= 5 ; year++){
    let buff = [['Country', 'GDP growth']]
    let mapdata = data[1].filter(item => item.date == year+2015 && item.value != null).map((item) => [item.country.id , item.value]) 
    var con = buff.concat(mapdata)
    plotdata[year] = con
    }

    
  //Unemployment rate   
    const url1 = 'http://api.worldbank.org/v2/country/indicator/SL.UEM.TOTL.ZS?date=2015:2020&format=json&per_page=2000'
    const response1 = await fetch(url1);
    const data1 = await response1.json();
    var plotdata1 = []
    for(let year = 0 ; year <= 5 ; year ++){
    let buff1 = [['Country', 'Unemployment rate']]
    let mapdata1 = data1[1].filter(item => item.date == year+2015 && item.value != null).map((item) => [item.country.id , item.value]) 
    let con1 = buff1.concat(mapdata1)
    plotdata1[year] = con1
    }


    
  //CPI
    const url2 = 'http://api.worldbank.org/v2/country/indicator/FP.CPI.TOTL.ZG?date=2015:2020&format=json&per_page=2000'
    const response2 = await fetch(url2);
    const data2 = await response2.json();

    var plotdata2 = []
    for(let year = 0 ; year <= 5 ; year++) {
    let buff2 = [['Country', 'Inflation']]
    let mapdata2 = data2[1].filter(item => item.date == year+2015 && item.value != null).map((item) => [item.country.id , item.value]) 
    let con2 = buff2.concat(mapdata2)
    plotdata2[year] = con2
    }
    const bubbleArr = [dataExports,dataOil,dataManu,dataTourism,dataMarket]

    const mapArr = [["GDP growth from 2015 - 2020",plotdata],
                    ["Unemployment rate from 2015 - 2020",plotdata1],
                    ["Consumer price index from 2015 - 2020",plotdata2]]

      this.setState({
        mapItems : mapArr,
        bubbleItems : bubbleArr,
        DataisLoaded : true
      });
   
  }
  mapChange1 = () =>{
    
    this.setState({
      count : 0
  })
  }
  mapChange2 = () =>{
    
    this.setState({
      count : 1
  })
  }
  mapChange3 = () =>{
    
    this.setState({
      count : 2
  })
  }
  bubbleChange1 = () =>{
    
    this.setState({
      count2 : 0
  })
  }
  bubbleChange2 = () =>{
    
    this.setState({
      count2 : 1
  })
  }
  bubbleChange3 = () =>{
    
    this.setState({
      count2 : 2
  })
  }
  bubbleChange4 = () =>{
    
    this.setState({
      count2 : 3
  })
  }
  bubbleChange5 = () =>{
    
    this.setState({
      count2 : 4
  })
  }
  
  
render(){
  //loading .....
  const {DataisLoaded, mapItems, bubbleItems} = this.state;
  if(!DataisLoaded) return <div> 
    <h1> Please wait a little ..</h1>
  </div>
  //code
   return (
    <div className ="App"> 
      <h1 className ="Title">
        {title}
      </h1>
      <p>
      By: Oluwademilade Edward Akapo<br/>
      Comp 4905 FP<br/>
      25 April 2022
      </p>
      <div className ="text">
        <p>{intro}</p>
        <p>{intro2}</p>
        <h2>Global Economies in Flux</h2>
        <p>{introMaps}</p>
      <div className='Map'>
        <div className ="button">
          <button onClick={this.mapChange1}> GDP growth</button>
          <button onClick={this.mapChange2}> Unemployment Rate</button>
          <button onClick={this.mapChange3}> Consumer price index</button>
        </div>
        <div className ="graph">
          <GeoChart data={mapItems[this.state.count]}/>
          <p className ="graphText">{textMaps[this.state.count]}</p>
        </div>
      </div>
      <p>{mapOutro}</p>
      <h2>Looking Deeper into the economies</h2>
      <p>{introBubble}</p>
      <div className='Bubble'>
        <div className ="button">
          <button onClick={this.bubbleChange1}> Total Exports</button>
          <button onClick={this.bubbleChange2}> Oil exports</button>
          <button onClick={this.bubbleChange3}> Manufacturing Value added</button>
          <button onClick={this.bubbleChange4}> Tourism revenue</button>
          <button onClick={this.bubbleChange5}> Market capitalization</button>
        </div>
        <div className ="graph">
          <BubblePlot data={bubbleItems[this.state.count2]}/>
          <p className ="graphText">{textBubble[this.state.count2]}</p>
        </div>
      </div>

      <h2>Finalizing Results...</h2>
      <p>{outroBubble}</p>
      <div className ="plot">
        <LinePlot/>       
      </div>
      <p>{textSumm}</p>
      </div>



      <footer><pre className='footNote'>        Carleton University COMP 4905. 
        Oluwademilade Edward Akapo. 101095403. 
        Link to paper : </pre></footer>
    </div>
    

  )
}
 
}

export default App;
