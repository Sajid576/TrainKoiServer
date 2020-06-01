package com.example.trainkoi.GoogleMap_Activities;

import com.google.android.gms.maps.model.LatLng;

import java.util.ArrayList;

public class DistanceCost {
    private double total_distance;
    private double first_portion_distance;
    private double last_portion_distance;

    private int node1,node2;
    
    ArrayList<LatLng> first_portion_list;
    ArrayList<LatLng> last_portion_list;

    public void setFirst_portion_list(ArrayList<LatLng> first_portion_list) {
        this.first_portion_list = first_portion_list;
    }

    public void setLast_portion_list(ArrayList<LatLng> last_portion_list) {
        this.last_portion_list = last_portion_list;
    }

    public void setTotal_distance(double total_distance) {
        this.total_distance = total_distance;
    }

    public void setFirst_portion_distance(double first_portion_distance) {
        this.first_portion_distance = first_portion_distance;
    }

    public void setLast_portion_distance(double last_portion_distance) {
        this.last_portion_distance = last_portion_distance;
    }

    public void setNode1(int node1) {
        this.node1 = node1;
    }

    public void setNode2(int node2) {
        this.node2 = node2;
    }

    public double getTotal_distance() {
        return total_distance;
    }

    public double getFirst_portion_distance() {
        return first_portion_distance;
    }

    public ArrayList<LatLng> getFirst_portion_list() {
        return first_portion_list;
    }

    public ArrayList<LatLng> getLast_portion_list() {
        return last_portion_list;
    }

    public double getLast_portion_distance() {
        return last_portion_distance;
    }

    public int getNode1() {
        return node1;
    }

    public int getNode2() {
        return node2;
    }
}
