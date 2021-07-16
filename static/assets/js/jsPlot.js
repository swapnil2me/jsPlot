document.addEventListener("DOMContentLoaded", ()=>{
  const figure = document.getElementById('figure');
  console.log(figure);
  const figure_height = figure.clientHeight;
  const figure_width = figure.clientWidth;

  const top_frac = 30/500;
  const bottom_frac = 75/500;
  const left_frac = 100/960;
  const right_frac = 75/960;

  const margin = { top: top_frac*figure_height,
                 bottom: bottom_frac*figure_height,
                 left: left_frac*figure_width,
                 right: right_frac*figure_width,
               },
        width = figure_width - margin.left - margin.right,
        height = figure_height - margin.top - margin.bottom,
        tooltip = { width: 100, height: 100, x: 10, y: -30 };

  let n = 21;

  let x_scale = d3.scaleLinear()
                  .domain([0, 20*n])
                  .range([0, width]);

  let y_scale = d3.scaleLinear()
                  .domain([0, 1])
                  .range([height, 0]);

  let line = d3.line()
               .x((d,i) => {return x_scale(i)})
               .y((d,i) => {return y_scale(d.y)});

  let dataset = d3.range(n).map(() => { return {"y":d3.randomUniform(1)()}})

  let svg = d3.select("#figure").append("svg")
              .attr("width", figure_width)
              .attr("height", figure_height)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0,"+height+")")
     .call(d3.axisBottom(x_scale));

  svg.append("g")
     .attr("class", "y axis")
     .call(d3.axisLeft(y_scale));

  let path = svg.append("path")
     .datum(dataset)
     .attr("class", "line")
     .attr("d", line);

   tick();

   function tick() {

       // push a new data point onto the back
       dataset.push({"y":d3.randomUniform(1)()});

       // redraw the line, and slide it to the left
       path
               .attr("d", line)
               .attr("transform", null)
               .transition()
               .duration(500)
               // .ease("linear")
               // .attr("transform", "translate(" + x(-1) + ",0)")
               .on("end", tick);

       // pop the old data point off the front
       // dataset.shift();

   }

})//DOMContentLoaded
