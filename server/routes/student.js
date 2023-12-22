const router = require("express").Router();
const Student=require("../models/Student")
const Grade=require('../models/Grade');
const Calendar=require('../models/Calendar')
const { ObjectId } = require('mongoose').Types; // Import ObjectId

// student

router.get("/student/:id", async (req, res) => {
  try {
    const user = await Student.findById(req.params.id);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/student",async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await Student.find().sort({ _id: -1 }).limit(5)
      : await Student.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/student/:id", async (req, res) => {
  try {
    const updatedUser = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/student/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});



// grade

router.post("/student/:id/grade", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const student = await Grade.findById(id);
    student.subjects.push(...newData.subjects);
    await student.save();

    res.status(201).json(student); 
   } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/student/:id/grade/:weekId", async (req, res) => {
  const { id, weekId } = req.params;
  try {
    const student = await Grade.findById(id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    student.weeks = student.weeks.filter(week => week._id.toString() !== weekId);
    await student.save();
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/student/grade", async (req, res) => {
  try {
    const newStudent = new Grade({
      name: req.body.name,
      privatenumber:req.body.privatenumber
    });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/student/:id/grade", async (req, res) => {
  try {
    await Grade.findByIdAndDelete(req.params.id);
    res.status(200).json("Grade has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/student/:id/grade", async (req, res) => {
  try {
    const user = await Grade.findById(req.params.id);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/grade",async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await Grade.find().sort({ _id: -1 }).limit(5)
      : await Grade.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put("/student/:id/grade", async (req, res) => {
  try {
    const updatedUser = await Grade.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//calendar


router.post('/calendar', async (req, res) => {
  const { title,start,end } = req.body;
  console.log(req.body);

  try {
    const newEvent = new Calendar({title,start,end});

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/calendar', async (req, res) => {
  try {
    const allEvents = await Calendar.find();
    res.status(200).json(allEvents);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/calendar/:id', async (req, res) => {
  try {
    await Calendar.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");

  } catch (error) {
    console.error('Error deleting documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports=router