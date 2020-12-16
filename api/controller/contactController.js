const ContactModel=require('../model/DbModel/ContactModel');
const TimeConverter=require('../utils/TimeConverter');

//used to store a new contact data into the table
exports.storeContactData=(req,res,next)=>
{
        
        let contact=new ContactModel({
            username:req.body.username,
            uid:req.body.uid,
            email:req.body.email,
            subject:req.body.subject,
            message:req.body.message,
            createdAt:TimeConverter.getTimeNow(),
        });
        contact.save().then((data)=>{
            res.status(200).json({
                data
            })
        }).catch(error => {
            res.status(404).json({
                message:error.message
            })
        })
}
//used to fetch all contact data in the contact table
exports.getAllContactData=(req,res,next)=>
{
    ContactModel.find()
    .then(contacts=>{
        res.json(contacts)
    })
    .catch((e)=>{
        res.json(e.message);
    })
}
/**
 * used to fetch recent(1/2/... days) list of contact data from contact table
 */
exports.getRecentContactData=(req,res,next)=>
{
        let time=req.params.time;
        let bdTimeDate=TimeConverter.getTimeNow();
        let newDate= TimeConverter.getRecentPastDate(bdTimeDate,time);
        console.log(newDate);
        ContactModel.find({ 
            createdAt: {
                $gte:new Date(newDate) ,
                $lt: new Date(bdTimeDate)
            }
        }).then((contacts)=>{
            res.status(200).json(contacts);
        }).catch((error)=>{
            res.json(error);
        })

        

}
