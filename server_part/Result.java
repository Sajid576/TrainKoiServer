package com.example.trainkoi.GoogleMap_Activities;

import com.google.android.gms.maps.model.LatLng;

import java.util.ArrayList;

public class Result {
    //this temp_list is the most nearest list to the train
   ArrayList<LatLng> temp_list;
   int TrainIndex;
   int list_checker;
    int node1,node2;
   void  setList(ArrayList<LatLng> temp_list,int TrainIndex,int list_checker,int node1,int node2)
   {
       this.node1=node1;
       this.node2=node2;
       this.temp_list=temp_list;
       this.TrainIndex=TrainIndex;
       this.list_checker=list_checker;
   }

    public ArrayList<LatLng> getTemp_list() {
        return temp_list;
    }

    public int getTrainIndex() {
        return TrainIndex;
    }

    public int getList_checker() {
        return list_checker;
    }

    public int getNode1() {
        return node1;
    }

    public int getNode2() {
        return node2;
    }
}
