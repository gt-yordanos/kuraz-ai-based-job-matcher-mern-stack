import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const SwitchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0',
  borderRadius: 50,
  padding: 4,
  marginBottom: 16,
}));

const SwitchButton = styled('div')(({ selected, theme }) => ({
  padding: '16px',
  borderRadius: 20,
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

const ProfileSwitch = ({ steps, currentStep, onChange }) => {
  return (
    <SwitchContainer>
      {steps.map((Icon, index) => (
        <SwitchButton key={index} selected={currentStep === index} onClick={() => onChange(index)}>
          <Icon />
        </SwitchButton>
      ))}
    </SwitchContainer>
  );
};

export default ProfileSwitch;
