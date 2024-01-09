const router = require("express").Router();
const Grade=require('../models/Grade');
const Calendar=require('../models/Calendar');
const User = require("../models/User");
const { verifyTokenAndAuthorization, verifyTokenAndTeacher } = require("./verifyToken");


// grade
//qulis damateba
router.post("/student/:id/grade",verifyTokenAndTeacher, async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    console.log(newData.subjects);
    const student = await Grade.findById(id);
    student.subjects.push(...newData.subjects);
    await student.save();

    res.status(201).json(student); 
   } catch (err) {
    res.status(500).json(err);
  }
});

// qulis editi
router.put("/student/:id/grade/:subjectId", verifyTokenAndTeacher, async (req, res) => {
  const { id, subjectId } = req.params;
  const { grade } = req.body;

  try {
    const updatedUser = await Grade.findOneAndUpdate(
      { _id: id, "subjects._id": subjectId }, // Find by both student _id and subject _id within the array
      {
        $set: {
          "subjects.$[s].grades.$[g].grade": grade,
        },
      },
      {
        arrayFilters: [
          { "s._id": mongoose.Types.ObjectId(subjectId) },
          { "g._id": mongoose.Types.ObjectId(req.body.gradeId) },
        ],
        new: true,
      }
    );
    console.log(updatedUser);

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


//qulis washla
router.delete("/student/:id/grade/:subjectId",verifyTokenAndTeacher, async (req, res) => {
  const { id,subjectId } = req.params;
  try {
    const student = await Grade.findById(id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    student.subjects = student.subjects.filter(subject => subject._id.toString() !== subjectId);
    await student.save();
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json(err);
  }
});

//moswavlis damateba
router.post("/student",verifyTokenAndTeacher, async (req, res) => {
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
//moswavlis washla
router.delete("/student/:id",verifyTokenAndTeacher, async (req, res) => {
  try {
    await Grade.findByIdAndDelete(req.params.id);
    res.status(200).json("student has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// moswavlis saxelis editi
router.put("/student/:id/grade",verifyTokenAndTeacher, async (req, res) => {
  
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

//moswavle tavis qulebit
router.get("/student/:id/grade",verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await Grade.findById(req.params.id);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET USER
router.get("/find/:id",verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {accessToken, password, ...others } = user._doc;
    res.status(200).json(others);

  } catch (err) {
    res.status(500).json(err);
    return res.status(403).json("You are not allowed!");
  }
});

//yvela moswavle
router.get("/student/grade",verifyTokenAndAuthorization,async (req, res) => {
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





//calendar


router.post('/calendar',verifyTokenAndTeacher, async (req, res) => {
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

router.get('/calendar',verifyTokenAndAuthorization, async (req, res) => {
  try {
    const allEvents = await Calendar.find();
    res.status(200).json(allEvents);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/calendar/:id',verifyTokenAndTeacher, async (req, res) => {
  try {
    await Calendar.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");

  } catch (error) {
    console.error('Error deleting documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports=router
