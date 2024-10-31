import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// List of famous soft skills (at least 25)
const SoftSkills = [
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


const hardSkills = [
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

// Define the Applicant Schema
const ApplicantSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    resume: { type: String },
    skills: {
        hardSkills: [{ 
            type: String, 
            enum: hardSkills,
        }],
        softSkills: [
            { 
                type: String, 
                enum: SoftSkills,
            }
        ],
    },
    experience: [
        {
            jobTitle: { type: String },
            company: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String },
            jobType: { type: String, enum: ['Full-Time', 'Part-Time', 'Intern', 'Other', 'Research'] },
        },
    ],
    education: [
        {
            degree: { 
                type: String,
                enum: ['Bachelor', 'Master', 'Doctorate', 'Diploma', 'Certification'],
            },
            institution: { type: String },
            major: { type: String },
            graduationYear: { type: Number },
            cgpa: { type: Number },
        },
    ],
    location: { type: String},
    birthday: { type: Date, required: true},
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    createdAt: { type: Date, default: Date.now },
    password: { type: String, required: true },
});

// Hash password before saving
ApplicantSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Export the model
const Applicant = mongoose.models.Applicant || mongoose.model('Applicant', ApplicantSchema);
export default Applicant;
