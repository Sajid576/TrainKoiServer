haversine=require('../RouteBuilderModel/Haversine');

class Point{
     x;
     y;
     constructor(X,Y)
     {
         this.x=X;
         this.y=Y;
     }
}

function FindAllPoints( start, end, minDistance)
{
    var dx = end.x - start.x;
    var dy = end.y - start.y;
    
    //int numPoints = (int) ((Math.sqrt(dx * dx + dy * dy) /  minDistance) -1);
    var Dist= haversine.getDistance(start.x,start.y,end.x,end.y);
    Dist=Dist*1000;
    var numPoints=Math.ceil((Dist/minDistance)-1);
    var result=[]


    var stepx = dx / numPoints;
    var stepy = dy / numPoints;
    var px = start.x + stepx;
    var py = start.y + stepy;


    px=Number(px.toFixed(6));
    py=Number(py.toFixed(6));
    
    
    for (var ix = 0; ix < numPoints; ix++)
    {
        
        result.push(px+","+py);
        

        px += stepx;
        py += stepy;
        
        px=Number(px.toFixed(6));
        py=Number(py.toFixed(6));
    }

    return result;
}
function roundTosix(num) {    
    return Number(Math.round(num + "e+6")  + "e-6");
}
module.exports={
    FindAllPoints,
    Point
}