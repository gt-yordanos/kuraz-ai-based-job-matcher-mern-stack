import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../Contexts/AuthContext';
import MessagePopup from '../Components/MessagePopup';
import ProfileForm from '../Components/profileForm';
import ProfileSwitch from '../Components/profileSwitch';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', email: '', phone: '', birthday: '', gender: '',
    skills: { hardSkills: [], softSkills: [] }, experience: [{}], education: [{}], location: '', resume: null,
  });
  const [savedData, setSavedData] = useState({ ...profileData });
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(() => {
    return parseInt(localStorage.getItem('currentStep')) || 0;
  });
  const [popup, setPopup] = useState({ open: false, message: '', messageType: 'success' });
  const [profileScore, setProfileScore] = useState(0);
  const [personalInfoStatus, setPersonalInfoStatus] = useState('Incomplete');
  const [educationStatus, setEducationStatus] = useState('Incomplete');
  const [experienceStatus, setExperienceStatus] = useState('Incomplete');
  const [skillsStatus, setSkillsStatus] = useState('Incomplete');

  useEffect(() => {
    if (user) fetchProfileData();
    else {
      const timer = setTimeout(() => navigate('/login'), 3000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  useEffect(() => {
    localStorage.setItem('currentStep', step);
  }, [step]);

  const calculateProfileCompletion = (profileData) => {
    let completion = 0;

    const personalInfoFilled = profileData.firstName && profileData.lastName && profileData.email &&
                               profileData.phone && profileData.birthday && profileData.gender &&
                               profileData.location;

    const personalInfoStatus = personalInfoFilled ? 'Filled' : 'Incomplete';
    if (personalInfoFilled) completion += 30;

    const educationFilled = profileData.education.length > 0 && profileData.education.every(edu => 
      edu.degree && edu.institution && edu.major && edu.graduationYear && edu.cgpa);
    
    const educationStatus = educationFilled ? 'Filled' : 'Incomplete';
    if (educationFilled) completion += 25;

    const experienceFilled = profileData.experience.length > 0 && profileData.experience.every(exp => 
      exp.jobTitle && exp.company && exp.startDate && exp.jobType && exp.description && exp.endDate);
    
    const experienceStatus = experienceFilled ? 'Filled' : 'Incomplete';
    if (experienceFilled) completion += 25;

    const skillsFilled = profileData.skills.hardSkills.length > 0 || profileData.skills.softSkills.length > 0;
    const skillsStatus = skillsFilled ? 'Filled' : 'Incomplete';
    if (skillsFilled) completion += 20

    return {
      totalCompletion: completion,
      personalInfo: personalInfoStatus,
      education: educationStatus,
      experience: experienceStatus,
      skills: skillsStatus,
    };
  };

  const fetchProfileData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { id: userId } = jwtDecode(token);
        const { data } = await Axios.get(`http://localhost:5000/api/applicants/${userId}`);
        setProfileData(data);
        setSavedData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setPopup({ open: true, message: 'Error fetching profile data. Please try again.', messageType: 'error' });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { totalCompletion, personalInfo, education, experience, skills } = calculateProfileCompletion(savedData);
    setProfileScore(Math.max(totalCompletion, 0));
    setPersonalInfoStatus(personalInfo);
    setEducationStatus(education);
    setExperienceStatus(experience);
    setSkillsStatus(skills);
  }, [savedData]);

  const handleChange = ({ target: { name, value } }) => {
    setProfileData(prev => ({ ...prev, [name]: value || '' }));
  };

  const handleArrayChange = (index, name, value, array) => {
    const newArray = [...profileData[array]];
    newArray[index] = { ...newArray[index], [name]: value || '' };
    setProfileData(prev => ({ ...prev, [array]: newArray }));
  };

  const addArrayItem = (array) => {
    setProfileData(prev => ({ ...prev, [array]: [...prev[array], {}] }));
  };

  const removeArrayItem = (index, array) => {
    const newArray = profileData[array].filter((_, i) => i !== index);
    setProfileData(prev => ({ ...prev, [array]: newArray }));
  };

  const hardSkillsOptions =  [
    // Technology
    'JavaScript', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin', 
    'C++', 'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Django', 
    'Flask', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL', 
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Git', 'Jenkins', 
    'Webpack', 'TypeScript', 'GraphQL', 'REST APIs', 'Microservices', 'Machine Learning', 
    'Data Analysis', 'AI', 'Cybersecurity', 'DevOps', 'Blockchain', 'Big Data', 
    'IoT', 'AR/VR', 'UI/UX Design', 'Mobile App Development', 'Game Development', 
    'SaaS', 'PWA', 'SEO', 'Cloud Computing', 'Business Intelligence', 'Agile', 
    'Scrum', 'Test Automation', 'Manual Testing', 'Performance Testing', 'Load Testing', 
    'Ethical Hacking', 'Penetration Testing', 'Network Security', 'Data Encryption',
    'SwiftUI', 'Flutter', 'Raspberry Pi', 'Arduino', 
    'TensorFlow', 'PyTorch', 'Hadoop', 'Spark', 'SAS', 'MATLAB', 
    'VHDL', 'Verilog', 'HTML5', 'CSS3', 'WebAssembly', 
    'Redis', 'ElasticSearch', 'Apache Kafka', 
    'Solidity', 'Hyperledger', 'Jupyter Notebooks', 'Power BI', 
    'Tableau', 'R', 'Selenium', 'Appium', 'Cypress', 'Terraform', 
    'Ansible', 'Chef', 'Puppet', 'ServiceNow', 'SAP', 
    'Oracle', 'Microsoft Dynamics', 'IBM Watson', 'Salesforce', 
    'Zoho', 'Adobe Creative Suite', 'Figma', 'Sketch', 'InVision', 
    'Adobe XD', 'Bash', 'PowerShell', 'Clojure', 'Rust', 
    'Dart', 'Go', 'Elixir', 'Julia', 'COBOL', 'Fortran', 
    'Haskell', 'Lisp', 'Pascal', 'Smalltalk', 'Prolog',

    // Business
    'Project Management', 'Business Analysis', 'Market Research', 'Sales', 
    'Digital Marketing', 'Brand Management', 'Customer Relationship Management', 
    'E-commerce', 'Financial Analysis', 'Accounting', 'Investment Management', 
    'Human Resources', 'Change Management', 'Strategic Planning', 'Risk Management', 
    'Negotiation', 'Leadership', 'Team Management', 'Presentation Skills', 
    'Public Speaking', 'Salesforce', 'HubSpot', 'Google Analytics', 'Social Media Management', 
    'Content Marketing', 'Email Marketing', 'Event Planning', 'Operations Management', 
    'Supply Chain Management', 'Procurement', 'Quality Assurance', 'Lean Six Sigma', 
    'Data Visualization', 'Market Segmentation', 'Competitive Analysis', 
    'Product Development', 'Entrepreneurship', 'Startups',  

    // Health
    'Patient Care', 'Nursing', 'Healthcare Administration', 'Medical Billing', 
    'Health Information Management', 'Public Health', 'Clinical Research', 
    'Pharmacy', 'Nutrition', 'Physical Therapy', 'Occupational Therapy', 
    'Mental Health Counseling', 'Emergency Response', 'Health Education', 
    'Laboratory Skills', 'Diagnostic Imaging', 'Radiology', 'Anatomy', 
    'Pharmacology', 'Healthcare Compliance', 'Telehealth', 'EHR Management', 
    'Surgical Assistance', 'Infection Control', 'Home Health Care', 'Patient Advocacy',

    // Engineering
    'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 
    'Software Engineering', 'Chemical Engineering', 'Aerospace Engineering', 
    'Environmental Engineering', 'Industrial Engineering', 'Systems Engineering', 
    'Project Engineering', 'CAD Software', '3D Modeling', 'Structural Analysis', 
    'Thermodynamics', 'Fluid Dynamics', 'Robotics', 'Manufacturing Processes', 
    'Quality Control', 'Lean Manufacturing', 'Materials Science', 'Geotechnical Engineering', 
    'Transportation Engineering', 'Safety Management', 'Engineering Management',
    'Renewable Energy', 'Data Structures', 'Algorithms', 'Embedded Systems',
    'Microcontrollers', 'Automation', 'Control Systems', 'Signal Processing',
];
  const softSkillsOptions =  [
    'Communication',
    'Teamwork',
    'Problem Solving',
    'Adaptability',
    'Critical Thinking',
    'Time Management',
    'Creativity',
    'Leadership',
    'Conflict Resolution',
    'Emotional Intelligence',
    'Work Ethic',
    'Interpersonal Skills',
    'Decision Making',
    'Resilience',
    'Collaboration',
    'Flexibility',
    'Initiative',
    'Persuasion',
    'Active Listening',
    'Networking',
    'Innovation',
    'Self-Motivation',
    'Attention to Detail',
    'Positive Attitude',
    'Stress Management',
    'Strategic Planning',
    'Time Adaptability',
];

  const saveProfileData = async (section) => {
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).id;
    const payload = section === 'personal' ? {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      birthday: profileData.birthday,
      gender: profileData.gender,
      location: profileData.location,
      resume: profileData.resume,
    } : section === 'education' ? { education: profileData.education } : section === 'experience' ? { experience: profileData.experience } : { skills: profileData.skills };

    try {
      await Axios.put(`http://localhost:5000/api/applicants/${userId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPopup({ open: true, message: `${section.charAt(0).toUpperCase() + section.slice(1)} info saved successfully!`, messageType: 'success' });

      setSavedData(prevSavedData => ({
        ...prevSavedData,
        ...payload,
      }));

      return true;
    } catch (error) {
      setPopup({ open: true, message: 'Error saving data. Please try again.', messageType: 'error' });
      return false;
    }
  };

  const handleNextStep = async () => {
    let isValid = true;

    if (step === 0) {
      isValid = profileData.firstName && profileData.lastName && profileData.email &&
                profileData.phone && profileData.birthday && profileData.gender && profileData.location;
    } else if (step === 1) {
      isValid = profileData.education.every(edu => edu.degree && edu.institution && edu.major && edu.graduationYear && edu.cgpa);
    } else if (step === 2) {
      isValid = profileData.experience.every(exp => 
        exp.jobTitle && exp.company && exp.startDate && exp.jobType && exp.description && exp.endDate);
    } else if (step === 3) {
      isValid = profileData.skills.hardSkills.length > 0 || profileData.skills.softSkills.length > 0;
    }

    if (isValid) {
      const sectionNames = ['personal', 'education', 'experience', 'skills'];
      const isSaved = await saveProfileData(sectionNames[step]);
      if (isSaved) {
        setStep(prev => Math.min(prev + 1, 3));
      }
    } else {
      setPopup({ open: true, message: 'Please fill all required fields!', messageType: 'error' });
    }
  };

  return (
    <>
      <ProfileSwitch 
        savedData={savedData} 
        profileScore={profileScore} 
        step={step} 
        setStep={setStep} 
        personalInfoStatus={personalInfoStatus}
        educationStatus={educationStatus}
        experienceStatus={experienceStatus}
        skillsStatus={skillsStatus} 
      />

      <ProfileForm 
        step={step} 
        profileData={profileData} 
        handleChange={handleChange} 
        hardSkillsOptions={hardSkillsOptions} 
        softSkillsOptions={softSkillsOptions} 
        handleArrayChange={handleArrayChange} 
        addArrayItem={addArrayItem} 
        removeArrayItem={removeArrayItem} 
        handleNextStep={handleNextStep} 
        setProfileData={setProfileData}
        handlePrevStep={() => setStep(prev => Math.max(prev - 1, 0))} 
      />
      <MessagePopup open={popup.open} message={popup.message} messageType={popup.messageType} onClose={() => setPopup({ ...popup, open: false })} />
    </>
  );
};

export default Profile;
