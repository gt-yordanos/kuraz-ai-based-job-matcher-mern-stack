// backend/controllers/skillsAndMajorsController.js
import SoftSkills from '../data/SoftSkills.js';
import HardSkills from '../data/Hardskills.js';
import Majors from '../data/Majors.js';

export const getSkillsAndMajors = (req, res) => {
    res.json({
        softSkills: SoftSkills,
        hardSkills: HardSkills,
        majors: Majors,
    });
};
