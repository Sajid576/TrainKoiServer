
const timeEstimator=require('../api/model/TimeEstimatorModel/TimeEstimator');

const TimeConverter = require('../api/utils/TimeConverter');

/*
test("check estimateTime():  ",()=>{
    expect(
        timeEstimator.estimateTime(23.22,11)
    ).toBe(31)   
})
*/
test("check Time Converter: ",()=>{

    expect(TimeConverter.getTimeNow()).toBe()
})
