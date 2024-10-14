import React from 'react'; 
import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { AccessTime, CheckCircle } from '@mui/icons-material';
import CourseCard from '../Components/CourseCard'; // Ensure this path is correct
import jobImages from '../assets/JobImages'; // Import job images

const CareerResources = () => {
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery('(max-width:375px)');

  const containerStyle = {
    padding: isExtraSmallScreen ? '4px' : '15px',
    minHeight: '100vh',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  };

  const headerStyle = {
    fontSize: '32px',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    textAlign: 'center',
    marginBottom: '4px',
  };

  const resources = [
    {
      title: 'Web Development Course',
      description: 'Learn the fundamentals of web development, including HTML, CSS, and JavaScript.',
      link: 'https://kuraztech.com/courses/web-development',
    },
    {
      title: 'Data Science Bootcamp',
      description: 'Dive into the world of data with our comprehensive data science bootcamp.',
      link: 'https://kuraztech.com/courses/data-science',
    },
    {
      title: 'UI/UX Design Workshop',
      description: 'Enhance your design skills with our hands-on UI/UX design workshop.',
      link: 'https://kuraztech.com/courses/ui-ux-design',
    },
    {
      title: 'AI and Machine Learning Course',
      description: 'Explore AI and machine learning concepts and build your own projects.',
      link: 'https://kuraztech.com/courses/ai-machine-learning',
    },
  ];

  return (
    <Box sx={containerStyle}>
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isExtraSmallScreen ? '4px' : '15px',
        }}
      >
        <h1 style={headerStyle}>Career Resources</h1>

        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '24px' }}>
          <InputLabel id="category-select-label">Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            defaultValue=""
            label="Select Category"
          >
            <MenuItem value="web-development">Web Development</MenuItem>
            <MenuItem value="data-science">Data Science</MenuItem>
            <MenuItem value="ui-ux-design">UI/UX Design</MenuItem>
            <MenuItem value="ai-machine-learning">AI and Machine Learning</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={2}>
          {resources.map((resource, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CourseCard resource={resource} />
            </Grid>
          ))}
        </Grid>

        {/* Encouragement Text and Call to Action */}
        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <h2>Additional Resources</h2>
          <p style={{ marginBottom: '16px' }}>
            Here are some recommended resources to boost your career:
          </p>
          <p style={{ marginBottom: '16px' }}>
            <AccessTime sx={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Weekly webinars on various career topics.
          </p>
          <p style={{ marginBottom: '16px' }}>
            <CheckCircle sx={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Access to mentorship programs with industry professionals.
          </p>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                marginBottom: '24px',
                width: 'auto',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => window.open('https://kuraztech.com', '_blank')}
            >
              <img src={jobImages.kurazLogo} alt="Kuraz Tech Logo" style={{ marginRight: '8px', height: '24px' }} />
              Visit Kuraz Tech
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CareerResources;
