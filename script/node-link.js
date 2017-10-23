
var width = 880,
    height = 700;

  headline = "You can drag slider to change filter ";
  text_slider = "Current filter is dergree > "
  init = 0;

    d3.select("body").insert("p", ":first-child").append("input")
        .attr("type", "range")
        .attr("min", "0")
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


 var g = d3.select("#header1").select("svg")
  g.append("circle")
   .style("fill", "#FF0000")
   .attr("cx",720)
   .attr("cy",50)
   .attr("r",10)
  g.append("text")
   .attr("class","red")
   .attr("x",740)
   .attr("y",55)
   .attr("font-size","20px")
   .text("Conservative")

  g.append("circle")
   .style("fill", "#008000")
   .attr("cx",720)
   .attr("cy",100)
   .attr("r",10)
  g.append("text")
   .attr("class","green")
   .attr("x",740)
   .attr("y",105)
   .attr("font-size","20px")
   .text("Neutral")


  g.append("circle")
   .style("fill", "#1E90FF")
   .attr("cx",720)
   .attr("cy",150)
   .attr("r",10)
  g.append("text")
   .attr("class","blue")
   .attr("x",743)
   .attr("y",155)
   .attr("font-size","20px")
   .text("Liberal")

d3.json("data/data.json", function(error, graph) {
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

var linkedByIndex = {};
links= graph.links
links.forEach(function(d) {
  linkedByIndex[d.source.index + "," + d.target.index] = true;
});

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
      .call(force.drag)
      .on("mouseover", mouseOverFunction)
      .on("mouseout", mouseOutFunction);


  var nodelabels = svgnode.selectAll(".nodelabel") 
       .data(graph.nodes)
       .enter()
       .append("text")
       .attr({"x":function(d){return d.x;},
              "y":function(d){return d.y;},
              "class":"nodelabel"})
       .text(function(d){if(d.Degree > 99) return d.Label;});

  node.append("title")
      .text(function(d) { return d.Label; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

     node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

        nodelabels.attr("x", function(d) { return d.x+10; }) 
                  .attr("y", function(d) { return d.y; });
  });



  d3.select("#filter").on("input", function() { 
    updategraph(this.value);

});




function mouseOverFunction(d){
  var circle = d3.select(this);
  console.log(node);
  node
    .style("opacity", function(o) {
        return isConnected(o, d) ? 1.0 : 0.2 ;
      })
      .style("stroke", function(o) {
    if(isConnected(o, d))
        return "black";
      });
}

function isConnected(a,b){
  return linkedByIndex[a.index +","+ b.index]||linkedByIndex[b.index +","+ a.index]||a.index==b.index;
}

function mouseOutFunction() {

  var circle = d3.select(this);

  node
    .style("opacity", 1.0)
    .style("stroke","white")
  link
    .transition(500);
  circle
    .transition(500)
    
}


updategraph = function(x){

d3.select("body").select("p").text(text_slider+ x);
var degree = x;

var width = 850,
    height = 700;

var svg = d3.select("#header1").select("svg");
svg.selectAll(".node").remove();
svg.selectAll(".link").remove();
svg.selectAll(".nodelabel").remove();

var svgnode = d3.select("#header1").select("svg")

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
      .call(force.drag)
      .on("mouseover", mouseOverFunction)
      .on("mouseout", mouseOutFunction);

  var nodelabels = svgnode.selectAll(".nodelabel") 
       .data(graph.nodes)
       .enter()
       .append("text")
       .attr({"x":function(d){return d.x;},
              "y":function(d){return d.y;},
              "class":"nodelabel"})
       .text(function(d){if(d.Degree > degree) return d.Label;});


  node.append("title")
      .text(function(d) { return d.Label; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

     node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

      nodelabels.attr("x", function(d) { return d.x+10; }) 
                  .attr("y", function(d) { return d.y; });
  });




function mouseOverFunction(d){
  var circle = d3.select(this);
  console.log(node);
  node
    .style("opacity", function(o) {
        return isConnected(o, d) ? 1.0 : 0.2 ;
      })
      .style("stroke", function(o) {
    if(isConnected(o, d))
        return "black";
      });
  nodelabels
    .style("opacity", function(o) {
        return isConnected(o, d) ? 1.0 : 0.2 ;
      })
}

function isConnected(a,b){
  return linkedByIndex[a.index +","+ b.index]||linkedByIndex[b.index +","+ a.index]||a.index==b.index;
}

function mouseOutFunction() {

  var circle = d3.select(this);
  nodelabels
    .style("opacity", 1.0)
  node
    .style("opacity", 1.0)
    .style("stroke","white")
  link
    .transition(500);
  circle
    .transition(500)
    
}

})
}





});