// backend/api/rank.js
import dbConnect from '../dbConnect.js';
import Applicant from '../models/Applicant.js';

export const calculateRank = async (req, res) => {
    await dbConnect();
    try {
        const applicants = await Applicant.find();
        
        applicants.forEach((applicant) => {
            // Example ranking logic (this can be customized)
            const score = applicant.skills.length * 10; // Just an example score calculation
            applicant.rank = score;
            applicant.save(); // Save updated rank
        });

        res.status(200).json({ message: 'Ranks calculated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
