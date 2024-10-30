import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaUser, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { MdCheckCircle } from 'react-icons/md'; // Import the check icon

const SwitchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0',
  borderRadius: 50,
  padding: 4,
  marginBottom: 16,
  height: 55,
}));

const SwitchButton = styled('div')(({ selected, theme }) => ({
  position: 'relative', // Make the button relative for icon positioning
  borderRadius: 40,
  cursor: 'pointer',
  margin: '0 2px',
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: selected ? (theme.palette.mode === 'dark' ? '#fff' : '#000') : 'transparent',
  color: selected ? (theme.palette.mode === 'dark' ? '#000' : '#fff') : 'inherit',
  fontSize: 24,
}));

const ProfileSwitch = ({ savedData, profileScore, step, setStep, personalInfoStatus, educationStatus, experienceStatus, skillsStatus }) => {
  return (
    <div style={{ maxWidth: '400px', width: '97%', margin: '0 auto', textAlign: 'center' }}>
      <h1>Hi, {savedData.firstName}!</h1>
      <p>{getStatusMessage(profileScore)}</p>
      <LinearProgress variant="determinate" value={profileScore} sx={{ marginBottom: 2 }} />
      <p>{profileScore.toFixed(0)}%</p>
      <SwitchContainer>
        {[FaUser, FaGraduationCap, FaBriefcase, TipsAndUpdatesIcon].map((Icon, index) => (
          <SwitchButton key={index} selected={step === index} onClick={() => setStep(index)}>
            <Icon />
            {/* Add the green check icon if the section is completed */}
            {((index === 0 && personalInfoStatus === 'Filled') ||
              (index === 1 && educationStatus === 'Filled') ||
              (index === 2 && experienceStatus === 'Filled') ||
              (index === 3 && skillsStatus === 'Filled')) && (
              <MdCheckCircle style={{
                position: 'absolute',
                top: '30%', // Adjusted to be slightly higher
                right: '15px', // Adjusted to be closer to the icon
                transform: 'translateY(-50%)', // Centering adjustment
                color: 'green',
                fontSize: '1.2rem',
              }} />
            )}
          </SwitchButton>
        ))}
      </SwitchContainer>
    </div>
  );
};

const getStatusMessage = (profileScore) => {
  if (profileScore < 30) {
    return "You have a lot to fill in. Adding your personal details, education, and work experience will help Kuraz AI match you to suitable job opportunities.";
  } 
  if (profileScore < 50) {
    return "Your profile is getting started, but there's still some work to do. Completing your education and experience sections will significantly boost your chances of being ranked higher in job searches by Kuraz AI.";
  }
  if (profileScore < 75) {
    return "You're almost there! Fill in any missing details, especially in your work experience and skills. A complete profile will make you stand out and increase the likelihood of Kuraz AI recommending you for your dream job.";
  }
  if (profileScore < 100) {
    return "Great job! Your profile is nearly complete. Double-check to ensure all details are accurate and add any recent skills or experiences. A perfect profile helps Kuraz AI present you as a top candidate to employers.";
  }
  return "Excellent work! Your profile is fully complete. Kuraz AI will rank you among the top candidates for relevant job matches, increasing your chances of landing your ideal job.";
};

export default ProfileSwitch;
