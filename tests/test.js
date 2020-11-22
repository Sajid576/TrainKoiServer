
const timeEstimator=require('../api/model/TimeEstimatorModel/TimeEstimator');


test("check estimateTime():  ",()=>{
    expect(
        timeEstimator.estimateTime(23.22,11)
    ).toBe(31)   
})