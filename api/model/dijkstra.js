priorityqueue=require('./PriorityQueue');

class Graph{
    nodes=[];
    edges=new Map();

    path=[];
    total_distances;

    constructor(nodeTonodeDistance,preprocess)
    {
        //initilizing with 100 nodes so that I can work with max 100 nodes.
        for(var i=0;i<100;i++)
        {
            this.addNode(String(i));
            this.edges.set(String(i),[])
        }
        console.log("initilizing with "+this.edges.size+" nodes so that I can work with max "+this.edges.size+"  nodes");
      
        for (let [key, value] of nodeTonodeDistance) 
        {
            var str=key.split(',');
            var start=str[0].trim();
            var end=str[1].trim();
            //console.log(start+','+end+'->'+value);
            this.setBidirectedAdjacent(start,end,value);   
        }
        //set adjacent among '0' no. node with its nearest two nodes
        console.log("lel");
        this.setBidirectedAdjacent('0',preprocess.getNode1(),preprocess.getFirstPortionDistance());
        this.setBidirectedAdjacent('0',preprocess.getNode2(),preprocess.getLastPortionDistance());

       /*
        for (let [key, value] of this.edges) 
        {
            console.log(key+"--"+JSON.stringify(value))
        }*/
    }
    //this method used build the realtime bidirected adjacency list 
    setBidirectedAdjacent(u,v,wt)
    {
        var temp={
            weight:Number(wt),
            node:v
        }
        
        var temp_list=this.edges.get(u);
        temp_list.push(temp);
        this.edges.set(u,temp_list);

        var temp1={
            weight:Number(wt),
            node:u
        }
        
        var temp_list1=this.edges.get(v);
        temp_list1.push(temp1);
        this.edges.set(v,temp_list1);

    }
    //this method returns the computed shortest distance in KM
    getShortestDistance()
    {
        return this.total_distances;
    }
    //this method returns the computed shortest path 
    getShortestPath()
    {
        return this.path;
    }

    setDestinationDistance(distances,destinationNode)
    {
        this.total_distances= distances[destinationNode];//set the distance in KM
    }
    
    setDestinationPath(prev,i)
    {
        
        if(prev[i]==null)
        { 

            this.path.push(i);
            return ;
        }
        
        this.setDestinationPath(prev,prev[i]);
        this.path.push(i);

    }

    addNode(node)
    {
        this.nodes.push(node);
    }

    initDjikstraAlgorithm(startNode,destinationNode) {
        let distances = {};
     
        // Stores the reference to previous nodes
        let prev = {};
        let pq = new priorityqueue.PriorityQueue();
     
        // Set distances to all nodes to be infinite except startNode
        distances[startNode] = 0;
        pq.enqueue([String(startNode), 0]);
        this.nodes.forEach(node => {
           if (node !== startNode) distances[node] = Infinity;
           prev[node] = null;
        });
     
        while (!pq.isEmpty()) {
           let minNode = pq.front();
           pq.dequeue();
           let currNode =String( minNode[0]);
           let weight = minNode[1];

          
           this.edges.get(currNode).forEach(neighbor => {
               
              let alt = distances[currNode] + neighbor.weight;
              if (alt < distances[neighbor.node]) {
                 distances[neighbor.node] = alt;
                 prev[neighbor.node] = currNode;
                 pq.enqueue([neighbor.node, distances[neighbor.node]]);
              }
           });
        }

        this.setDestinationDistance(distances,destinationNode);
        this.setDestinationPath(prev,destinationNode);
        console.log("Total required distance:  "+this.total_distances.toFixed(3))
        console.log("Total required path:   "+JSON.stringify(this.path));
     }


     
}

module.exports={
    Graph
}