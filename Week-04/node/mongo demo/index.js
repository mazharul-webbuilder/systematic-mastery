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

async function updateCourse(id) {
    // Approach : Query First
    // findById()
    // Modify its properties
    // Save()

    // Approach: Update first
    // Update directly
    // Optionally: get the updated document

    const course = await Course.findById(id)
    course.isPublished = true
    course.author = 'Mazharul Islam'

    course.set({
        isPublished: true,
        author: 'Mazharul Islam'
    })
    const result = await course.save();
    console.log(result)

// MongoDB provides a variety of update operators, including:
// $set   - Sets the value of a field
// $inc   - Increments the value of a field
// $mul   - Multiplies the value of a field
// $rename - Renames a field
// $unset - Removes a field
// $min   - Updates the field if the specified value is less than the current value
// $max   - Updates the field if the specified value is greater than the current value
// $currentDate - Sets the field to the current date
// $addToSet   - Adds a value to an array only if it doesn’t already exist
// $pop   - Removes the first or last element of an array
// $pull  - Removes all array elements that match a condition
// $push  - Adds an element to an array
// $each  - Used with $push to add multiple elements
// $position - Used with $push to specify the position to insert an element
// $slice    - Used with $push to limit the number of array elements
// $sort     - Used with $push to sort array elements

    const course2 = await Course.findByIdAndUpdate({_id: id}, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    }, {new: true})

    console.log(course2)


}

async function removeCourse(id){
   const result = await Course.deleteOne({_id: id})
}

// getCourses()
// updateCourse('68f9e4abc27fb719467399c6')