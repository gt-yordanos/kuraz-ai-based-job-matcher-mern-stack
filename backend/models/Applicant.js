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


const Majors =[
    "Accounting",
    "Agricultural Science",
    "Anthropology",
    "Architecture",
    "Art History",
    "Biology",
    "Business Administration",
    "Business Management",
    "Chemistry",
    "Civil Engineering",
    "Communications",
    "Computer Science",
    "Criminal Justice",
    "Economics",
    "Education",
    "Electrical Engineering",
    "Environmental Science",
    "Film Studies",
    "Finance",
    "Forensic Science",
    "Geography",
    "Geology",
    "Graphic Design",
    "Health Administration",
    "History",
    "Hospitality Management",
    "Human Resources",
    "Information Technology",
    "International Relations",
    "Journalism",
    "Law",
    "Marketing",
    "Mathematics",
    "Mechanical Engineering",
    "Media Studies",
    "Music",
    "Nursing",
    "Nutrition",
    "Philosophy",
    "Physics",
    "Political Science",
    "Psychology",
    "Public Administration",
    "Public Relations",
    "Religious Studies",
    "Social Work",
    "Sociology",
    "Software Engineering",
    "Spanish",
    "Statistics",
    "Teaching English as a Second Language (TESL)",
    "Theater Arts",
    "Urban Studies",
    "Veterinary Science",
    "Wildlife Management",
    "Accounting Information Systems",
    "Actuarial Science",
    "Aerospace Engineering",
    "African Studies",
    "American Studies",
    "Applied Mathematics",
    "Art Education",
    "Athletic Training",
    "Biochemistry",
    "Biophysics",
    "Business Analytics",
    "Child Development",
    "Cognitive Science",
    "Comparative Literature",
    "Construction Management",
    "Cybersecurity",
    "Data Science",
    "Design",
    "Earth Sciences",
    "Education Technology",
    "Electrical and Computer Engineering",
    "Emergency Management",
    "English Literature",
    "Entrepreneurship",
    "Fashion Design",
    "Film Production",
    "Fine Arts",
    "Food Science",
    "Forensic Psychology",
    "Game Design",
    "Gender Studies",
    "Global Studies",
    "Health Education",
    "Health Science",
    "History of Art",
    "Industrial Design",
    "Information Systems",
    "Interior Design",
    "International Business",
    "International Studies",
    "Jewish Studies",
    "Landscape Architecture",
    "Law Enforcement",
    "Linguistics",
    "Management Information Systems",
    "Marine Biology",
    "Marketing Communications",
    "Mathematics Education",
    "Mechanical Engineering Technology",
    "Media Arts",
    "Microbiology",
    "Molecular Biology",
    "Music Education",
    "Nursing Practice",
    "Occupational Therapy",
    "Organizational Leadership",
    "Peace Studies",
    "Philosophy of Science",
    "Photography",
    "Physical Therapy",
    "Physics Education",
    "Political Theory",
    "Public Policy",
    "Real Estate",
    "Renewable Energy",
    "Russian Studies",
    "Science Communication",
    "Secondary Education",
    "Security Studies",
    "Social Psychology",
    "Software Development",
    "Special Education",
    "Sports Management",
    "Sustainability Studies",
    "Teacher Education",
    "Technology Management",
    "Theatre Production",
    "Theology",
    "Tourism Management",
    "Translation Studies",
    "Transportation Engineering",
    "Veterinary Technology",
    "Web Development",
    "Women's Studies",
    "Actuarial Mathematics",
    "Art Therapy",
    "Biostatistics",
    "Computational Biology",
    "Criminology",
    "Digital Marketing",
    "Early Childhood Education",
    "Environmental Policy",
    "Film Criticism",
    "Healthcare Management",
    "International Economics",
    "Journalism and Media Studies",
    "Legal Studies",
    "Music Production",
    "Natural Resources Management",
    "Nursing Administration",
    "Occupational Safety",
    "Public Health",
    "Real Estate Development",
    "Sports Medicine",
    "Structural Engineering",
    "System Engineering",
    "Urban Planning",
    "Water Resources Management",
    "Advertising",
    "Apparel Merchandising",
    "Biotechnology",
    "Child Psychology",
    "Community Development",
    "Corporate Communication",
    "Creative Writing",
    "Database Management",
    "Education Leadership",
    "Environmental Design",
    "Event Management",
    "Family Studies",
    "Fashion Merchandising",
    "Health Policy",
    "Hospitality and Tourism",
    "Human Computer Interaction",
    "Information Architecture",
    "Insurance",
    "Knowledge Management",
    "Library Science",
    "Management Studies",
    "Network Engineering",
    "Occupational Health",
    "Performing Arts",
    "Phlebotomy",
    "Quality Management",
    "Regulatory Affairs",
    "Retail Management",
    "Security Management",
    "Supply Chain Management",
    "Technical Communication",
    "Translation and Interpretation",
    "User Experience Design",
    "Visual Arts",
    "Web Design",
    "Youth Development",
    "Zoology"
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
            major: { type: String, enum : Majors },
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
