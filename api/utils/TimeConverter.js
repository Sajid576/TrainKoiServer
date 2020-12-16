
//it will return real date time of Bangladesh
exports.getTimeNow=()=> {
    let offset=6;
    // create Date object for current location
    var d = new Date();
   
    // get UTC time in msec
    var utc = d.getTime();
   
    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    console.log(nd);
    return nd;
}

//it will return the date of few days back according to the _day parameter.
// if the current date is 16/12/20 and _day=2 ,it will return 14/12/20 
exports.getRecentPastDate=(currentDate,_day)=>{
    console.log(currentDate+","+_day);
    const date = new Date();
    date.setDate(currentDate.getDate() - Number(_day));
    return date;
}