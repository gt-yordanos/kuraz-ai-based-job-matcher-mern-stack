//backend/routes/indexe.js
import express from 'express';
import * as applicantController from '../api/applicants.js';
import * as jobController from '../api/jobs.js';
import * as applicationController from '../api/applications.js';
import * as analyticsController from '../api/analytics.js';
import * as hrStaffController from '../api/hrStaff.js';
import * as authController from '../api/auth.js';

const router = express.Router();

// Jobs Routes
router.post('/jobs', jobController.createJob);
router.get('/jobs', jobController.getJobs);
router.get('/jobs/:id', jobController.getJobById);
router.put('/jobs/:id', jobController.updateJob);
router.delete('/jobs/:id', jobController.deleteJob);

// Applications Routes
router.post('/applications', applicationController.createApplication);
router.get('/applications', applicationController.getApplications);
router.get('/applications/:id', applicationController.getApplicationById);
router.put('/applications/:id/status', applicationController.updateApplicationStatus);
router.delete('/applications/:id', applicationController.deleteApplication);

// Analytics Routes
router.get('/analytics', analyticsController.getAnalytics);
router.put('/analytics/:id', analyticsController.updateAnalytics);

// Applicants Routes
router.post('/applicants', applicantController.createApplicant);
router.get('/applicants', applicantController.getApplicants);
router.get('/applicants/:id', applicantController.getApplicantById);
router.put('/applicants/:id', applicantController.updateApplicant);
router.delete('/applicants/:id', applicantController.deleteApplicant);

// Authentication Routes
router.post('/applicant/signup', authController.applicantSignUp);
router.post('/applicant/login', authController.applicantLogin);
router.post('/hrstaff/signup', authController.hrStaffSignUp);
router.post('/hrstaff/login', authController.hrStaffLogin);

// HR Staff Routes
router.post('/hrstaff', hrStaffController.createHrStaff);
router.get('/hrstaff', hrStaffController.getHrStaff);
router.get('/hrstaff/:id', hrStaffController.getHrStaffById);
router.put('/hrstaff/:id', hrStaffController.updateHrStaff);
router.delete('/hrstaff/:id', hrStaffController.deleteHrStaff);

export default router;
