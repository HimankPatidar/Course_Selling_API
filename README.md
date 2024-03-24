# Course Selling API

This project implements a course selling API where users can sign up, sign in, purchase courses, and view purchased courses. Admins can sign up, sign in, create courses, and view all courses.

## Authentication

Authentication is done using JSON Web Tokens (JWT). In every authenticated request, clients need to send the JWT in the headers as follows:

## Admin Routes

- **POST /admin/signup**
  - Creates a new admin account.
  - Input Body: { username: 'admin', password: 'pass' }
  - Output: { message: 'Admin created successfully' }

- **POST /admin/signin**
  - Logs in an admin account.
  - Input Body: { username: 'admin', password: 'pass' }
  - Output: { token: 'your-token' }

- **POST /admin/courses**
  - Creates a new course.
  - Input: Headers: { 'Authorization': 'Bearer <your-token>' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
  - Output: { message: 'Course created successfully', courseId: "new course id" }

- **GET /admin/courses**
  - Returns all the courses.
  - Input: Headers: { 'Authorization': 'Bearer <your-token>' }
  - Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

## User Routes

- **POST /users/signup**
  - Creates a new user account.
  - Input: { username: 'user', password: 'pass' }
  - Output: { message: 'User created successfully' }

- **POST /users/signin**
  - Logs in a user account.
  - Input: { username: 'user', password: 'pass' }
  - Output: { token: 'your-token' }

- **GET /users/courses**
  - Lists all the courses.
  - Input: Headers: { 'Authorization': 'Bearer <your-token>' }
  - Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

- **POST /users/courses/:courseId**
  - Purchases a course. Replace courseId in the URL path with the ID of the course to be purchased.
  - Input: Headers: { 'Authorization': 'Bearer <your-token>' }
  - Output: { message: 'Course purchased successfully' }

- **GET /users/purchasedCourses**
  - Lists all the courses purchased by the user.
  - Input: Headers: { 'Authorization': 'Bearer <your-token>' }
  - Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

