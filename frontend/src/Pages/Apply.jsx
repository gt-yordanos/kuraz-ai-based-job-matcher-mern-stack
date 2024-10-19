import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  useTheme,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Time icon
import { useAuth } from '../Contexts/AuthContext'; // Adjust the path as necessary

const Apply = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { user } = useAuth(); // Get the logged-in user info

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeChoice, setResumeChoice] = useState('existing'); // Default to existing resume
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = async () => {
    try {
      const applicationData = {
        applicantId: user?.id,
        jobId: id,
        coverLetter,
      };

      if (resumeChoice === 'new' && resumeFile) {
        const formData = new FormData();
        formData.append('resume', resumeFile);
        await axios.post('http://localhost:5000/api/applications', {
          ...applicationData,
          resume: resumeFile.name, // Adjust as needed to send the file name or URL
        });
        alert('Application submitted successfully with new resume!');
      } else {
        await axios.post('http://localhost:5000/api/applications', applicationData);
        alert('Application submitted successfully with existing resume!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to submit application');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!job) return <div>No job found.</div>;

  // Safely parse the date
  const postedDate = new Date(job.datePosted);
  const formattedPostedDate = isNaN(postedDate.getTime()) ? "Invalid Date" : postedDate.toLocaleDateString('en-US');

  return (
    <Card
      sx={{
        width: {
          xs: '97%',  // Small screen
          sm: '85%',  // Medium screen
          md: '65%',  // Large screen
        },
        backgroundColor: isDarkMode ? '#242424' : '#e0e0e0',
        color: isDarkMode ? '#fff' : '#000',
        margin: '16px auto',
        borderRadius: '12px',
        boxShadow: 'none',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <CardContent>
        <h2>{job.title}</h2>
        <p>{job.description}</p>

        <p style={{display: 'flex' , alignItems: 'center'}}>
          <AccessTimeIcon fontSize="small" />  Posted on:  {new Date(job.postedDate).toLocaleDateString('en-US')}
        </p>
        <h3>Requirements:</h3>
        <ul>
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
        <h3>Responsibilities:</h3>
        <ul>
          {job.responsibilities.map((resp, index) => (
            <li key={index}>{resp}</li>
          ))}
        </ul>
        <p>
          <LocationOnIcon fontSize="small" /> Location: {job.location}
        </p>
        <p>
          <WorkIcon fontSize="small" /> Employment Type: {job.employmentType}
        </p>
        <p>
          <AttachMoneyIcon fontSize="small" /> Salary Range: {job.salaryRange}
        </p>
        <p>
          <CalendarTodayIcon fontSize="small" /> Deadline: {new Date(job.deadline).toLocaleDateString('en-US')}
        </p>

        {/* Resume Information Section */}
        <Typography variant="body2" margin="normal" sx={{ color: '#50C878' }}> {/* Emerald green color */}
          We recommend creating a specific resume tailored for this job to increase your chances of getting hired.
        </Typography>

        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            row
            value={resumeChoice}
            onChange={(e) => setResumeChoice(e.target.value)}
          >
            <FormControlLabel value="existing" control={<Radio />} label="Continue with existing resume" />
            <FormControlLabel value="new" control={<Radio />} label="Upload new resume" />
          </RadioGroup>
        </FormControl>

        {resumeChoice === 'new' && (
          <TextField
            type="file"
            inputProps={{ accept: '.pdf' }}
            onChange={(e) => setResumeFile(e.target.files[0])}
            fullWidth
            margin="normal"
          />
        )}

        <TextField
          label="Your Cover Letter"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{
            width: '100%',
            backgroundColor: isDarkMode ? '#fff' : '#000',
            color: isDarkMode ? '#000' : '#fff',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
              backgroundColor: isDarkMode ? '#e0e0e0' : '#333',
            },
          }}
          onClick={handleApply}
        >
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default Apply;
