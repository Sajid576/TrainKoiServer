package com.example.trainkoi.GoogleMap_Activities;

import android.location.Address;

import com.example.trainkoi.Page3_Activity;
import com.google.android.gms.maps.model.LatLng;

import java.util.*;
import java.util.ArrayList;
import java.util.List;

class Vertex implements Comparable<Vertex> {

    private String name;
    private List<Edge> adjacenciesList;
    private boolean visited;
    private Vertex parent;
    private double distance = Double.MAX_VALUE;

    public Vertex(String name) {
        this.name = name;
        this.adjacenciesList = new ArrayList<>();
    }


    public void addNeighbour(Edge edge) {
        this.adjacenciesList.add(edge);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Edge> getAdjacenciesList() {
        return adjacenciesList;
    }

    public void setAdjacenciesList(List<Edge> adjacenciesList) {
        this.adjacenciesList = adjacenciesList;
    }
    /*
    public void removeAdjacency(Edge edge)
    {
       // boolean b=this.adjacenciesList.remove(edge);
       // System.out.println(b);
        for (Iterator<Edge> it = getAdjacenciesList().iterator(); it.hasNext();) {
            Edge ed = it.next();

            //System.out.println(ed.getStartVertex()+ " "+ed.getTargetVertex());
            if(ed.getStartVertex() == Dijkstra.v[0] || ed.getTargetVertex()==Dijkstra.v[0])
            {
                 it.remove();

            }
        }

        for (Iterator<Edge> it = getAdjacenciesList().iterator(); it.hasNext();) {
            Edge ed = it.next();

            System.out.println(ed.getStartVertex()+ " "+ed.getTargetVertex());

        }
    }*/

    public boolean isVisited() {
        return visited;
    }

    public void setVisited(boolean visited) {
        this.visited = visited;
    }

    public Vertex getParent() {
        return parent;
    }

    public void setPredecessor(Vertex parent) {
        this.parent = parent;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    @Override
    public String toString() {
        return this.name;
    }

    @Override
    public int compareTo(Vertex otherVertex) {
        return Double.compare(this.distance, otherVertex.getDistance());
    }
}
class Edge {

    private double weight;
    private Vertex startVertex;
    private Vertex targetVertex;

    public Edge(double weight, Vertex startVertex, Vertex targetVertex) {
        this.weight = weight;
        this.startVertex = startVertex;
        this.targetVertex = targetVertex;
    }

    public double getWeight() 
    {
        return weight;
    }

    public void setWeight(double weight) 
    {
        this.weight = weight;
    }

    public Vertex getStartVertex() {
        return startVertex;
    }

    public void setStartVertex(Vertex startVertex) {
        this.startVertex = startVertex;
    }

    public Vertex getTargetVertex() {
        return targetVertex;
    }

    public void setTargetVertex(Vertex targetVertex) {
        this.targetVertex = targetVertex;
    }
}
class DijkstraShortestPath {

    public void computeShortestPaths(Vertex sourceVertex){

        sourceVertex.setDistance(0);
        PriorityQueue<Vertex> priorityQueue = new PriorityQueue<>();
        priorityQueue.add(sourceVertex);
        sourceVertex.setVisited(true);

        while( !priorityQueue.isEmpty() ){
            // Getting the minimum distance vertex from priority queue
            Vertex actualVertex = priorityQueue.poll();

            for (Edge edge : actualVertex.getAdjacenciesList()) {
                Vertex v = edge.getTargetVertex();
                if(!v.isVisited() && actualVertex.getDistance() + edge.getWeight() < v.getDistance() ){
                    priorityQueue.remove(v);
                    v.setDistance(actualVertex.getDistance() + edge.getWeight());
                    v.setPredecessor(actualVertex);
                    priorityQueue.add(v);
                }
            }
            actualVertex.setVisited(true);
        }
    }

    public ArrayList<Integer> getShortestPathTo(Vertex targetVertex){
        List<Vertex> path = new ArrayList<>();

        for(Vertex vertex=targetVertex;vertex!=null;vertex=vertex.getParent()){
            path.add(vertex);
        }

        Collections.reverse(path);
        ArrayList<Integer>Path=new ArrayList<>();

        for(int i=0;i<path.size();i++)
        {
            Path.add(Integer.parseInt(path.get(i).getName()));
        }
        return Path;
    }

}


public class Dijkstra {
    Vertex [] v;

    private void addUndirectedNeighbour(int u,int ver,double weight)
    {
        v[u].addNeighbour(new Edge(weight,v[u],v[ver]));
        v[ver].addNeighbour(new Edge(weight,v[ver],v[u]));
    }

    //String [] nodes={"Kamlapur","Tejgaon","Banani","Cantonment","Airport"};
    public void dijkstra(double latitude,double longitude) {
        v=new Vertex[130];
        //we know train is between vertex 4 & 5

       
        for(int i=0;i<125;i++)
        {
            v[i]=new Vertex(String.valueOf(i));
        }


        addUndirectedNeighbour(1,2,5.65);
        addUndirectedNeighbour(2,3,5.46);
        addUndirectedNeighbour(3,4,2.52);
        addUndirectedNeighbour(4,5,4.86);
        addUndirectedNeighbour(5,6,5.61);
        addUndirectedNeighbour(6,7,6.27);
        addUndirectedNeighbour(7,8,4.35);
        addUndirectedNeighbour(8,9,16.86);
        addUndirectedNeighbour(8,10,5.66);
        addUndirectedNeighbour(6,11,7.96);
        addUndirectedNeighbour(9,12,20.45);
        addUndirectedNeighbour(12,13,10.14);
        addUndirectedNeighbour(13,14,15.53);
        addUndirectedNeighbour(14,15,19.09);
        addUndirectedNeighbour(15,16,1.32);
        addUndirectedNeighbour(16,17,8.43);
        addUndirectedNeighbour(17,18,4.48);
        addUndirectedNeighbour(18,19,1.98);
        addUndirectedNeighbour(19,20,4.11);
        addUndirectedNeighbour(20,21,12.23);


        addUndirectedNeighbour(21,23,8.47);
        addUndirectedNeighbour(23,24,18.70);
        addUndirectedNeighbour(24,25,5.25);
        addUndirectedNeighbour(25,26,13.32);
        addUndirectedNeighbour(26,27,5.13);
        addUndirectedNeighbour(27,31,4.17);

        addUndirectedNeighbour(31,32,8.01);
        addUndirectedNeighbour(32,33,8.74);
        addUndirectedNeighbour(27,28,5.97);
        addUndirectedNeighbour(28,29,9.51);
        addUndirectedNeighbour(29,30,8.47);


        addUndirectedNeighbour(33,34,8.97);
        addUndirectedNeighbour(34,35,14.06);
        addUndirectedNeighbour(35,36,8.65);
        addUndirectedNeighbour(36,37,4.33);
        addUndirectedNeighbour(37,38,3.49);
        addUndirectedNeighbour(38,39,12.23);

        addUndirectedNeighbour(39,40,8.25);
        addUndirectedNeighbour(40,41,11.03);
        addUndirectedNeighbour(41,42,2.89);
        addUndirectedNeighbour(42,43,14.87);
        addUndirectedNeighbour(43,44,12.80);
        addUndirectedNeighbour(33,45,3.42);
        addUndirectedNeighbour(45,46,11.79);

        addUndirectedNeighbour(46,47,14.12);
        addUndirectedNeighbour(47,48,8.79);
        addUndirectedNeighbour(48,49,7.29);
        addUndirectedNeighbour(49,50,6.93);
        addUndirectedNeighbour(50,122,7.45);


        addUndirectedNeighbour(52,53,4.38);
        addUndirectedNeighbour(53,54,8.29);
        addUndirectedNeighbour(54,55,3.87);
        addUndirectedNeighbour(55,56,35.31);
        addUndirectedNeighbour(56,57,11.23);
        addUndirectedNeighbour(57,58,4.31);
        addUndirectedNeighbour(58,59,7.88);
        addUndirectedNeighbour(59,60,6.32);
        addUndirectedNeighbour(60,61,6.17);
        addUndirectedNeighbour(61,62,27.14);
        addUndirectedNeighbour(62,63,10.52);

        addUndirectedNeighbour(70,71,16.71);
        addUndirectedNeighbour(71,72,12.35);
        addUndirectedNeighbour(72,73,9.54);
        addUndirectedNeighbour(73,74,7.99);
        addUndirectedNeighbour(74,75,7.24);
        addUndirectedNeighbour(70,102,4.79);
        addUndirectedNeighbour(102,103,8.12);
        addUndirectedNeighbour(103,104,6.03);
        addUndirectedNeighbour(104,105,15.23);
        addUndirectedNeighbour(105,106,5.61);
        addUndirectedNeighbour(106,107,7.42);
        addUndirectedNeighbour(107,108,4.82);
        addUndirectedNeighbour(75,76,7.83);
        addUndirectedNeighbour(76,77,7.09);
        addUndirectedNeighbour(77,78,2.38);
        addUndirectedNeighbour(79,80,7.98);
        addUndirectedNeighbour(80,81,17.17);
        addUndirectedNeighbour(81,82,7.63);
        addUndirectedNeighbour(90,91,4.84);
        addUndirectedNeighbour(91,92,7.12);
        addUndirectedNeighbour(92,93,6.61);
        addUndirectedNeighbour(93,94,6.83);
        addUndirectedNeighbour(94,95,16.42);
        addUndirectedNeighbour(95,96,5.65);
        addUndirectedNeighbour(96,97,7.53);
        addUndirectedNeighbour(97,98,8.16);
        addUndirectedNeighbour(98,99,7.71);
        addUndirectedNeighbour(99,100,7.79);
        addUndirectedNeighbour(100,101,6.71);
        addUndirectedNeighbour(108,109,5.49);
        addUndirectedNeighbour(109,110,5.38);
        addUndirectedNeighbour(110,111,8.12);
        addUndirectedNeighbour(111,112,8.01);

        addUndirectedNeighbour(112,113,7.14);
        addUndirectedNeighbour(113,114,12.92);
        addUndirectedNeighbour(114,115,5.65);
        addUndirectedNeighbour(115,116,9.62);
        addUndirectedNeighbour(116,117,6.80);
        addUndirectedNeighbour(117,118,12.21);
        addUndirectedNeighbour(118,119,5.14);
        addUndirectedNeighbour(119,120,5.46);
        addUndirectedNeighbour(120,121,2.95);
        addUndirectedNeighbour(121,122,6.56);



        Line obj=new Line();

        ArrayList<Integer> NearestLists=obj.nearestNodesFinder(latitude,longitude);  //this returned list has the three nearest nodes
        Result res= obj.nearestIndexFinder(NearestLists,latitude,longitude);

        //Result object has temp_list that is the most nearest list to the train

        DistanceCost cost=obj.getTotal_Cost(res.getTemp_list(),res.getTrainIndex(),res.getNode1(),res.getNode2());
        int node1=cost.getNode1();
        int node2=cost.getNode2();
       // double costFromFirstNode=distanceBetweenIndexAndFirstNode();
       // double costFromSecondNode=total_cost-costFromFirstNode;

        addUndirectedNeighbour(0,cost.getNode1(),cost.getFirst_portion_distance());
        addUndirectedNeighbour(0,cost.getNode2(),cost.getLast_portion_distance());

        DijkstraShortestPath shortestPath = new DijkstraShortestPath();
        shortestPath.computeShortestPaths(v[0]);        //source node

       // System.out.println("Minimum distance from source to destination: "+v[7].getDistance());  //destination node

        //System.out.println("Shortest Path from source to destination: "+shortestPath.getShortestPathTo(v[7]));
        if(MapsActivity.flag==2) {
            //geocoding
            List<Address> location = GeoCoding.getAddressName(latitude, longitude);
            MapsActivity.address=location.get(0).getAddressLine(0);
            MapsActivity.area = location.get(0).getLocality();
            MapsActivity.city = location.get(0).getAdminArea();

            MapsActivity.txt1.setText(MapsActivity.address+" "+MapsActivity.city);
            System.out.println(MapsActivity.address+ " " + MapsActivity.city);
            Marker.TrainMarkerUpdate(latitude,longitude,node1,node2);        //it will only update the train Marker for trankoi button

        }
        else {
            ArrayList<Integer> path=null;


            if(MapsActivity.flag==1)
            {
                 path = shortestPath.getShortestPathTo(v[MapsActivity.mp.get(Page3_Activity.From_Station)]);
            }
            if(MapsActivity.flag==3)
            {
                path = shortestPath.getShortestPathTo(v[MapsActivity.mp.get(Page3_Activity.To_Station)]);
            }
            if (path.get(1) == cost.getNode1()) {
                Line ln = new Line();
                //System.out.println("first_portion list size:  "+cost.getFirst_portion_list());
                ln.NodeToCoordinateListConverter(path, cost.getFirst_portion_list());

                //if(Line.route_list!=null)Line.route_list=null;

               // Line.route_list = route_list;
              //  ln.DrawRouteCurveLine(route_list);
            }
            else {
                Line ln = new Line();
                //System.out.println("last_portion list size:  "+cost.getLast_portion_list());
                ln.NodeToCoordinateListConverter(path, cost.getLast_portion_list());
               // if(Line.route_list!=null)Line.route_list=null;
               /// Line.route_list = route_list;
               // ln.DrawRouteCurveLine(route_list);
            }

            if (MapsActivity.flag == 3) {
                LatLng cord = cost.getLast_portion_list().get(0);
                double x = cord.latitude;
                double y = cord.longitude;
                double TOTAL_DISTANCE = v[MapsActivity.mp.get(Page3_Activity.To_Station)].getDistance();
                Marker.TrainMarkerUpdate(x, y, TOTAL_DISTANCE);
                //it will update the marker with distance,velocity  and marker for 1st and 3rd button
                Marker.destination_Marker_Set();
                System.out.println("Minimum distance from source to destination: " + v[MapsActivity.mp.get(Page3_Activity.To_Station)].getDistance());  //destination node

                System.out.println("Shortest Path from source to destination: " + shortestPath.getShortestPathTo(v[MapsActivity.mp.get(Page3_Activity.To_Station)]));
            }
            if (MapsActivity.flag == 1) {
                LatLng cord = cost.getLast_portion_list().get(0);
                double x = cord.latitude;
                double y = cord.longitude;
                double TOTAL_DISTANCE = v[MapsActivity.mp.get(Page3_Activity.From_Station)].getDistance();
                Marker.TrainMarkerUpdate(x, y, TOTAL_DISTANCE);
                //it will update the marker with distance,velocity  and marker for 1st and 3rd button
                Marker.destination_Marker_Set();
                System.out.println("Minimum distance from source to destination: " + v[MapsActivity.mp.get(Page3_Activity.From_Station)].getDistance());  //destination node

                System.out.println("Shortest Path from source to destination: " + shortestPath.getShortestPathTo(v[MapsActivity.mp.get(Page3_Activity.From_Station)]));
            }


        }



    }
}
