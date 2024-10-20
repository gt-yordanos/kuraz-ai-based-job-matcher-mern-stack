import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  LinearProgress,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Sample data for various charts
const pieData = [
  { name: 'Applications Received', value: 400 },
  { name: 'Interviews Scheduled', value: 300 },
  { name: 'Offers Made', value: 200 },
  { name: 'Hires', value: 100 },
];

const lineData = [
  { name: 'Jan', applicants: 400, jobs: 240 },
  { name: 'Feb', applicants: 300, jobs: 220 },
  { name: 'Mar', applicants: 500, jobs: 280 },
  { name: 'Apr', applicants: 400, jobs: 300 },
  { name: 'May', applicants: 600, jobs: 400 },
];

const barData = [
  { name: 'Job A', applications: 120 },
  { name: 'Job B', applications: 80 },
  { name: 'Job C', applications: 140 },
  { name: 'Job D', applications: 100 },
];

const diversityData = [
  { name: 'Male', value: 300 },
  { name: 'Female', value: 200 },
  { name: 'Other', value: 50 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Job Analytics Dashboard
      </Typography>
      
      <Grid container spacing={2}>
        {/* Job Application Statistics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Job Application Statistics</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="top" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Applicants vs Jobs Over Time */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Applicants vs Jobs Over Time</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="applicants" stroke="#0088FE" />
                <Line type="monotone" dataKey="jobs" stroke="#FFBB28" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Applications per Job */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Applications per Job</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Diversity Metrics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Diversity Metrics</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={diversityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {diversityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="top" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Application Progress */}
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Application Progress</Typography>
            <Typography variant="body1">Applications in Progress</Typography>
            <LinearProgress variant="determinate" value={60} sx={{ marginBottom: 2 }} />
            <Typography variant="body1">Applications Completed</Typography>
            <LinearProgress variant="determinate" value={30} sx={{ marginBottom: 2 }} />
            <Typography variant="body1">Applications Rejected</Typography>
            <LinearProgress variant="determinate" value={10} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
