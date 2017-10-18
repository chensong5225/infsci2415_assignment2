var width = 850,
    height = 700;


  headline = "You can drag slider to change filter ";
  text_slider = "Current filter is dergree > "
  init = 0;

    d3.select("body").insert("p", ":first-child").append("input")
        .attr("type", "range")
        .attr("min", "1")
        .attr("max", "25")
        .attr("value", init)
        .attr("id", "filter");

    d3.select("body").insert("p", ":first-child").text(headline);


var color = d3.scale.category20();

var color_config = {"c":"#FF0000","n":"#008000","l":"#1E90FF"};

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(100)
    .size([width, height]);

var svgnode = d3.select("#header1").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("data/data.json", function(error, graph) {
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svgnode.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      //.style("stroke-width", function(d) { return Math.sqrt(d.value); })
      ;

  var node = svgnode.selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")

    node.append("text")
      .attr("dx", 15)
      .attr("dy", ".35em")
      .text(function(d) { if(d.Degree > 99) return d.Label })

     node.append("circle").attr("class", "node")
      .attr("r", function(d) {return 3*Math.sqrt(d.Degree);})
      .style("fill", function(d) { return color_config[d.Class]; })
      .call(force.drag)



  node.append("title")
      .text(function(d) { return d.Label; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

   node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });


  d3.select("#filter").on("input", function() { 
    console.log(this.value);
    updategraph(this.value);

});



updategraph = function(x){

d3.select("body").select("p").text(text_slider+ x);
var degree = x;
console.log(degree);
var svg = d3.select("#header1").select("svg");
svg.selectAll(".node").remove()
svg.selectAll("g").selectAll("text").remove()
svg.selectAll(".link").remove()
d3.json("data/data.json", function(error, graph) {
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svgnode.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      //.style("stroke-width", function(d) { return Math.sqrt(d.value); })
      ;

  var node = svgnode.selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")

    node.append("text")
      .attr("dx", 15)
      .attr("dy", ".35em")
      .text(function(d) { if(d.Degree > degree) return d.Label })

     node.append("circle").attr("class", "node")
      .attr("r", function(d) {return 3*Math.sqrt(d.Degree);})
      .style("fill", function(d) { return color_config[d.Class]; })
      .call(force.drag)



  node.append("title")
      .text(function(d) { return d.Label; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

   node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });


})
}


});