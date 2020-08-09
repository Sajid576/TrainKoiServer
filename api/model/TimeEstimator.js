var moment = require('moment');

var Avg_Intercity_speed=10;

function estimateTime(distance,velocity)
{

    //if the train speed is almost zero or it is stopped for few moments,then it will be initialized with 
    //average speed of the intercity train.
    if(velocity<2)
    {
        velocity=Avg_Intercity_speed;
    }

    distance=distance*1000; // km -> meter
    distance=distance.toFixed(2);

    time=distance/velocity;  //time (seconds)

    var msg= moment.unix(time).utc().format('H [ঘণ্টা,] m [মিনিট ] s [সেকেন্ড]')
    
    var timeInfo={
        'time':time,
         'msg':msg,
    };
    
    return timeInfo;
}

module.exports={
    estimateTime,
}