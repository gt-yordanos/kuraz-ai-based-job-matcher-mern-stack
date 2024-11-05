import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import ElderlyIcon from '@mui/icons-material/Elderly';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Divider from '@mui/material/Divider';

const JobDetails = ({ job }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Job Details</h1>
      <Divider style={{ margin: '20px 0' }} />
      <h2>{job.title}</h2>
      <Divider style={{ margin: '20px 0' }} />
      <p>{job.description}</p>
      <Divider style={{ margin: '20px 0' }} />

      <h4>Job Details</h4>
      <p><AccessTimeIcon fontSize="small" /> <strong>Posted on:</strong> {new Date(job.postedDate).toLocaleDateString('en-US')}</p>
      <p><LocationOnIcon fontSize="small" /> <strong>Location:</strong> {job.location}</p>
      <p><WorkIcon fontSize="small" /> <strong>Employment Type:</strong> {job.employmentType}</p>
      <p><AttachMoneyIcon fontSize="small" /> <strong>Salary Range:</strong> {job.salaryRange}</p>
      <p><CalendarTodayIcon fontSize="small" /> <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString('en-US')}</p>
      <p><PeopleIcon fontSize="small" /> <strong>Gender Preference:</strong> {job.genderPreference}</p>
      <p><SchoolIcon fontSize="small" /> <strong>Education Required:</strong> {job.educationRequirement.degree}</p>
      {job.ageLimit && (
        <p><ElderlyIcon fontSize="small" /> <strong>Age Limit:</strong> {job.ageLimit.min} - {job.ageLimit.max} years</p>
      )}

      <Divider style={{ margin: '20px 0' }} />
      <h4>Skills Required:</h4>
      <p>
        <PsychologyIcon fontSize="small" /> <strong>Soft Skills:</strong> 
        {job.skillsRequired.skills.softSkills.length > 0 
          ? job.skillsRequired.skills.softSkills.join(', ') 
          : ' None'}
      </p>
      <p>
        <TipsAndUpdatesIcon fontSize="small" /> <strong>Hard Skills:</strong> 
        {job.skillsRequired.skills.hardSkills.length > 0 
          ? job.skillsRequired.skills.hardSkills.join(', ') 
          : ' None'}
      </p>

      <Divider style={{ margin: '20px 0' }} />
      <h4>Responsibilities:</h4>
      <ul>
        {job.responsibilities.map((resp, index) => (
          <li key={index}>{resp}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobDetails;
