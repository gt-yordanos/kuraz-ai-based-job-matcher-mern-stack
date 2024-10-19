// middleware/validationMiddleware.js

export const validateApplication = (req, res, next) => {
    const { applicantId, jobId, coverLetter, uploadedResume } = req.body;

    if (!applicantId || !jobId) {
        return res.status(400).json({ message: 'Applicant ID and Job ID are required.' });
    }

    // Additional validation can be added as needed
    next();
};
