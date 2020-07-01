package com.example.trainkoi.GoogleMap_Activities;

import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.util.Log;

import com.example.trainkoi.DbHandler;
import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;
import com.google.android.gms.maps.model.Polyline;
import com.google.android.gms.maps.model.PolylineOptions;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import java.util.TreeMap;


public class Line extends MapsActivity{
    public static final String SHARED_PREFS = "sharedPrefs";

    static ArrayList<Polyline>line_arr=new ArrayList<>();
    public static Polyline line;
    static double velocity;         //continiously updated by TrainLiveLocationReader
    public static Context context;



    public ArrayList<Integer> nearestNodesFinder(double x0, double y0)
    {
        Map<Double,String> excractMIN=new TreeMap<>(); //  key-->distance ,value --> station nodes
        for (Map.Entry<String,String> entry : MapsActivity.StationToCoordinates.entrySet()) {
            //traversing all the index of stations and finding the nearest two stations
            System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());

            String str = entry.getValue();
            String[] st = str.split(",");
            double latitude = Double.parseDouble(st[0]);
            double longitude = Double.parseDouble(st[1]);
            //(x0,y0) is the real current location of the train
            double dist = Haversine.distance(latitude, longitude, x0, y0);
            dist *= 1000; // km-->meter


            //station are sorted according to their direct distances from the train
            //distance=key , station names= value
            excractMIN.put(dist, entry.getKey());
            // System.out.println(dist+"*--*"+entry.getValue());
        }
            /*From the excractMin we will select top 3 Train Station to check at least 2 lists
            * to determine in which track train actually is */

            int pos=-1;
            String first_station="",second_station="",third_station="";

            //this loop used for getting three nearest station names from the tree map
            for (Map.Entry<Double, String> entry1 : excractMIN.entrySet()) {
                System.out.println(entry1.getKey()+" meter  and index:: "+entry1.getValue());
                pos++;
                if(pos==0)
                {
                    first_station=entry1.getValue();
                }
                else if(pos==1)
                {
                    second_station=entry1.getValue();
                }
                else if(pos==2)
                {
                    third_station=entry1.getValue();
                }
                else break;


            }
        System.out.println("stations:  "+first_station+" "+second_station+" "+third_station);
            int node1=0,node2=0,node3=0;
           try {
                node1 = MapsActivity.mp.get(first_station);
                node2 = MapsActivity.mp.get(second_station);
                node3 = MapsActivity.mp.get(third_station);


           }catch(NullPointerException e)
           {
               System.out.println("node1: "+node1+"node2: "+node2+"node3: "+node3);
               e.printStackTrace();
           }

           ArrayList<Integer>list_nodes=new ArrayList<>();
           list_nodes.add(node1);
           list_nodes.add(node2);
           list_nodes.add(node3);
           Collections.sort(list_nodes);
           /*sorting the nearest nodes number in ascending order for easy arrangement purpose so that we can easily
           get the lists from these nodes */
           return list_nodes;

    }

    public Result nearestIndexFinder(ArrayList<Integer>list_nodes,double x0,double y0)
    {
       
        
         int node1=list_nodes.get(0);
         int node2=list_nodes.get(1);
         int node3=list_nodes.get(2);   
       
        
         //database fetch part
        ArrayList<LatLng>list1=getList(node1,node2);
        ArrayList<LatLng>list2=getList(node2,node3);
        
        System.out.println("node1: "+node1+" node2: "+node2+" node3: "+node3+" list1:"+ list1+" list2: "+list2);
        /*
         we got our two nearest coordinate lists. Now we are going check which coordinate among these two lists is
         the closest to the train Coordinate .We are going to store that index in which NEAREST COORDINATE is located
         */
        double Min_dist=1000000000;
        int train_index=0;
        int list_checker=0;
        for(int i=0;i<list1.size();i++)
        {
            LatLng cord=list1.get(i);

            double x=cord.latitude;
            double y=cord.longitude;

            //(x0,y0) is the real current location of the train
            double dist=Haversine.distance(x,y,x0,y0);
            if(dist<Min_dist)
            {
                Min_dist=dist;
                train_index=i;
                list_checker=1;
            }
        }
        /*
        * After getting minimum distanced Train index in list1,we are going to check if more minimum distanced 
        Train index exist in list2 or not .
        * */
        for(int i=0;i<list2.size();i++)
        {
            LatLng cord=list2.get(i);

            double x=cord.latitude;
            double y=cord.longitude;

            //(x0,y0) is the real current location of the train
            double dist=Haversine.distance(x,y,x0,y0);
            if(dist<Min_dist)
            {
                Min_dist=dist;
                train_index=i;
                list_checker=2;
            }
        }
        Result res=new Result();

        if(list_checker==1)
        {

            res.setList(list1,train_index,list_checker,node1,node2);
            return res;
        }
        else
        {
            res.setList(list2,train_index,list_checker,node2,node3);
            return res;
        }


    }

    public ArrayList<LatLng> getList(int a, int b)
    {
        String key=a+","+b;
        //System.out.println("key: "+key);
        //SharedPreferences sharedPreferences = context.getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);

        DbHandler db=new DbHandler(context);
        //ArrayList<LatLng>coordinates_list=db.read(key);

       // Log.i("myfilter", "getList: listsize(): "+coordinates_list.size());
        //return coordinates_list;   //it may reurn null
        return null;
    }


    *****ERROR****
    //There is a big mistake while calculating first_portion_distance
    //& last_portion_distance bcz there is no logic that defines that
    // first_portion_list will between Train Node (0) & node1. 
    //same goes for node2 also. 

    public DistanceCost getTotal_Cost(ArrayList<LatLng>coordinates_list,int TrainIndex,int node1,int node2)
    {


        double x1,x2,y1,y2,total_distance=0;
        for(int i=0,j=i+1;i<coordinates_list.size()-1;i++,j++)
        {
            LatLng cord = coordinates_list.get(i);
            LatLng cord1 = coordinates_list.get(j);

            x1 = cord.latitude;
            y1 = cord.longitude;
            x2 = cord1.latitude;
            y2 = cord1.longitude;
            double dist = Haversine.distance(x1, y1, x2, y2);
            total_distance += dist;
        }
        double first_portion_distance=0;
        ArrayList<LatLng>first_portion_list=new ArrayList<>();
        for(int i=TrainIndex,j=i-1;j>=0;i--,j--)
        {
            LatLng cord = coordinates_list.get(i);
            LatLng cord1 = coordinates_list.get(j);

            x1 = cord.latitude;
            y1 = cord.longitude;
            x2 = cord1.latitude;
            y2 = cord1.longitude;
            double dist = Haversine.distance(x1, y1, x2, y2);
            first_portion_distance += dist;
            first_portion_list.add(cord);
        }
        double last_portion_distance=0;
        ArrayList<LatLng>last_portion_list=new ArrayList<>();
        for(int i=TrainIndex,j=i+1;j<coordinates_list.size()-1;i++,j++)
        {
            LatLng cord = coordinates_list.get(i);
            LatLng cord1 = coordinates_list.get(j);

            x1 = cord.latitude;
            y1 = cord.longitude;
            x2 = cord1.latitude;
            y2 = cord1.longitude;
            double dist = Haversine.distance(x1, y1, x2, y2);
            last_portion_distance += dist;
            last_portion_list.add(cord);
        }

        System.out.println("nodes:  "+node1 +"  "+node2);

        DistanceCost cost=new DistanceCost();
        cost.setFirst_portion_distance(first_portion_distance);
        cost.setLast_portion_distance(last_portion_distance);
        cost.setFirst_portion_list(first_portion_list);
        cost.setLast_portion_list(last_portion_list);
        cost.setTotal_distance(total_distance);
        cost.setNode1(node1);
        cost.setNode2(node2);

        return cost;
    }



    void NodeToCoordinateListConverter(ArrayList<Integer> path,ArrayList<LatLng> TrainToNearestJunctionList)
    {
        //after every location changes previous blues lines are removed by below condition
        if(!line_arr.isEmpty())
        {
            for(int i=0;i<line_arr.size();i++)
            {
                Polyline line=line_arr.get(i);
                line.remove();
                line=null;
            }

           // System.out.println("Line Removed "+line_arr.size());
        }
        ArrayList<LatLng> main_list = new ArrayList<>(TrainToNearestJunctionList);
        //DrawRouteCurveLine(TrainToNearestJunctionList);

        for(int i=1,j=i+1;j<path.size();i++,j++)
        {
            ArrayList<LatLng>temp_list=getList(path.get(i),path.get(j));    //fetching lists from sqlite

            //DrawRouteCurveLine(temp_list);
            main_list.addAll(temp_list);

        }
        DrawRouteCurveLine(main_list);
    }
    /*
    * this function used to draw  blue curve line visually on the google map by polyline()
    * */
      void DrawRouteCurveLine(ArrayList<LatLng> list)
     {

        // LatLng lt=new LatLng(x1,y1);
        // LatLng lt1=new LatLng(x2,y2);
        PolylineOptions pop=new PolylineOptions();


            pop.addAll(list).width(12).color(Color.parseColor("#00CC99")).geodesic(true);
            //MapsActivity.mMap.clear();
            line= MapsActivity.mMap.addPolyline(pop);
            line_arr.add(line);
            LatLngBounds.Builder builder = new LatLngBounds.Builder();

            for (LatLng latLng : list) {
                builder.include(latLng);
            }

             try{
                 LatLngBounds bounds = builder.build();
                 //BOUND_PADDING is an int to specify padding of bound.. try 100.
                 CameraUpdate cu = CameraUpdateFactory.newLatLngBounds(bounds,100);
                 mMap.animateCamera(cu);
             }catch (IllegalStateException e)
             {
                 System.out.println(e);
             }



    }

}
