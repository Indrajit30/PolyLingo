const express = require('express');
const router = express.Router();

const { auth ,isInstructor,isStudent, isAdmin} = require('../middlewares/auth');
const {createCourse ,showAllCourses, getCourseDetails, editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails,} = require('../controllers/Courses');
const { createSection, deleteSection } = require('../controllers/Section')
const { updateSection } = require('../controllers/Section');
const {createSubSection, updateSubsection, deleteSubsection}=require('../controllers/SubSection')
const {createCategory,showAllCategories, categoryPageDetails,}=require('../controllers/Category')
const { createRating, getAverageRating, getAllRating } = require('../controllers/RatingAndReview');
// const { createRating, getAverageRating, getAllRating } = require('../controllers/RatingAndReview');
const { updateCourseProgress} = require("../controllers/courseProgress");
const { botres } = require('../controllers/Bot');

router.post('/botres', botres);

router.post('/createCourse', auth, isInstructor, createCourse);
router.post('/addSection', auth, isInstructor, createSection)
router.post('/updateSection', auth, isInstructor, updateSection)
router.delete('/deleteSection', auth, isInstructor, deleteSection);

router.post('/editCourse', auth, isInstructor, editCourse);
router.delete('/deleteCourse', auth, isInstructor, deleteCourse);

router.post('/addSubSection', auth, isInstructor, createSubSection);
router.post('/updateSubsection', auth, isInstructor, updateSubsection);
router.delete('/deleteSubsection', auth, isInstructor, deleteSubsection);

router.get('/getAllCourses', showAllCourses);
router.post('/getCourseDetails', getCourseDetails);
router.post('/getFullCourseDetails', auth, getFullCourseDetails);
router.get('/getInstructorCourses', auth, isInstructor, getInstructorCourses);

router.post('/createCategory', auth, isAdmin, createCategory);
router.get('/showAllcategories', showAllCategories);
router.post('/getcategoryPageDetails', categoryPageDetails);


router.post('/createRating', auth, isStudent, createRating);
router.get('/getAverageRating', getAverageRating);
router.get('/getReviews', getAllRating);

router.post('/updateCourseProgress', auth, isStudent,updateCourseProgress)
module.exports = router;
