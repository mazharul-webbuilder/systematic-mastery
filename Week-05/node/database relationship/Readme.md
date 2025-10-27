# MongoDB Relationships Guide

A comprehensive guide to modeling relationships in MongoDB using Mongoose, covering different approaches and their trade-offs.

## Table of Contents

- [Overview](#overview)
- [Trade-offs](#trade-offs)
- [Relationship Approaches](#relationship-approaches)
    - [1. Using References (Normalization)](#1-using-references-normalization)
    - [2. Using Embedded Documents (Denormalization)](#2-using-embedded-documents-denormalization)
    - [3. Hybrid Approach](#3-hybrid-approach)
- [Validating ObjectId](#validating-objectid)
- [Best Practices](#best-practices)

---

## Overview

MongoDB provides flexibility in how you model relationships between documents. Unlike traditional relational databases, you can choose between referencing documents or embedding them based on your specific use case.

---

## Trade-offs

The key decision when modeling relationships is balancing between:

| Approach | Focus | Use Case |
|----------|-------|----------|
| **Normalization (References)** | Consistency | Data integrity is critical |
| **Denormalization (Embedding)** | Performance | Read performance is priority |

---

## Relationship Approaches

### 1. Using References (Normalization)

**Pros:** ✅ Data consistency, single source of truth  
**Cons:** ❌ Requires additional queries or population

#### Data Structure

```javascript
// Separate collections
let author = {
  _id: ObjectId("..."),
  name: 'Mosh'
}

let course = {
  _id: ObjectId("..."),
  name: 'Node.js Course',
  author: ObjectId("...") // Reference to author
}
```

#### Schema Definition

```javascript
const courseSchema = new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author' // Model name to reference
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Course = mongoose.model('Course', courseSchema);
```

#### Querying with Population

```javascript
// Basic population
const courses = await Course
  .find()
  .populate('author');

// Multiple populations
const courses = await Course
  .find()
  .populate('author')
  .populate('category');

// Selective field population
const courses = await Course
  .find()
  .populate('author')
  .populate('category', 'name -_id') // Include 'name', exclude '_id'
  .select('name author'); // Select specific fields from Course
```

**Population Options:**
- `.populate('author')` - Populate entire author document
- `.populate('category', 'name -_id')` - Include only 'name', exclude '_id'
- `.select('name author')` - Select specific fields from the main document

---

### 2. Using Embedded Documents (Denormalization)

**Pros:** ✅ Better read performance, single query  
**Cons:** ❌ Data duplication, potential inconsistency

#### Data Structure

```javascript
let course = {
  _id: ObjectId("..."),
  name: 'Node.js Course',
  author: {
    name: 'Mosh',
    bio: 'Software Engineer'
  }
}
```

#### Schema Definition

```javascript
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String
});

const courseSchema = new mongoose.Schema({
  name: String,
  author: authorSchema // Embedded subdocument
});

const Course = mongoose.model('Course', courseSchema);
```

#### Querying

```javascript
// Single query - no population needed
const courses = await Course.find();
// Author data is already embedded
```

---

### 3. Hybrid Approach

**Pros:** ✅ Balance between consistency and performance  
**Cons:** ⚠️ More complex to maintain

Best used when you need quick access to some properties while maintaining a reference to the full document.

#### Data Structure

```javascript
// Author collection (50+ properties)
let author = {
  _id: ObjectId("..."),
  name: 'Mosh',
  bio: 'Software Engineer',
  website: 'example.com',
  // ... 47 other properties
}

// Course collection (embedded subset + reference)
let course = {
  _id: ObjectId("..."),
  name: 'Node.js Course',
  author: {
    id: ObjectId("..."), // Reference for full data
    name: 'Mosh'         // Cached for quick access
  }
}
```

#### Schema Definition

```javascript
const courseSchema = new mongoose.Schema({
  name: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
    },
    name: String // Frequently accessed field
  }
});

const Course = mongoose.model('Course', courseSchema);
```

#### Usage

```javascript
// Quick display - no population needed
const courses = await Course.find().select('name author.name');

// Full author details when needed
const course = await Course.findById(id).populate('author.id');
```

---

## Validating ObjectId

When working with references, it's important to validate ObjectId values.

### Method 1: Using Mongoose

```javascript
const mongoose = require('mongoose');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Usage
if (!isValidObjectId(req.params.id)) {
  return res.status(400).send('Invalid ID');
}
```

### Method 2: Custom Validation in Schema

```javascript
const courseSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    validate: {
      validator: function(v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: props => `${props.value} is not a valid ObjectId!`
    }
  }
});
```

### Method 3: Route Parameter Validation

```javascript
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/courses/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid course ID');
  }
  
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).send('Course not found');
  
  res.send(course);
});
```

---

## Best Practices

### When to Use References (Normalization)

- ✅ Data changes frequently
- ✅ Data is accessed independently
- ✅ Many-to-many relationships
- ✅ Data integrity is critical
- ✅ Avoiding duplication is priority

**Example:** User profiles, product catalogs

### When to Use Embedding (Denormalization)

- ✅ Data rarely changes
- ✅ Always accessed together
- ✅ One-to-few relationships
- ✅ Read performance is critical
- ✅ Document size stays under 16MB

**Example:** Blog post with comments, order with items

### When to Use Hybrid Approach

- ✅ Large referenced documents
- ✅ Need quick access to some fields
- ✅ Still need full document occasionally
- ✅ Balancing performance and consistency

**Example:** Courses with author name cached

---

## Query Performance Comparison

| Approach | Queries Needed | Performance | Consistency |
|----------|---------------|-------------|-------------|
| References | 2+ (with populate) | ⚡ Slower | ✅ High |
| Embedded | 1 | ⚡⚡⚡ Fastest | ⚠️ Manual sync needed |
| Hybrid | 1 (cached) or 2 (full) | ⚡⚡ Fast | ⚠️ Moderate |

---

## Additional Resources

- [MongoDB Data Modeling](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/)
- [Mongoose Population](https://mongoosejs.com/docs/populate.html)
- [Mongoose Schema Types](https://mongoosejs.com/docs/schematypes.html)

---

## License

This is a personal learning note. Feel free to use and modify as needed.

---

**Last Updated:** October 2025