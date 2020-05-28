const express=require('express');
const router=express.Router();

//Get

router.get('/',(req,res,next)=>{

    res.status(200).json({
        message:'Hello Getting all contacts'
    })
})

//Get

router.get('/:id',(req,res,next)=>{

    res.status(200).json({
        message:'Hello Getting a contact',
        id:req.params.id  
    })
})

//post
router.post('/',(req,res,next)=>
{
    res.status(201).json({
        message:'Hello, I am post method'
    })
})

//put
router.put('/',(req,res,next)=>
{
    res.status(202).json({
        message:'Hello, I am put method'
    })
})

//delete
router.delete('/:id',(req,res,next)=>
{
    res.status(203).json({
        message:'Hello, I am delete method',
        id:req.params.id
    })
})

module.exports=router;