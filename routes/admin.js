const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course, User } = require("../db");
const {JWT_SECRET} =  require("../config")

const router = Router();
const jwt = require("jsonwebtoken")
// Admin Routes
router.post('/signup',async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    //check if a user woth this usernaame already exxists
    await Admin.create({
        username: username,
        password : password
    })
    .then(function  () {res.status(201).json({message:"Admin created"})} )
    .catch(function (err){
       console.log('Error in Saving user to database', err);
       return res.status(500).json({ message: "An error occurred while creating the account." });
});
})
router.post('/signin', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const isValidated = await User.find({
        username,
        password
    })
    if(User){
        const token = jwt.sign({
            username
        }, JWT_SECRET)
        res.json({
            token
        })
    }else{
        res.status(411).json({
            message : "Incorrect email and password"
        })
    }

   
})
router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement admin signup logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    //zod
 const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    console.log(newCourse)
    res.json({
        message : "Course created successfully"
, courseId:newCourse._id
    })
});



router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});
    res.json({
        courses : response
    })

});


module.exports = router;