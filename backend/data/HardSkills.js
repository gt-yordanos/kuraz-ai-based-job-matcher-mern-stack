// hardSkills.js
  const HardSkills = [
    // Web Development
    'HTML', 'CSS', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 
    'Angular', 'Vue.js', 'Next.js', 'Nuxt.js', 'Svelte', 'Gatsby', 
    'Bootstrap', 'Tailwind CSS', 'Material UI', 'Semantic UI', 'Chakra UI',
    'Webpack', 'Parcel', 'Babel', 'JQuery', 'AJAX', 'REST APIs', 
    'GraphQL', 'JSON', 'PWA (Progressive Web Apps)', 'Sass', 'LESS', 
    'Styled Components', 'Redux', 'MobX', 'Storybook', 'Jamstack', 
    'WebSockets', 'WebAssembly', 'Three.js', 'Socket.io',
  
    // Frontend Development
    'UI/UX Design', 'Responsive Design', 'Mobile-First Design', 
    'Figma', 'Sketch', 'InVision', 'Adobe XD', 'Prototyping', 
    'Accessibility (WCAG)', 'Cross-Browser Testing', 'SEO', 
    'Performance Optimization', 'Animations & Transitions', 'A/B Testing', 
    'User Research', 'Wireframing', 'Atomic Design', 'Interaction Design', 
    'User Testing', 'Heatmaps', 'Landing Page Optimization', 
  
    // Backend Development
    'Node.js', 'Express.js', 'Django', 'Flask', 'Ruby on Rails', 
    'ASP.NET', 'Spring Boot', 'Laravel', 'Koa.js', 'Fastify', 
    'PHP', 'Java', 'Python', 'Ruby', 'Scala', 'Go', 'Rust', 
    'Microservices', 'RESTful APIs', 'GraphQL APIs', 'Serverless', 
    'Firebase', 'Parse Server', 'WebRTC', 'OAuth', 'JWT', 
    'CORS', 'Rate Limiting', 'Throttling', 'Load Balancing', 
    'Redis', 'Memcached', 'Message Queues (RabbitMQ)', 'Apache Kafka', 
    'Socket.IO', 'Nginx', 'Apache HTTP Server',
  
    // Mobile Application Development
    'Swift', 'Kotlin', 'Java', 'Flutter', 'React Native', 'Xamarin', 
    'Ionic', 'Objective-C', 'SwiftUI', 'Android SDK', 'iOS SDK', 
    'Dart', 'Firebase', 'Expo', 'Cordova', 'Unity3D (for games)',
    'Google Play Console', 'App Store Connect', 'SQLite', 
    'Realm Database', 'ARKit', 'ARCore', 'Bluetooth', 'NFC',
  
    // Data Science
    'Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Matplotlib', 
    'Seaborn', 'Scikit-Learn', 'Keras', 'StatsModels', 'Jupyter Notebooks', 
    'Data Visualization', 'Exploratory Data Analysis (EDA)', 'Power BI', 
    'Tableau', 'Looker', 'BigQuery', 'Data Wrangling', 'Data Cleaning', 
    'Data Preprocessing', 'Feature Engineering', 'Data Mining', 
    'Statistical Analysis', 'Excel', 'Google Sheets', 'Apache Spark', 
    'ETL (Extract, Transform, Load)', 'Machine Learning Pipelines', 
  
    // AI & Machine Learning
    'TensorFlow', 'PyTorch', 'Keras', 'Scikit-Learn', 'OpenCV', 
    'NLTK (Natural Language Toolkit)', 'spaCy', 'Hugging Face Transformers', 
    'MLflow', 'AutoML', 'Data Augmentation', 'Transfer Learning', 
    'Deep Learning', 'Neural Networks', 'CNN (Convolutional Neural Network)', 
    'RNN (Recurrent Neural Network)', 'GANs (Generative Adversarial Networks)', 
    'LSTMs', 'BERT', 'GPT Models', 'YOLO', 'Gradient Descent', 
    'Feature Scaling', 'Hyperparameter Tuning', 'Model Evaluation', 
    'Reinforcement Learning', 'Explainable AI', 'Data Ethics',
  
    // DevOps & Cloud Computing
    'Docker', 'Kubernetes', 'AWS', 'Google Cloud Platform', 'Azure', 
    'CI/CD (Continuous Integration/Continuous Deployment)', 'Jenkins', 
    'GitLab CI/CD', 'CircleCI', 'Terraform', 'Ansible', 'Chef', 'Puppet', 
    'Prometheus', 'Grafana', 'ELK Stack (Elasticsearch, Logstash, Kibana)', 
    'AWS Lambda', 'Azure Functions', 'Google Cloud Functions', 
    'Serverless Framework', 'Istio', 'Consul', 'Helm', 'S3', 'EC2', 
    'CloudWatch', 'CloudFormation', 'VPC (Virtual Private Cloud)', 
    'Cloud Security', 'Container Orchestration', 'IaC (Infrastructure as Code)', 
  
    // Cybersecurity
    'Penetration Testing', 'Ethical Hacking', 'Network Security', 
    'Firewalls', 'Intrusion Detection Systems (IDS)', 'Intrusion Prevention Systems (IPS)', 
    'SIEM (Security Information and Event Management)', 'Data Encryption', 
    'SSL/TLS', 'VPN', 'OWASP', 'Cybersecurity Frameworks', 
    'Cryptography', 'Vulnerability Assessment', 'Risk Analysis', 
    'Forensics', 'Incident Response', 'Identity & Access Management', 
    'Zero Trust Security', 'SOC (Security Operations Center)', 'NIST', 
    'ISO 27001', 'Phishing Detection', 'Threat Intelligence', 'Web Security',
  
    // Database & Data Engineering
    'SQL', 'NoSQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 
    'SQL Server', 'SQLite', 'Redis', 'Cassandra', 'DynamoDB', 
    'Bigtable', 'Data Lakes', 'Data Warehousing', 'ETL (Extract, Transform, Load)', 
    'Airflow', 'Apache Hive', 'Apache HBase', 'Google BigQuery', 
    'Snowflake', 'Redshift', 'Databricks', 'Spark SQL', 'Presto', 
    'Data Cataloging', 'Schema Design', 'Normalization', 'Indexing', 
    'Partitioning', 'Data Sharding', 'Replication', 'Data Governance', 
  
    // Blockchain
    'Solidity', 'Ethereum', 'Hyperledger', 'Smart Contracts', 
    'DApps (Decentralized Applications)', 'Blockchain Security', 
    'Tokenomics', 'Consensus Algorithms', 'Bitcoin', 'Ripple', 
    'Truffle Suite', 'Web3.js', 'IPFS (InterPlanetary File System)', 
    'Chainlink', 'Decentralized Finance (DeFi)', 'Blockchain Nodes', 
    'Crypto Wallets', 'ERC-20 Tokens', 'ERC-721 (NFT)', 
  
    // Miscellaneous
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Agile', 'Scrum', 
    'Kanban', 'JIRA', 'Confluence', 'CI/CD', 'Project Management', 
    'PowerShell', 'Bash', 'Linux', 'macOS', 'Windows', 
    'Command Line', 'Virtualization (VMware, VirtualBox)', 'Data Privacy', 
    'ITIL', 'SAP', 'Microsoft Dynamics', 'Salesforce', 
    'Zoho', 'HubSpot', 'Adobe Creative Suite', 'Business Intelligence', 
    'Software Testing', 'Manual Testing', 'Automated Testing', 
    'Performance Testing', 'Load Testing', 'Regression Testing', 'A/B Testing', 
    'MATLAB', 'SAS', 'Raspberry Pi', 'Arduino', 'VHDL', 'Verilog', 
    'Game Development', 'Unity', 'Unreal Engine', 'Shader Programming', 
    'TensorFlow Lite', 'PyTorch Mobile', 'DataOps', 'MLOps',
  
  // Project Management
  'Agile Methodology', 'Scrum', 'Kanban', 'Waterfall', 'Project Planning', 
  'Resource Management', 'Risk Management', 'Stakeholder Management', 
  'Budgeting', 'Project Scheduling', 'Timeline Management', 'Project Scope', 
  'Work Breakdown Structure (WBS)', 'Critical Path Method (CPM)', 'Earned Value Management (EVM)', 
  'Project Monitoring & Controlling', 'Project Closure', 'Gantt Charts', 'Project Management Software (JIRA, Trello)', 
  'Task Prioritization', 'Project Documentation', 'Agile Frameworks (Scrum, Lean, Kanban)', 'Scrum Master', 'Agile Transformation',

  // Business Analysis
  'SWOT Analysis', 'PESTLE Analysis', 'Business Process Modeling', 'Stakeholder Analysis', 
  'Requirements Gathering', 'Use Case Development', 'Business Case Development', 
  'Cost-Benefit Analysis', 'Risk Analysis', 'Gap Analysis', 'Feasibility Studies', 
  'Process Optimization', 'Lean Thinking', 'Value Stream Mapping', 'Six Sigma', 
  'Root Cause Analysis', 'Business Intelligence', 'BPMN (Business Process Model and Notation)', 
  'Data Analysis', 'KPI Development', 'Data-Driven Decision Making', 'Benchmarking', 'Dashboard Development',

  // Marketing & Sales
  'Market Research', 'Target Market Identification', 'Customer Segmentation', 'Market Trends Analysis', 
  'Competitive Analysis', 'Sales Funnel Optimization', 'Lead Generation', 'Sales Strategy Development', 
  'Sales Forecasting', 'Sales CRM', 'Sales Reporting', 'B2B Sales', 'B2C Sales', 'Sales Presentations', 
  'Sales Negotiation', 'Account Management', 'Lead Nurturing', 'Inbound Marketing', 'Outbound Marketing', 
  'Social Media Marketing', 'Brand Management', 'Content Marketing', 'Email Marketing', 'Influencer Marketing', 
  'SEO (Search Engine Optimization)', 'SEM (Search Engine Marketing)', 'PPC Advertising', 'Affiliate Marketing', 
  'Google Ads', 'Facebook Ads', 'Instagram Marketing', 'TikTok Marketing', 'LinkedIn Marketing', 
  'Marketing Automation', 'HubSpot', 'Google Analytics', 'Salesforce', 'Customer Relationship Management (CRM)', 
  'E-commerce Management', 'Conversion Rate Optimization (CRO)', 'Customer Retention Strategies',

  // Financial & Investment Management
  'Financial Analysis', 'Financial Reporting', 'Budgeting & Forecasting', 'Cash Flow Management', 
  'Cost Accounting', 'Variance Analysis', 'Profitability Analysis', 'Valuation Techniques', 
  'Investment Portfolio Management', 'Risk Management in Finance', 'Investment Strategies', 
  'Mergers & Acquisitions', 'Capital Budgeting', 'Financial Modeling', 'DCF Analysis', 
  'Financial Statements Analysis', 'Capital Raising', 'Private Equity', 'Venture Capital', 'Stock Market Analysis', 
  'Cryptocurrency Investment', 'Real Estate Investment', 'Investment Risk Assessment', 'Financial Regulations', 
  'Debt Management', 'Taxation', 'Corporate Finance', 'Financial Planning', 'Pensions & Retirement Planning',

  // Human Resources & People Management
  'Talent Acquisition', 'Recruitment Strategy', 'Employee Onboarding', 'Employee Engagement', 
  'Performance Management', 'Leadership Development', 'Succession Planning', 'Employee Retention', 
  'Compensation & Benefits', 'HR Software (Workday, BambooHR)', 'Employee Training & Development', 
  'Labor Law', 'Conflict Resolution', 'Employee Relations', 'HR Analytics', 'Workforce Planning', 
  'Diversity & Inclusion', 'HR Policies & Procedures', 'Human Capital Management',

  // Leadership & Management
  'Strategic Planning', 'Organizational Development', 'Team Leadership', 'Crisis Management', 
  'Vision & Mission Development', 'Corporate Governance', 'Decision Making', 
  'Delegation', 'Problem Solving', 'Team Empowerment', 'Innovation Management', 
  'Employee Development', 'Coaching', 'Mentorship', 'Leadership Styles', 
  'Cultural Leadership', 'Team Motivation', 'Leadership Communication', 'Building High-Performing Teams',

  // Entrepreneurship & Startup Management
  'Entrepreneurial Thinking', 'Startup Funding', 'Business Model Development', 'Lean Startup Methodology', 
  'Venture Capital', 'Pitching to Investors', 'Bootstrapping', 'Growth Hacking', 'Startup Marketing', 
  'Product-Market Fit', 'Pivoting', 'Scaling a Business', 'Founder’s Mentality', 'Business Incubators', 
  'Crowdfunding', 'Startup Financial Management', 'Market Validation', 'Customer Development', 
  'Business Strategy for Startups', 'Exit Strategies for Startups',

  // Operations & Supply Chain Management
  'Supply Chain Management', 'Logistics Management', 'Inventory Management', 'Procurement Management', 
  'Vendor Management', 'Supply Chain Optimization', 'Lean Manufacturing', 'Just-in-Time (JIT)', 'Quality Assurance', 
  'Operations Research', 'Process Improvement', 'Demand Forecasting', 'Supply Chain Analytics', 
  'Global Supply Chain Management', 'Warehouse Management', 'Transportation Management', 
  'Product Lifecycle Management', 'Operations Scheduling', 'Outsourcing & Offshoring', 'ERP Systems (SAP, Oracle)', 
  'Warehouse Automation', 'Vendor Relationship Management', 'Production Planning', 'Material Management', 
  'Process Automation', 'Compliance Management',

  // Legal & Compliance
  'Contract Negotiation', 'Corporate Law', 'Intellectual Property (IP) Management', 'Trademark & Copyright', 
  'Mergers & Acquisitions (M&A)', 'Business Ethics', 'Compliance Risk Management', 'Data Protection Regulations', 
  'GDPR (General Data Protection Regulation)', 'Anti-Money Laundering (AML)', 'Corporate Compliance Programs', 
  'Employment Law', 'Litigation Management', 'Legal Risk Management', 'Tax Law', 'Bankruptcy & Insolvency', 
  'Antitrust Law', 'Environmental Law', 'International Business Law', 'Public Policy', 'Legal Research',

  // Business Development
  'Partnership Development', 'Strategic Alliances', 'Joint Ventures', 
  'Client Management', 'Proposal Writing', 'Contract Management', 'Business Expansion', 'Customer Acquisition', 
  'Revenue Generation', 'Market Penetration', 'Global Business Strategy', 'Product Development', 
  'Negotiation Skills', 'Client Retention', 'Cross-Selling', 'Upselling', 'Sales Strategy', 'Competitive Intelligence',

  // Data Analytics & Visualization
  'Data Visualization', 'Power BI', 'Tableau', 'Google Data Studio', 'Data Analysis', 'Big Data Analytics', 
  'Data Mining', 'Data Warehousing', 'Predictive Analytics', 'Descriptive Analytics', 'Prescriptive Analytics', 
  'Business Intelligence (BI)', 'Dashboard Creation', 'Data Reporting', 'SQL for Data Analytics', 
  'R Programming for Data Science', 'Python for Data Science', 'Data Cleansing', 'Data Integration', 'Real-Time Analytics', 
  'ETL (Extract, Transform, Load)', 'Data Governance', 'Data Security', 'Machine Learning for Analytics',
    
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

export default HardSkills;