$(document).on("pageinit", "#layoutPlot", function(event){
    d3jsPlot();
});

function d3jsPlot(){

    // Set the dimension
    var margin = {top: 20, right: 20, bottom: 50, left: 70},
                    width = 1300 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#d3js_Plot").append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform",
                                        "translate(" + margin.left + "," + margin.top + ")");

    var randomX = d3.randomNormal(width / 2, 65),
        randomY = d3.randomNormal(height / 2, 65),
        points = d3.range(1000).map(function() { return [randomX(), randomY()]; });

    var color = d3.scaleSequential(d3.interpolateLab("white", "steelblue"))
        .domain([0, 20]);

    var hexbin = d3.hexbin()
        .radius(12)
        .extent([[0, 0], [width, height]]);

    var x = d3.scaleLinear()
        .domain([0, width])
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([0, height])
        .range([height, 0]);

    svg.append("clipPath")
        .attr("id", "clip")
      .append("rect")
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .attr("class", "hexagon")
        .attr("clip-path", "url(#clip)")
      .selectAll("path")
      .data(hexbin(points))
      .enter().append("path")
        .attr("d", hexbin.hexagon())
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("fill", function(d) { return color(d.length); });

    svg.append("svg:image")
        .attr("xlink:href", "layout.png")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height)
        .attr("align","center");

    // console.log(hexbin.centers());

    // svg.append("g")
    //     .attr("class", "axis axis--y")
    //     .call(d3.axisLeft(y).tickSizeOuter(-width));

    // svg.append("g")
    //     .attr("class", "axis axis--x")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x).tickSizeOuter(-height));
}

// setInterval(d3jsPlot, 2000); // Every 2 seconds
