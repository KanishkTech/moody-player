const express =require('express');
const multer = require('multer');
const uploadFile = require('../../service/storage.service');
const songModel = require('../Models/song.model');

const router = express.Router();

const uploads = multer({storage:multer.memoryStorage()});  
router.post('/songs',(uploads.single("song")),async(req,res)=>{
    console.log(req.body,req.file)
    const fileData=await uploadFile(req.file)
    console.log(fileData)


    const song = await songModel.create({
        title:req.body.title,
        artist :req.body.artist,
        song:fileData.url  ,
        mood:req.body.mood
    })

    res.status(201).json({
        message:"Song Created Successfully",
        song_Details:song
    })
})

router.get('/get-song',async(req,res)=>{
    const {mood} = req.query;

    const song = await songModel.find({mood})


    res.status(201).json({
        message:"Songs Fetched succeesully",
        songs:song
    })

})

module.exports =router;