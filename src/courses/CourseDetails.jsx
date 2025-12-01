import React from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  PlayCircle,
  Clock, 
  Timer,
  BookOpen,
  CheckCircle2
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const courseData = {
  // 1. Python
  1: {
    title: "Complete Python for AI",
    chapters: [
      { id: 1, title: "Python Setup & Basics", desc: "Installation, variables, data types, and basic operations.", duration: "30 mins" },
      { id: 2, title: "Control Flow & Loops", desc: "Mastering if/else statements, for loops, and while loops.", duration: "45 mins" },
      { id: 3, title: "Functions & Modules", desc: "Writing reusable code with functions and importing modules.", duration: "60 mins" },
      { id: 4, title: "Data Structures", desc: "Deep dive into lists, dictionaries, sets, and tuples.", duration: "50 mins" },
      { id: 5, title: "NumPy & Pandas Basics", desc: "Introduction to data manipulation libraries essential for AI.", duration: "75 mins" },
      { id: 6, title: "Object-Oriented Programming", desc: "Classes, objects, inheritance, and polymorphism in Python.", duration: "60 mins" },
      { id: 7, title: "File Handling & APIs", desc: "Reading/writing files and fetching data from APIs.", duration: "45 mins" }
    ]
  },
  // 2. Machine Learning
  2: {
    title: "Machine Learning A-Z",
    chapters: [
      { id: 1, title: "Introduction to ML", desc: "Foundational concepts: supervised vs unsupervised learning.", duration: "30 mins" },
      { id: 2, title: "Linear Regression", desc: "Simple and multiple linear regression models.", duration: "45 mins" },
      { id: 3, title: "Logistic Regression", desc: "Classification problems and logistic function.", duration: "45 mins" },
      { id: 4, title: "Decision Trees & Random Forests", desc: "Tree-based models and ensemble learning techniques.", duration: "60 mins" },
      { id: 5, title: "Support Vector Machines (SVM)", desc: "Hyperplanes, kernels, and classification boundaries.", duration: "60 mins" },
      { id: 6, title: "Clustering Algorithms", desc: "K-Means, Hierarchical clustering, and DBSCAN.", duration: "60 mins" },
      { id: 7, title: "Model Evaluation", desc: "Cross-validation, confusion matrix, ROC-AUC curves.", duration: "45 mins" }
    ]
  },
  // 3. Data Science
  3: {
    title: "Data Science Bootcamp",
    chapters: [
      { id: 1, title: "Data Science Lifecycle", desc: "Overview of the data science process from collection to deployment.", duration: "40 mins" },
      { id: 2, title: "Probability & Statistics", desc: "Descriptive stats, distributions, and hypothesis testing.", duration: "90 mins" },
      { id: 3, title: "Data Visualization", desc: "Visualizing complex data with Matplotlib and Seaborn.", duration: "60 mins" },
      { id: 4, title: "Data Wrangling & Cleaning", desc: "Handling missing values, outliers, and formatting issues.", duration: "70 mins" },
      { id: 5, title: "Exploratory Data Analysis (EDA)", desc: "Uncovering patterns and insights from raw data.", duration: "60 mins" },
      { id: 6, title: "Feature Engineering", desc: "Creating new features to improve model performance.", duration: "50 mins" },
      { id: 7, title: "Intro to Big Data (Spark)", desc: "Handling large datasets using Apache Spark.", duration: "80 mins" }
    ]
  },
  // 4. Generative AI
  4: {
    title: "Generative AI Masterclass",
    chapters: [
      { id: 1, title: "Intro to Generative Models", desc: "Understanding discriminative vs. generative modeling.", duration: "45 mins" },
      { id: 2, title: "Variational Autoencoders (VAEs)", desc: "Latent spaces and encoding/decoding image data.", duration: "60 mins" },
      { id: 3, title: "GANs Architecture", desc: "Generative Adversarial Networks: Generator vs Discriminator.", duration: "75 mins" },
      { id: 4, title: "Transformers & Attention", desc: "The architecture behind modern LLMs (Attention is All You Need).", duration: "90 mins" },
      { id: 5, title: "LLMs & Prompt Engineering", desc: "Working with GPT, Claude, and Llama models effectively.", duration: "60 mins" },
      { id: 6, title: "Stable Diffusion", desc: "Text-to-image generation mechanics and diffusion models.", duration: "70 mins" },
      { id: 7, title: "Building GenAI Apps", desc: "Using LangChain and vector databases to build apps.", duration: "120 mins" }
    ]
  },
  // 5. Deep Learning
  5: {
    title: "Deep Learning Specialization",
    chapters: [
      { id: 1, title: "Neural Networks Basics", desc: "Perceptrons, activation functions, and forward propagation.", duration: "60 mins" },
      { id: 2, title: "Backpropagation", desc: "Gradient descent and mathematics of learning.", duration: "75 mins" },
      { id: 3, title: "Hyperparameter Tuning", desc: "Learning rate, batch size, regularization (L1/L2, Dropout).", duration: "50 mins" },
      { id: 4, title: "Convolutional Neural Networks", desc: "CNNs for image recognition and computer vision tasks.", duration: "90 mins" },
      { id: 5, title: "Recurrent Neural Networks", desc: "RNNs for sequential data and time series.", duration: "60 mins" },
      { id: 6, title: "LSTMs and GRUs", desc: "Solving the vanishing gradient problem in sequence models.", duration: "70 mins" },
      { id: 7, title: "Transfer Learning", desc: "Using pre-trained models like ResNet and VGG.", duration: "45 mins" }
    ]
  },
  // 6. NLP
  6: {
    title: "NLP with Transformers",
    chapters: [
      { id: 1, title: "Text Preprocessing", desc: "Tokenization, lemmatization, stemming, and stop words.", duration: "45 mins" },
      { id: 2, title: "Word Embeddings", desc: "Word2Vec, GloVe, and semantic vector spaces.", duration: "60 mins" },
      { id: 3, title: "Sequence Modeling", desc: "Traditional approaches using RNNs and LSTMs for text.", duration: "60 mins" },
      { id: 4, title: "BERT & Fine-tuning", desc: "Bidirectional Encoder Representations from Transformers.", duration: "90 mins" },
      { id: 5, title: "GPT Architecture", desc: "Generative Pre-trained Transformers deeper dive.", duration: "80 mins" },
      { id: 6, title: "Hugging Face Ecosystem", desc: "Using the Transformers library and Model Hub.", duration: "60 mins" },
      { id: 7, title: "Real-world NLP Projects", desc: "Building sentiment analysis and chatbot applications.", duration: "120 mins" }
    ]
  },
  // 7. React
  7: {
    title: "React Developer Roadmap",
    chapters: [
      { id: 1, title: "React Basics", desc: "Components, JSX, Props, and understanding the Virtual DOM.", duration: "45 mins" },
      { id: 2, title: "State & Hooks", desc: "Mastering useState, useEffect, and custom hooks.", duration: "60 mins" },
      { id: 3, title: "React Router", desc: "Client-side routing and navigation.", duration: "40 mins" },
      { id: 4, title: "State Management", desc: "Context API vs Redux vs Zustand.", duration: "75 mins" },
      { id: 5, title: "API Integration", desc: "Fetching data with Axios/Fetch and handling async states.", duration: "50 mins" },
      { id: 6, title: "Forms & Validation", desc: "Controlled components and form libraries like React Hook Form.", duration: "60 mins" },
      { id: 7, title: "Deployment", desc: "Building for production and deploying to Vercel/Netlify.", duration: "30 mins" }
    ]
  },
  // 8. JS Zero to Hero
  8: {
    title: "JavaScript Zero to Hero",
    chapters: [
      { id: 1, title: "JS Fundamentals", desc: "Variables, types, operators, and control flow.", duration: "50 mins" },
      { id: 2, title: "DOM Manipulation", desc: "Selecting elements, events, and dynamic HTML.", duration: "60 mins" },
      { id: 3, title: "ES6+ Features", desc: "Arrow functions, destructuring, modules, and classes.", duration: "55 mins" },
      { id: 4, title: "Asynchronous JS", desc: "Callbacks, Promises, and Async/Await explained.", duration: "70 mins" },
      { id: 5, title: "Object-Oriented JS", desc: "Prototypes, inheritance, and the 'this' keyword.", duration: "65 mins" },
      { id: 6, title: "Browser APIs", desc: "LocalStorage, Fetch API, and Geolocation.", duration: "45 mins" },
      { id: 7, title: "Modern Tooling", desc: "Intro to NPM, Webpack, and Babel.", duration: "40 mins" }
    ]
  },
  // 9. C Programming
  9: {
    title: "C Programming Essentials",
    chapters: [
      { id: 1, title: "Intro to C", desc: "Setting up GCC, Hello World, and structure of a C program.", duration: "30 mins" },
      { id: 2, title: "Variables & Constants", desc: "Data types, memory storage, and operators.", duration: "45 mins" },
      { id: 3, title: "Control Flow", desc: "If/Else, Switch cases, and Loops (for, while).", duration: "50 mins" },
      { id: 4, title: "Functions & Scope", desc: "Defining functions, arguments, and return values.", duration: "60 mins" },
      { id: 5, title: "Pointers & Memory", desc: "Understanding pointers, references, and dynamic memory.", duration: "80 mins" },
      { id: 6, title: "Arrays & Strings", desc: "Working with contiguous memory blocks and text.", duration: "55 mins" },
      { id: 7, title: "Structs & File I/O", desc: "Creating custom data types and reading/writing files.", duration: "65 mins" }
    ]
  },
  // 10. Full Stack
  10: {
    title: "Full-Stack Web Development",
    chapters: [
      { id: 1, title: "HTML5 & CSS3 Mastery", desc: "Semantic HTML, Flexbox, Grid, and responsive design.", duration: "60 mins" },
      { id: 2, title: "JavaScript Deep Dive", desc: "Advanced DOM, Event Loop, and closures.", duration: "75 mins" },
      { id: 3, title: "Node.js & Express", desc: "Building REST APIs and handling server-side logic.", duration: "90 mins" },
      { id: 4, title: "Databases (SQL & NoSQL)", desc: "Integrating MongoDB and PostgreSQL with Node.", duration: "80 mins" },
      { id: 5, title: "Authentication", desc: "JWT, Session auth, and security best practices.", duration: "60 mins" },
      { id: 6, title: "Frontend Frameworks", desc: "Integrating React/Vue with your backend API.", duration: "70 mins" },
      { id: 7, title: "DevOps & Deployment", desc: "CI/CD, Docker basics, and cloud deployment.", duration: "55 mins" }
    ]
  },
  // 11. AI Prompt Engineering
  11: {
    title: "AI Prompt Engineering",
    chapters: [
      { id: 1, title: "How LLMs Work", desc: "Tokens, context windows, and model limitations.", duration: "40 mins" },
      { id: 2, title: "Prompting Basics", desc: "Zero-shot, one-shot, and few-shot prompting techniques.", duration: "50 mins" },
      { id: 3, title: "Chain of Thought", desc: "Guiding models through complex reasoning tasks.", duration: "60 mins" },
      { id: 4, title: "Advanced Patterns", desc: "ReAct pattern, self-consistency, and prompt chaining.", duration: "70 mins" },
      { id: 5, title: "Image Generation Prompts", desc: "Mastering Midjourney and DALL-E parameters.", duration: "55 mins" },
      { id: 6, title: "Prompt Security", desc: "Understanding prompt injection and jailbreaking defenses.", duration: "45 mins" },
      { id: 7, title: "Automation Tools", desc: "Using LangChain and AutoGPT.", duration: "60 mins" }
    ]
  },
  // 12. Computer Vision
  12: {
    title: "Computer Vision with PyTorch",
    chapters: [
      { id: 1, title: "PyTorch Tensors", desc: "Basics of tensors, gradients, and computation graphs.", duration: "50 mins" },
      { id: 2, title: "Image Preprocessing", desc: "Loading datasets, normalization, and augmentation.", duration: "60 mins" },
      { id: 3, title: "CNN Architecture", desc: "Building Convolutional Neural Networks from scratch.", duration: "80 mins" },
      { id: 4, title: "Transfer Learning", desc: "Fine-tuning ResNet and EfficientNet.", duration: "70 mins" },
      { id: 5, title: "Object Detection", desc: "Implementing YOLO and Faster R-CNN.", duration: "90 mins" },
      { id: 6, title: "Image Segmentation", desc: "Semantic and instance segmentation with U-Net.", duration: "85 mins" },
      { id: 7, title: "Video Analysis", desc: "Working with video streams and temporal data.", duration: "60 mins" }
    ]
  },
  // 13. DSA
  13: {
    title: "Data Structures & Algorithms",
    chapters: [
      { id: 1, title: "Big O Notation", desc: "Time and space complexity analysis.", duration: "40 mins" },
      { id: 2, title: "Arrays & Strings", desc: "Two pointers, sliding window, and prefix sums.", duration: "60 mins" },
      { id: 3, title: "Linked Lists", desc: "Singly and doubly linked lists traversal and manipulation.", duration: "55 mins" },
      { id: 4, title: "Stacks & Queues", desc: "Implementation and common interview problems.", duration: "50 mins" },
      { id: 5, title: "Trees & Graphs", desc: "DFS, BFS, Binary Search Trees, and Graph traversal.", duration: "90 mins" },
      { id: 6, title: "Sorting & Searching", desc: "Merge sort, Quick sort, and Binary Search.", duration: "65 mins" },
      { id: 7, title: "Dynamic Programming", desc: "Memoization, tabulation, and solving hard problems.", duration: "100 mins" }
    ]
  },
  // 14. SQL
  14: {
    title: "SQL & Databases Mastery",
    chapters: [
      { id: 1, title: "Relational Concepts", desc: "Tables, primary keys, foreign keys, and schemas.", duration: "40 mins" },
      { id: 2, title: "Basic Queries", desc: "SELECT, WHERE, ORDER BY, and LIMIT.", duration: "50 mins" },
      { id: 3, title: "Joins Explained", desc: "INNER, LEFT, RIGHT, and FULL OUTER joins visualization.", duration: "60 mins" },
      { id: 4, title: "Aggregation", desc: "GROUP BY, HAVING, COUNT, SUM, and AVG.", duration: "55 mins" },
      { id: 5, title: "Advanced SQL", desc: "Subqueries, CTEs, and Window Functions.", duration: "75 mins" },
      { id: 6, title: "Database Design", desc: "Normalization (1NF, 2NF, 3NF) and ER diagrams.", duration: "60 mins" },
      { id: 7, title: "Performance", desc: "Indexing, query optimization, and execution plans.", duration: "50 mins" }
    ]
  },
  // 15. Cloud AWS
  15: {
    title: "Cloud Computing on AWS",
    chapters: [
      { id: 1, title: "Cloud Fundamentals", desc: "IaaS, PaaS, SaaS, and the Shared Responsibility Model.", duration: "40 mins" },
      { id: 2, title: "IAM & Security", desc: "Users, Groups, Roles, and Policies in AWS.", duration: "55 mins" },
      { id: 3, title: "EC2 & Compute", desc: "Launching instances, auto-scaling, and load balancing.", duration: "70 mins" },
      { id: 4, title: "S3 & Storage", desc: "Buckets, objects, versioning, and lifecycle policies.", duration: "60 mins" },
      { id: 5, title: "Databases", desc: "RDS (SQL) vs DynamoDB (NoSQL).", duration: "65 mins" },
      { id: 6, title: "Networking (VPC)", desc: "Subnets, Route Tables, Internet Gateways, and Security Groups.", duration: "80 mins" },
      { id: 7, title: "Serverless (Lambda)", desc: "Event-driven computing and API Gateway integration.", duration: "60 mins" }
    ]
  },
  // 16. Cybersecurity
  16: {
    title: "Cybersecurity Fundamentals",
    chapters: [
      { id: 1, title: "Intro to InfoSec", desc: "CIA Triad: Confidentiality, Integrity, and Availability.", duration: "40 mins" },
      { id: 2, title: "Network Security", desc: "Firewalls, VPNs, IDS/IPS, and OSI Model.", duration: "60 mins" },
      { id: 3, title: "Cryptography", desc: "Encryption, hashing, public keys, and digital signatures.", duration: "70 mins" },
      { id: 4, title: "Web Security", desc: "OWASP Top 10: SQL Injection, XSS, and CSRF.", duration: "80 mins" },
      { id: 5, title: "Malware & Threats", desc: "Viruses, Trojans, Ransomware, and Social Engineering.", duration: "55 mins" },
      { id: 6, title: "Ethical Hacking", desc: "Penetration testing stages and reconnaissance tools.", duration: "75 mins" },
      { id: 7, title: "Incident Response", desc: "Detection, analysis, containment, and recovery.", duration: "50 mins" }
    ]
  }
};

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Logic to handle duplicate IDs from AICourse.jsx mapping
  let lookupId = id;
  if (parseInt(id) >= 7 && parseInt(id) <= 14 && !courseData[id]) {
    lookupId = 4;
  }
  const course = courseData[lookupId] || courseData[1];

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- Background --- */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="blue" alpha={1} />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">
        
        {/* Header Navigation */}
        <div className="mb-8">
           <button 
             onClick={() => navigate(-1)}
             className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 cursor-pointer"
           >
             <ArrowLeft size={20} />
             <span>Back to Courses</span>
           </button>
           
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
           >
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
                            <BookOpen size={24} />
                        </div>
                        <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">Course Curriculum</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{course.title}</h1>
                    <p className="text-gray-400 max-w-2xl text-lg">
                    Master the fundamentals and advanced concepts in this comprehensive curriculum designed for future experts.
                    </p>
                </div>

                {/* Start Quiz Button */}
                <Link to={`/ai-course/${id}/quiz`}>
                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:scale-105 cursor-pointer whitespace-nowrap">
                        <PlayCircle size={20} />
                        Take Quiz
                    </button>
                </Link>
             </div>
           </motion.div>
        </div>

        {/* --- Chapters List --- */}
        <div className="mt-8 bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl shadow-blue-900/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Chapters</h2>
            <span className="text-sm text-gray-500">{course.chapters ? course.chapters.length : 0} Modules</span>
          </div>
          
          <div className="space-y-4">
            {course.chapters && course.chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:bg-white/2"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  
                  {/* Number Circle */}
                  <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/10 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all shadow-lg shadow-black/50">
                    <span className="font-mono font-bold text-lg">{chapter.id}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {chapter.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                      {chapter.desc}
                    </p>
                    <div className="flex items-center gap-2 text-blue-400 text-xs font-medium uppercase tracking-wider">
                      <Clock size={14} />
                      {chapter.duration}
                    </div>
                  </div>

                  {/* Right Icon (Timer) */}
                  <div className="hidden md:flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-white/5 bg-black text-gray-500 flex items-center justify-center group-hover:text-white group-hover:border-white/20 transition-all">
                      <Timer size={20} strokeWidth={1.5} />
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetails;