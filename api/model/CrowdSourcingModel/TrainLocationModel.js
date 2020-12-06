
class TrainLocationModel
{
    trainName;
    lat;
    lon;
    velocity;
    time;

    constructor(req)
    {   
        this.trainName =req.body.trainName;
        this.lat= req.body.latitude;
        this.lon= req.body.longitude;
        this.velocity= req.body.velocity;
        this.time= req.body.time;
    }
    getTrainName()
    {
        return this.trainName;
    }
    getLatitude()
    {
        return this.lat;
    }
    getLongitude()
    {
        return this.lon;
    }
    getTime()
    {
        return this.time;
    }
    getVelocity()
    {
        return this.velocity;
    }
    getJsonTrainData(){
        obj={
            latitude:this.getLatitude(),
            longitude:this.getLongitude(),
            velocity:this.getVelocity(),
            time:this.getTime()
        }
        return obj;
    }

}
module.exports=TrainLocationModel