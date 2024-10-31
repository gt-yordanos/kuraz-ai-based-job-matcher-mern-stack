import React, { useState, useEffect } from 'react';
import { Box, TextField, Chip, FormControl, Autocomplete } from '@mui/material';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const SkillSection = ({ profileData, setProfileData, hardSkillsOptions, softSkillsOptions }) => {
  const [hardSkillsInput, setHardSkillsInput] = useState('');
  const [softSkillsInput, setSoftSkillsInput] = useState('');

  useEffect(() => {
    // Set initial values from profileData when component mounts
    setHardSkillsInput(profileData.skills.hardSkills || []);
    setSoftSkillsInput(profileData.skills.softSkills || []);
  }, [profileData.skills]);

  const handleHardSkillSelect = (event, value) => {
    const newSkills = { ...profileData.skills, hardSkills: value };
    setProfileData(prev => ({ ...prev, skills: newSkills }));
  };

  const handleSoftSkillSelect = (event, value) => {
    const newSkills = { ...profileData.skills, softSkills: value };
    setProfileData(prev => ({ ...prev, skills: newSkills }));
  };

  return (
    <Box>
      <h2><TipsAndUpdatesIcon /> Skills</h2>
      <FormControl fullWidth sx={{ mb: 5 }}>
        <Autocomplete
          multiple
          options={hardSkillsOptions}
          value={profileData.skills.hardSkills || []}
          onChange={handleHardSkillSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Hard Skills"
              placeholder="Search hard skills..."
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option}
                label={option}
                {...getTagProps({ index })}
                onDelete={() => {
                  const newSkills = profileData.skills.hardSkills.filter((skill) => skill !== option);
                  setProfileData(prev => ({ ...prev, skills: { ...prev.skills, hardSkills: newSkills } }));
                }}
              />
            ))
          }
        />
      </FormControl>

      {/* Soft Skills Section */}
      <FormControl fullWidth>
        <Autocomplete
          multiple
          options={softSkillsOptions}
          value={profileData.skills.softSkills || []} // Show current soft skills
          onChange={handleSoftSkillSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Soft Skills"
              placeholder="Search soft skills..."
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option}
                label={option}
                {...getTagProps({ index })}
                onDelete={() => {
                  const newSkills = profileData.skills.softSkills.filter((skill) => skill !== option);
                  setProfileData(prev => ({ ...prev, skills: { ...prev.skills, softSkills: newSkills } }));
                }}
              />
            ))
          }
        />
      </FormControl>
    </Box>
  );
};

export default SkillSection;
