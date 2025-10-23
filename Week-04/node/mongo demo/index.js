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

    // Logical Operators
    // or
    // and

    // Pagination
    const pageNumber = 1
    const pageSize = 10

    const courses = await Course
        // .find({price: {$gte: 10, $lte: 20}})
        // .find(({price: {$in: [10, 15, 20]}}))
        // .find({author: 'Mosh', isPublished: true})
        // .find()
        // .or([{author: 'Mosh'}, {isPublished: true}])
        // .and([{author: 'Mosh'}, {isPublished: true}])
        .find({author: /^Mosh/}) // Start with Mosh
        .find({author: /Hamedani$/}) // end with Hamedani
        .find({author: /.*Mosh.*/i})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1}) // ascending order
        .select({name: 1, tags: 1})

    console.log(courses)
}

getCourses()
