const mongoose = require('mongoose');

// Connect to MongoDB
//mongodb+srv://patidarhimank005:viKrtMBIns6GWnld@cluster0.6idke6a.mongodb.net/
mongoose.connect('mongodb+srv://patidarhimank005:viKrtMBIns6GWnld@cluster0.6idke6a.mongodb.net/courses')
.then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
  


// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username : String,
    password : String,
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password : String,
    purchasedCourses : [{
        type : mongoose.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title : String,
    description : String,
    imageLink : String,
    price : Number,
    
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}