import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LinkedIn, Email, Phone, LocationOn } from '@mui/icons-material';
import jobImages from '../assets/JobImages';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AboutUs = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMediumScreen = useMediaQuery('(max-width:768px)');
  const isSmallScreen = useMediaQuery('(max-width:375px)');

  const containerStyle = {
    padding: isSmallScreen ? '8px' : '15px',
    color: isDarkMode ? '#fff' : '#000',
    minHeight: '100vh',
    paddingLeft: isMediumScreen ? '0' : '30px', // Add left padding on larger screens
    paddingRight: isMediumScreen ? '0' : '30px', // Add right padding on larger screens
  };

  const headerStyle = {
    fontSize: isSmallScreen ? '24px' : '32px', // Decrease header size on small screens
    color: isDarkMode ? '#fff' : '#000',
    textAlign: 'center',
    marginBottom: '24px',
  };

  const paragraphStyle = {
    marginBottom: '44px',
    fontSize: isSmallScreen ? '14px' : '18px',
    paddingLeft: isSmallScreen ? '4px' : '60px',
    paddingRight: isSmallScreen ? '4px' : '60px',
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#242424' : '#e0e0e0',
    color: isDarkMode ? '#fff' : '#000',
    borderRadius: '12px',
    boxShadow: 'none',
    padding: '10px',
    height: '100%',
  };

  const teamData = [
    {
      name: 'Bisrategebriel Fisseha',
      role: 'CEO',
      education: 'Addis Ababa Science and Technology University',
      company: 'Kuraz Technologies',
      image: jobImages.bisrategebrielFisseha,
      linkedin: 'https://linkedin.com/in/bisrategebriel',
    },
    {
      name: 'Tito Frezer',
      role: 'CTO',
      education: 'Addis Ababa Science and Technology University',
      company: 'Kuraz Technologies',
      image: jobImages.titoFrezer,
      linkedin: 'https://linkedin.com/in/titofrezer',
    },
    {
      name: 'Biruk Mamo',
      role: 'Co-Founder',
      education: 'Addis Ababa Science and Technology University',
      company: 'Kuraz Technologies',
      image: jobImages.birukMamo,
      linkedin: 'https://linkedin.com/in/birukmamo',
    },
    {
      name: 'Yordanos Genene',
      role: 'Lead Developer',
      education: 'Haramaya University',
      company: 'Developer of Kuraz Automated Job Hiring',
      image: jobImages.yordanosTefera,
      linkedin: 'https://www.linkedin.com/in/yordanosgtefera/',
    },
  ];

  const services = [
    {
      title: 'Graphic Design',
      description: 'High-quality graphic design services for businesses.',
      image: jobImages.skill,
    },
    {
      title: 'Software Development',
      description: 'Custom software solutions to meet your business needs.',
      image: jobImages.working,
    },
    {
      title: 'Online Learning',
      description: 'Educational programs for high school students and career growth.',
      image: jobImages.professionalDevelopment,
    },
  ];

  return (
    <Box sx={containerStyle}>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '15px' }}>
        <h1 style={headerStyle}>About Kuraz Technologies</h1>

        <Box sx={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src={jobImages.kurazLogo} alt="Kuraz Logo" style={{ maxWidth: '150px' }} />
        </Box>

        <Divider sx={{ marginBottom: '24px', backgroundColor: isDarkMode ? '#fff' : '#000' }} />

        <p style={paragraphStyle}>
          Kuraz Technologies is a startup founded in 2018 by students from Addis Ababa Science and Technology University.
          We specialize in graphic design, software development, and online learning, aiming to become a leading tech
          company in Ethiopia. Our latest innovation, Kuraz AI, is an automated job hiring tool designed to streamline
          recruitment processes.
        </p>

        <Divider sx={{ marginBottom: '24px', backgroundColor: isDarkMode ? '#fff' : '#000' }} />

        <h2 style={headerStyle}>Our Team</h2>
        <Grid container spacing={2} sx={{ marginBottom: '24px' }}>
          {teamData.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Avatar src={member.image} alt={member.name} sx={{ width: '80px', height: '80px', margin: '0 auto' }} />
                  <h3 style={{ textAlign: 'center', margin: '16px 0 8px' }}>{member.name}</h3>
                  <p style={{ textAlign: 'center', fontSize: '14px' }}>{member.role}</p>
                  <p style={{ textAlign: 'center', fontSize: '14px', color: '#757575' }}>{member.education}</p>
                  <p style={{ textAlign: 'center', fontSize: '14px' }}>{member.company}</p>
                  <Button
                    variant="outlined"
                    startIcon={<LinkedIn />}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: '100%',
                      marginTop: '10px',
                      backgroundColor: isDarkMode ? '#fff' : '#000',
                      color: isDarkMode ? '#000' : '#fff',
                      border: `1px solid ${isDarkMode ? '#000' : '#fff'}`,
                    }}
                  >
                    LinkedIn Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ marginBottom: '24px', backgroundColor: isDarkMode ? '#fff' : '#000' }} />

        <h2 style={headerStyle}>Our Services</h2>
        <Grid container spacing={2}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={cardStyle}>
                <CardContent>
                  <img src={service.image} alt={service.title} style={{ maxWidth: '100%', marginBottom: '16px' }} />
                  <h3 style={{ textAlign: 'center', margin: '0 0 8px' }}>{service.title}</h3>
                  <p style={{ textAlign: 'center', fontSize: '14px' }}>{service.description}</p>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ marginTop: '24px', marginBottom: '24px', backgroundColor: isDarkMode ? '#fff' : '#000' }} />

        <h2 style={headerStyle}>Collaborations and Achievements</h2>
        <Box sx={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src={jobImages.collaboration} alt="Collaboration" style={{ maxWidth: '100%', marginBottom: '16px' }} />
          <p style={paragraphStyle}>
            Kuraz Technologies collaborates with Ethio Telecom to enhance digital infrastructure across Ethiopia.
            Additionally, we have received a $60,000 grant from the MasterCard Foundation to support our e-learning
            initiatives, aimed at empowering students and young professionals.
          </p>
        </Box>

        <Divider sx={{ marginBottom: '24px', backgroundColor: isDarkMode ? '#fff' : '#000' }} />

        <h2 style={headerStyle}>Contact Us</h2>
        <p style={{ textAlign: 'center', fontSize: paragraphStyle.fontSize, color: theme.palette.text.primary }}>
          <Email sx={{ verticalAlign: 'middle', marginRight: '8px' }} /> 
          <a style={{ textDecoration: 'none', color: theme.palette.text.primary }} href="mailto:info@kuraztechnologies.com">
            info@kuraztechnologies.com
          </a>
        </p>
        <p style={{ textAlign: 'center', fontSize: paragraphStyle.fontSize }}>
          <Phone sx={{ verticalAlign: 'middle', marginRight: '8px' }} />
          +251 123 456 789
        </p>
        <p style={{ textAlign: 'center', fontSize: paragraphStyle.fontSize }}>
          <LocationOn sx={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Addis Ababa, Ethiopia
        </p>

        <MapContainer center={[9.03, 38.74]} zoom={13} style={{ height: '400px', marginTop: '24px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[9.03, 38.74]}>
            <Popup>
              Kuraz Technologies Office
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
};

export default AboutUs;
