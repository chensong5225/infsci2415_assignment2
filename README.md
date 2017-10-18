# infsci2415_assignment2

Task: Generate network visualizations using D3.  
• Download “Books about US politics” network in
CSV format:  
• Nodes: polbooks_nodes.csv  
• Edges: polbooks_edges.csv  
• Network description: polbooks.txt  
• Work in groups (3-4 members per group) to
create two visualization designs using D3  
• Submit your report in PDF, and your code in .zip,
via courseweb. One submission per group.  
• Due: 2017-10-27 8am  
• Demo time: to be scheduled  

(1) Visualize the network with Force Directed Graph Layout with proper visual encodings.  
a) Node color: Color the nodes based on the nodes’ “Class” field (i.e., all nodes from the same class have the same color). Make the class visually distinguishable from each other. (Hint: Ordinal
Scales)  
b) Node size: Adjust the size of the nodes based on the nodes’ “Degree” field. You may try different scaling methods (linear, square root, logarithm, etc.)  
c) Node label: Show the label of each node based on the node’s “Label” field.  
d) Filtering: Only show node labels with larger Degree (e.g., > 10). How does this new graph compare with the one showing all labels?  

(2) Instead of using node-link diagram, explore different options and generate a visualization to show the structure of the same network. The visualization can include multiple charts or mix different types of charts.  
• All visualizations need to be properly annotated and labeled to help clearly explain what the visualizations show.  

Explain in your report:  
• what you intend to show in the visualization  
• the rationale for your design (why is it an effective representation for the things you intend to show?)  
• in the beginning of the report, describe your team with names and PITT IDs of all members, and one paragraph to briefly describe the contribution of each member  

## Notice:
The model.html is the graph we chosen. All necessery css and js are under script folder. The data for model.html is miserables.json.  
The graph.html is what lin's example. Data is also miserables.json.  
Data.json has changed: "Source" -> "source","Target"->"target". Beacase d3 must use "source" and "target" to build link, please re-pull all files and do not change data.json.  
All of our work should like the first one p1/p2.html at root folder, js and css codes in script folder, but put data.json in the data folder.  
After work, we will remove all other unnecessery things.  
[Reference](http://bl.ocks.org/hungvietdo/7f8df0bcd7fba7e531e6)

