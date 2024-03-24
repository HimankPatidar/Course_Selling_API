const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Create a new user
        const newUser = await User.create({ username, password });

        // Return success response
        res.json({ message: "User created successfully", user: newUser });
    } catch (error) {
        // Handle errors
        console.error("Error in user signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/signin', async (req, res) => {
    // Implement user signin logic
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token in response
        res.json({ token });
    } catch (error) {
        // Handle errors
        console.error("Error in user signin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/courses', async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({});
        res.json({ courses });
    } catch (error) {
        console.error("Error in fetching courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try {
        const courseId = req.params.courseId;
        const username = req.username;

        // Logic to purchase course
        // Example: Add courseId to user's purchasedCourses array

        res.json({ message: 'Course purchased successfully' });
    } catch (error) {
        console.error("Error in purchasing course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {
        const username = req.username;

        // Logic to fetch purchased courses for the user
        // Example: Retrieve user's purchasedCourses array and fetch corresponding course details

        res.json({ message: 'Purchased courses fetched successfully' });
    } catch (error) {
        console.error("Error in fetching purchased courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
