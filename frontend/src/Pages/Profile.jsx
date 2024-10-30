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
    skills: [], experience: [{}], education: [{}], location: '', resume: null,
  });
  const [savedData, setSavedData] = useState({ ...profileData });
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(() => {
    // Retrieve step from localStorage or default to 0
    return parseInt(localStorage.getItem('currentStep')) || 0;
  });
  const [popup, setPopup] = useState({ open: false, message: '', type: 'success' });
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
    // Update localStorage whenever step changes
    localStorage.setItem('currentStep', step);
  }, [step]);

  const calculateProfileCompletion = (profileData) => {
    let completion = 0;

    // Check personal information
    const personalInfoFilled = profileData.firstName && profileData.lastName && profileData.email &&
                               profileData.phone && profileData.birthday && profileData.gender &&
                               profileData.location;

    const personalInfoStatus = personalInfoFilled ? 'Filled' : 'Incomplete';
    if (personalInfoFilled) completion += 30;

    // Check education
    const educationFilled = profileData.education.length > 0 && profileData.education.every(edu => 
      edu.degree && edu.institution && edu.major && edu.graduationYear && edu.cgpa);
    
    const educationStatus = educationFilled ? 'Filled' : 'Incomplete';
    if (educationFilled) completion += 25;

    // Check experience
    const experienceFilled = profileData.experience.length > 0 && profileData.experience.every(exp => 
      exp.jobTitle && exp.company && exp.startDate && exp.jobType && exp.description && exp.endDate);
    
    const experienceStatus = experienceFilled ? 'Filled' : 'Incomplete';
    if (experienceFilled) completion += 25;

    // Check skills
    const skillsFilled = profileData.skills.length > 1;
    const skillsStatus = skillsFilled ? 'Filled' : 'Incomplete';
    if (skillsFilled) completion += 20;

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
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Calculate profile score and update completion statuses
    const { totalCompletion, personalInfo, education, experience, skills } = calculateProfileCompletion(savedData);
    setProfileScore(Math.max(totalCompletion, 0)); // Ensure non-negative number

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
      setPopup({ open: true, message: `${section.charAt(0).toUpperCase() + section.slice(1)} info saved successfully!`, type: 'success' });

      setSavedData(prevSavedData => ({
        ...prevSavedData,
        ...payload,
      }));

      return true;
    } catch (error) {
      setPopup({ open: true, message: 'Error saving data. Please try again.', type: 'error' });
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
      isValid = profileData.skills.length > 0;
    }

    if (isValid) {
      const sectionNames = ['personal', 'education', 'experience', 'skills'];
      const isSaved = await saveProfileData(sectionNames[step]);
      if (isSaved) {
        setStep(prev => Math.min(prev + 1, 3));
      }
    } else {
      setPopup({ open: true, message: 'Please fill all required fields!', type: 'error' });
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
        handleArrayChange={handleArrayChange} 
        addArrayItem={addArrayItem} 
        removeArrayItem={removeArrayItem} 
        handleNextStep={handleNextStep} 
        handlePrevStep={() => setStep(prev => Math.max(prev - 1, 0))} 
      />
      <MessagePopup open={popup.open} message={popup.message} type={popup.type} onClose={() => setPopup({ ...popup, open: false })} />
    </>
  );
};

export default Profile;
