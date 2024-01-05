const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");

mongoose.connect("mongodb://localhost:27017/recipe_db");

// Step 1: Create a dozen subscribers
const subscribersPromises = Array.from({ length: 12 }, (_, index) => {
  const subscriber = new Subscriber({
    name: `Subscriber${index + 1}`,
    email: `subscriber${index + 1}@example.com`,
    zipCode: Math.floor(Math.random() * (99999 - 10000 + 1) + 10000),
  });
  return subscriber.save();
});

// Step 2: Create half a dozen courses
const coursesPromises = Array.from({ length: 6 }, (_, index) => {
  const course = new Course({
    title: `Course${index + 1}`,
    description: `Description for Course${index + 1}`,
    items: ["item1", "item2"],
    zipCode: Math.floor(Math.random() * (99999 - 10000 + 1) + 10000),
  });
  return course.save();
});

// Step 3: Randomly associate subscribers with courses
Promise.all([Promise.all(subscribersPromises), Promise.all(coursesPromises)])
  .then(([subscribers, courses]) => {
    subscribers.forEach(subscriber => {
      const randomCourseIndex = Math.floor(Math.random() * courses.length);
      const randomCourse = courses[randomCourseIndex];
      subscriber.courses.push(randomCourse._id);
      subscriber.save();
    });
  })
  .then(() => {
    // Step 4: Log each subscriber with associated courses
    Subscriber.find({})
      .populate('courses')
      .exec()
      .then(subscribers => {
        subscribers.forEach(subscriber => {
          console.log(`${subscriber.getInfo()} Courses: ${subscriber.courses.map(course => course.title).join(', ')}`);
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  })
  .catch(error => {
    console.error(error.message);
  });
