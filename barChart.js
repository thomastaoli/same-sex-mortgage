// Your data
const data = [
   { Year: 2003, Value: 500 },
   { Year: 2004, Value: 530 },
   { Year: 2005, Value: 21 },
   { Year: 2006, Value: 58 },
   { Year: 2007, Value: 68 },
   { Year: 2008, Value: 47 },
   { Year: 2009, Value: 76 },
   { Year: 2010, Value: 52 },
   { Year: 2011, Value: 218 },
   { Year: 2012, Value: 400 },
   { Year: 2013, Value: 430 },
   { Year: 2014, Value: 510 },
   { Year: 2015, Value: 48 },
   { Year: 2016, Value: 11 },
   { Year: 2017, Value: 6 },
   { Year: 2018, Value: 5 },
   { Year: 2019, Value: 550 },
   { Year: 2020, Value: 0 }
];

// Sort data by year in ascending order
data.sort((a, b) => a.Year - b.Year);

// Set the dimensions and margins of the graph
const margin = { top: 20, right: 30, bottom: 40, left: 100 },
   width = 960 - margin.left - margin.right,
   height = 500 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
const svg = d3.select("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", `translate(${margin.left},${margin.top})`);

// X axis - now for values
const x = d3.scaleLinear()
   .domain([0, d3.max(data, d => d.Value)])
   .range([0, width]);

// Y axis - now for years, sorted from 2003 to 2020
const y = d3.scaleBand()
   .range([0, height]) // Changed range to start from top
   .domain(data.map(d => d.Year))
   .padding(0.1);

svg.append("g")
   .call(d3.axisLeft(y).tickSize(0))
   .selectAll("text")
   .style("text-anchor", "end");

// Bars - swapped x and y, and width and height
svg.selectAll("bars")
   .data(data)
   .enter()
   .append("rect")
   .attr("y", d => y(d.Year))
   .attr("x", 0)
   .attr("height", y.bandwidth())
   .attr("width", d => x(d.Value))
   .attr("fill", "#69b3a2");

// Removing the domain line from both axes
svg.selectAll(".domain").remove();



