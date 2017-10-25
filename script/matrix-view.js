var margin = {top: 200, right: 300, bottom: 100, left: 200},
    width = 800,
    height = 800;

var x = d3.scale.ordinal().rangeBands([0, width]),
    z = d3.scale.linear().domain([0, 4]).clamp(true);

var color = {"c":"#FF0000","n":"#008000","l":"#1E90FF"};
c_n =  "#804000";
n_l = "#66CCCC";
c_l = "#8F4880";



var svg = d3.select("#header2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left", -margin.left + "px")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/data.json", function(data) {
  var matrix = [],
      nodes = data.nodes ,
      links = data.links,

      n = nodes.length,
      sampleCategoricalData =[];

  // Compute index per node.
  nodes.forEach(function(node, i) {
    node.index = i;
    node.count = 0;
    matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });
  });

  // Convert links to matrix; count character occurrences.
  links.forEach(function(link) {
    matrix[link.source][link.target].z += 4;
    matrix[link.target][link.source].z += 4;

    nodes[link.source].count++;
    nodes[link.target].count++;
    sampleCategoricalData[nodes[link.source].Degree] = nodes[link.source].Class;
  });
    sampleCategoricalData[0]="l - l";
    sampleCategoricalData[1]="l - n";
    sampleCategoricalData[2]="n - n";
    sampleCategoricalData[3]="c - c";
    sampleCategoricalData[4]="c - l";
    sampleCategoricalData[5]="n - c";

var c1 = new Array("#1E90FF","#FF0000","#804000","#008000","#8F4880","#0F8880");


  svglegend = d3.select("#header2").select("svg")
      .append("g").attr("transform", "translate(1180,400)").attr("Class", "legend")
      
  
      svglegend.append("rect")
        .attr("height", 20)
        .attr("width", 30)
        .style("fill", "#1E90FF")
        .style("stroke-width", "2px");
      svglegend.append("text")
         .attr("class","l - l")
         .attr("x",40)
         .attr("y",18)
         .attr("font-size","20px")
         .text("l - l")


      svglegend.append("rect")
        .attr("height", 20)
        .attr("width", 30)
        .attr("y",35)
        .style("fill", "#008000")
        .style("stroke-width", "2px");
      svglegend.append("text")
         .attr("class","n - n")
         .attr("x",40)
         .attr("y",53)
         .attr("font-size","20px")
         .text("n - n")
      
      svglegend.append("rect")
        .attr("height", 20)
        .attr("width", 30)
        .attr("y",70)
        .style("fill", "#FF0000")
        .style("stroke-width", "2px");
      svglegend.append("text")
         .attr("class","c - c")
         .attr("x",40)
         .attr("y",88)
         .attr("font-size","20px")
         .text("c - c")

      svglegend.append("rect")
        .attr("height", 20)
        .attr("width", 30)
        .attr("y",105)
        .style("fill", "#66CCCC")
        .style("stroke-width", "2px");
      svglegend.append("text")
         .attr("class","l - n")
         .attr("x",40)
         .attr("y",123)
         .attr("font-size","20px")
         .text("l - n")
        
       svglegend.append("rect")
        .attr("height", 20)
        .attr("width", 30)
        .attr("y",140)
        .style("fill", "#8F4880")
        .style("stroke-width", "2px");
      svglegend.append("text")
         .attr("class","c - l")
         .attr("x",40)
         .attr("y",158)
         .attr("font-size","20px")
         .text("c - l")

       svglegend.append("rect")
        .attr("height", 20)
        .attr("width", 30)
        .attr("y",175)
        .style("fill", "#804000")
        .style("stroke-width", "2px");
      svglegend.append("text")
         .attr("class","n - c")
         .attr("x",40)
         .attr("y",193)
         .attr("font-size","20px")
         .text("c - n")

  // Precompute the orders.
  var orders = {
    Label: d3.range(n).sort(function(a, b) { return d3.ascending(nodes[a].Label, nodes[b].Label); }),
   count: d3.range(n).sort(function(a, b) { return nodes[b].count - nodes[a].count; }),
   Class: d3.range(n).sort(function(a, b) { return d3.ascending(nodes[a].Class, nodes[b].Class); })
  };

  // The default sort order.
  x.domain(orders.Label);

  svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .attr("x",150);

  var row = svg.selectAll(".row")
      .data(matrix)
    .enter().append("g")
      .attr("class", "row")
      .attr("transform", function(d, i) { return "translate(150," + x(i) + ")"; })
      .each(row);

  row.append("line")
      .attr("x2", width);

  row.append("text")
      .attr("x", -6)
      .attr("y", x.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "end")
      .style("fill",function(d, i)
        {
          return color[nodes[i].Class];
        }
    )
      .text(function(d, i) { return nodes[i].Label; });

  var column = svg.selectAll(".column")
      .data(matrix)
    .enter().append("g")
      .attr("class", "column")
      .attr("transform", function(d, i) { return "translate(" + (x(i)+150) + ")rotate(-90)"; });

  column.append("line")
      .attr("x1", -width);

  column.append("text")
      .attr("x", 6)
      .attr("y", x.rangeBand() / 2)
      .attr("dy", ".32em")
      .attr("text-anchor", "start")
      .style("fill",function(d, i)
        {
        return color[nodes[i].Class];
        }
    )
      .text(function(d, i) { return nodes[i].Label; });

  function row(row) {
    var cell = d3.select(this).selectAll(".cell")
        .data(row.filter(function(d) { return d.z; }))
      .enter().append("rect")
        .attr("class", "cell")
        .attr("x", function(d) { return x(d.x); })
        .attr("width", x.rangeBand())
        .attr("height", x.rangeBand())
        .style("fill-opacity", function(d) { return z(d.z); })
        .on("mouseover", mouseover)
        .style("fill", function(d) {
          if (nodes[d.x].Class == 'n' &&  nodes[d.y].Class == 'n')
          return color["n"];
        else if (nodes[d.x].Class == 'n' &&  nodes[d.y].Class == 'l' || nodes[d.x].Class == 'l' &&  nodes[d.y].Class == 'n' )
        return n_l;
      else if (nodes[d.x].Class == 'n' &&  nodes[d.y].Class == 'c' ||nodes[d.x].Class == 'c' &&  nodes[d.y].Class == 'n')
        return c_n;
      else if (nodes[d.x].Class == 'l' &&  nodes[d.y].Class == 'l')
        return color["l"];
      else if(nodes[d.x].Class == 'l' &&  nodes[d.y].Class == 'c' || nodes[d.x].Class == 'c' &&  nodes[d.y].Class == 'l')
        return c_l;
      else if(nodes[d.x].Class == 'c' &&  nodes[d.y].Class == 'c')
        return color["c"];});

  }

  function mouseover(p) {
     console.log("Inside")

    d3.selectAll(".row text").classed("active", function(d, i) {
      return i == p.y; });
    d3.selectAll(".column text").classed("active", function(d, i) { return i == p.x; });

  }

  function mouseout() {

    d3.selectAll("text").classed("active", false);
     d3.selectAll("rect").attr("width",x.rangeBand());
     d3.selectAll("rect").attr("height",x.rangeBand());
  }

  d3.select("#order")
  .on("change", function() {
    clearTimeout(timeout);
    order(this.value);
  });


  function order(value) {
    console.log(value)
    x.domain(orders[value]);
    console.log(orders[value])
    var t = svg.transition().duration(1500);

    t.selectAll(".row")
        .delay(function(d, i) { return x(i) * 4; })
        .attr("transform", function(d, i) { return "translate(150," + x(i) + ")"; })
      .selectAll(".cell")
        .delay(function(d) { return x(d.x) * 4; })
        .attr("x", function(d) { return x(d.x); });

    t.selectAll(".column")
        .delay(function(d, i) { return x(i) * 4; })
        .attr("transform", function(d, i) { return "translate(" + (x(i)+150) + ")rotate(-90)"; });
  }

  var timeout = setTimeout(function() {
    order("Class");
    d3.select("#order").property("selectedIndex", 2).node().focus();
  }, 2000);
});
