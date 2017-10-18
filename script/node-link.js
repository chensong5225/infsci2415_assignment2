var width = 750,
    height = 800;

var color = d3.scale.category20();

var color_config = {"n":"#FF0000","l":"#008000","c":"#1E90FF"};

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
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", function(d) {return 3*Math.sqrt(d.Degree);})
      .style("fill", function(d) { return color_config[d.Class]; })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.Label; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
});