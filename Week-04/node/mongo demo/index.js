import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/mongoplayground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Could not connect to mongodb'))

const CourseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
})

const Course = mongoose.model('Course', CourseSchema)

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['Angular', 'frontend'],
        isPublished: true
    })
    const result = await course.save()
    console.log(result)
}

async function getCourses() {
    // Comparison Operator in mongodb
    // eq (equal)
    // ne (not equal)
    // gt ( greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)
    const courses = await Course
        .find({author: 'Mosh', isPublished: true})
        .limit(1)
        .sort({name: 1}) // ascending order
        .select({name: 1, tags: 1})
    console.log(courses)
}

getCourses()
