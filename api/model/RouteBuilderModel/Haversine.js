
//used to calculate distance between two coordinates
getDistance=function(train_lat,train_lon,lat,lon)
{
      
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(train_lat - lat); // deg2rad below
      var dLon = deg2rad(train_lon - lon);
      
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(lat)) * Math.cos(deg2rad(train_lat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
     
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              var d = R * c; // Distance in km
      return d;   //returns distance in KM
      

}
function deg2rad(deg) {
   return deg * (Math.PI / 180)
 }



module.exports.getDistance=getDistance;