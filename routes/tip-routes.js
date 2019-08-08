const express = require("express");
const router = express.Router();

const FrizTip = require("../models/FrizTip");


router.get("/friztips", async (req, res) => {

    try {
    const tips = await FrizTip.find()
    res.status(200).json(tips)
    }
    
    catch(error) {
        console.log(error)
        res.json({ message : error})
    }
    
    })
    
    router.post("/friztips/create", async (req, res) => {
    
        try {
        const tip = new FrizTip({
            title : req.body.title,
            tip : req.body.tip,
            author : req.body.author,
            maxDuration : req.maxDuration ? req.maxDuration : null
        })
    
        await tip.save()
    
        const tips = await FrizTip.find()
    res.status(200).json(tips)
    
        }
        
        catch(error) {
            console.log(error)
            res.json({ message : error})
        }   })
    
        router.post("/friztips/delete", async (req, res) => {
    
            try {
            const tip = await FrizTip.findById({
                _id : req.body.id
            })
        
            await tip.delete()
        
            const tips = await FrizTip.find()
        res.status(200).json(tips)
        
            }
            
            catch(error) {
                console.log(error)
                res.json({ message : error})
            }   })
    
            router.post("/friztips/update", async (req, res) => {
    
                try {
                const tip = await FrizTip.findById({
                    _id : req.body.id
                })
            
                tip.title = req.body.title
    
                tip.tip = req.body.tip
    
                if (req.body.author) {
                    tip.author = req.body.author
                }
            
                if (req.body.maxDuration) {
                    tip.maxDuration = req.body.maxDuration
                }
    
                await tip.save()
    
                const tips = await FrizTip.find()
            res.status(200).json(tips)
            
                }
                
                catch(error) {
                    console.log(error)
                    res.json({ message : error})
                }   })
                        
                module.exports = router;