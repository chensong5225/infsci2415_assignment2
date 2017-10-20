# INFSCI 2415 Information Visualization
## Report for Homework 2: Generate Network Visualizations Using D3

### Team Member and Contribution:

He, Jiexiao jih102@pitt.edu  
Song, Chen chs222@pitt.edu  
Xie, Jingran jix73@pitt.edu  

Jingran completed the first visualization. Jiexiao completed the second visualization. Chen contributed ideas and drafted the report. We discussed and designed the visualizations together.


### Exploration and Preprocessing of the Dataset:

The dataset for this homework has a graph structure. For nodes (books about politics) there are 4 features: Id, Label (book name), Class (political ideology: l - liberal, n - neutral, c - conservative) and Degree (number of connections). For edges (frequent co-purchasing of books by the same buyers) there are Id of source node and target node.

The dataset is clear and nothing to manipulate. We only change the two csv files into one json file for later usage.


### Visualization Design:

#### Visualization I: A Force Directed Graph Layout with proper visual encodings

We create a Force Directed Graph Layout for the dataset based on Mike Bostock’s Force-Directed Graph (https://bl.ocks.org/mbostock/4062045). The visual encodings designed as follow:

**(1) Node color: Color the nodes based on the nodes’ “Class” field (i.e., all nodes from the same class have the same color). Make the class visually distinguishable from each other. (Hint: Ordinal
Scales)**  

We encode nodes' Class with 3 colors: blue for liberal, green for neutral, and red for conservative. These three colors are the basic colors for screen display and easy to distinguish. More importantly, they are the colors follow the political conventions so it will be easier for the users to understand the information in this visualization.   

The annotation of the colors we used is at the top-right conner of the diagram.

**b) Node size: Adjust the size of the nodes based on the nodes’ “Degree” field. You may try different scaling methods (linear, square root, logarithm, etc.)**  

We encode nodes' Degree or their numbers of connections with node size. Since the original degree of nodes has a large range, we scale it by first taking a square root and then multiplied by 3.    

**c) Node label: Show the label of each node based on the node’s “Label” field.**  

The label of node shows that Label field which is the book name. And it will be filtered as we will discuss below.

**d) Filtering: Only show node labels with larger Degree (e.g., > 10). How does this new graph compare with the one showing all labels?**

We add a slider can filter nodes by their degrees at different levels (0 - 25). The annotation above the slider suggests the function of the slider and the current filter. Before using the slider all labels will be hided by default. After using the slider, the label of nodes which survived from the filter will be shown. And all the nodes will remain the same while the filter changing.   

This filter can help to find out the number of nodes have connections above a certain number. For example, there are only 2 books have 25 connections (using filter >24) and no book has connections above 25 (using filter >25).  

**Other:**

We also add a mouse hover function to this visualization: when pointing one node, the visualization will highlight this node and the nodes connect with it by increasing transparency of all other nodes. And when the mouse comes out, all nodes will be return to their original colors. This function can help to identify frequent co-purchasing books of a certain book easily.

**Summary of this visualization:**

Since the Force Directed Layout naturally shows the clusters, we can see the relationship between nodes' Class and their clusters in this visualization. Basically conservative books form a cluster and liberal books form another one. Some neutral books go with conservative books and some go with liberal books. 

**Screenshots:**

![]()  
![]()  
![]()  


#### Visualization II: Instead of using node-link diagram, explore different options and generate a visualization to show the structure of the same network. The visualization can include multiple charts or mix different types of charts

There are two most efficient ways to visualize graph structures: node-link diagram and adjacency matrix diagram. Since we already created a node-link diagram can show the details of nodes in section I, here we choose to create an adjacency matrix visualization and show some details of the edges.

The row and column index of the matrix show the Label field of nodes, which are book names. The color of each grid shows the existence and type of each connection as follow:   
* deep red: c-c connection,
* deep blue: l-l,
* deep green: n-n,
* purple: c-l,
* yellow: c-n,
* light blue: l-n.  

Since we colored nodes with red for c, blue for l and green for n in the first visualization, it will be easy to understand that the colors of edges in this visualization are just the mix of nodes' colors. For users who still feel not familiar with the colors, we also have annotation for the color usage at the right side of the diagram.

Another function of this visualization is that we add a scroll list to sort all the nodes through different ways: by their names (alphabetical order), by degrees of nodes and by clusters.


**Screenshots:**

![]()  
![]()  
![]()  

Please reference .html for the source code.   


### Reference:

1. Force-Directed Graph, Mike Bostock, October 15, 2017,  [https://bl.ocks.org/mbostock/4062045](https://bl.ocks.org/mbostock/4062045).

2. Les Misérables Co-occurrence, Mike Bostock, April 10, 2012,  [https://bost.ocks.org/mike/miserables/](https://bost.ocks.org/mike/miserables/).

3. VI7: Node-link diagram and Adjacency matrix, Hung Do, March 18, 2016,  [http://bl.ocks.org/hungvietdo/7f8df0bcd7fba7e531e6](http://bl.ocks.org/hungvietdo/7f8df0bcd7fba7e531e6).
