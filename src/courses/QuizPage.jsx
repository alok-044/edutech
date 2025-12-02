import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Trophy,
  HelpCircle,
  Timer,
  Award // Added Icon
} from "lucide-react";
import ShaderBackground from "../components/bg/ShaderBackground";

const courseData = {
  // 1. Python
  1: {
    title: "Complete Python for AI",
    quizzes: [
      { id: 1, question: "Which keyword is used to define a function in Python?", options: ["func", "define", "def", "function"], answer: 2 },
      { id: 2, question: "What represents a list in Python?", options: ["{}", "[]", "()", "<>"], answer: 1 },
      { id: 3, question: "Which library is primarily used for data manipulation?", options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"], answer: 1 },
      { id: 4, question: "What is the output of print(2 ** 3)?", options: ["6", "8", "9", "Error"], answer: 1 },
      { id: 5, question: "How do you start a single-line comment in Python?", options: ["//", "/*", "#", "--"], answer: 2 },
      { id: 6, question: "Which of the following is an immutable data type?", options: ["List", "Dictionary", "Set", "Tuple"], answer: 3 },
      { id: 7, question: "What is the output of len('Hello')?", options: ["4", "5", "6", "Error"], answer: 1 },
      { id: 8, question: "Which method adds an item to the end of a list?", options: ["push()", "add()", "append()", "insert()"], answer: 2 },
      { id: 9, question: "What keyword is used to import a library?", options: ["include", "import", "require", "using"], answer: 1 },
      { id: 10, question: "What is the result of 10 // 3?", options: ["3.33", "3", "4", "3.0"], answer: 1 },
      { id: 11, question: "Which structure stores key-value pairs?", options: ["List", "Tuple", "Dictionary", "Set"], answer: 2 },
      { id: 12, question: "What is the correct file extension for Python files?", options: [".pyt", ".pt", ".py", ".python"], answer: 2 },
      { id: 13, question: "How do you create a variable with the floating number 2.8?", options: ["x = 2.8", "int x = 2.8", "float x = 2.8", "x : 2.8"], answer: 0 },
      { id: 14, question: "Which operator is used for equality comparison?", options: ["=", "==", "===", "<>"], answer: 1 },
      { id: 15, question: "What does the 'range()' function return?", options: ["A list", "A sequence of numbers", "A set", "A random number"], answer: 1 }
    ]
  },
  // 2. Machine Learning
  2: {
    title: "Machine Learning A-Z",
    quizzes: [
      { id: 1, question: "Which of these is a Supervised Learning algorithm?", options: ["K-Means", "Linear Regression", "Apriori", "PCA"], answer: 1 },
      { id: 2, question: "What is Overfitting?", options: ["High bias, low variance", "High variance, low bias", "Low error on test data", "Model is too simple"], answer: 1 },
      { id: 3, question: "What is the goal of Clustering?", options: ["Predict a value", "Group similar data", "Classify images", "Reduce dimensions"], answer: 1 },
      { id: 4, question: "Which metric is used for Classification?", options: ["MSE", "R-Squared", "Accuracy", "MAE"], answer: 2 },
      { id: 5, question: "What does NLP stand for in ML?", options: ["Neural Learning Process", "Natural Language Processing", "New Learning Protocol", "Node Link Protocol"], answer: 1 },
      { id: 6, question: "Which is an example of Unsupervised Learning?", options: ["Spam Detection", "House Price Prediction", "Customer Segmentation", "Image Classification"], answer: 2 },
      { id: 7, question: "What is a 'feature' in a dataset?", options: ["A row", "A column/variable", "The target", "An error"], answer: 1 },
      { id: 8, question: "Which algorithm uses a decision tree structure?", options: ["SVM", "Random Forest", "K-Means", "Naive Bayes"], answer: 1 },
      { id: 9, question: "What is a confusion matrix used for?", options: ["To confuse the model", "To calculate learning rate", "To evaluate classification performance", "To visualize clusters"], answer: 2 },
      { id: 10, question: "What does 'training data' do?", options: ["Tests the model", "Teaches the model", "Validates the model", "Cleans the data"], answer: 1 },
      { id: 11, question: "What is the 'target' variable?", options: ["The input data", "The variable to predict", "The noise", "The algorithm"], answer: 1 },
      { id: 12, question: "Which technique normalizes data values?", options: ["Regularization", "Feature Scaling", "Pruning", "Boosting"], answer: 1 },
      { id: 13, question: "What does KNN stand for?", options: ["K-Neural Networks", "K-Nearest Neighbors", "Kernel Neural Net", "K-Node Network"], answer: 1 },
      { id: 14, question: "What problem does 'Bias' refer to?", options: ["Model is too complex", "Model is too simple", "Data is missing", "Too many features"], answer: 1 },
      { id: 15, question: "Which library is famous for ML algorithms in Python?", options: ["React", "Scikit-learn", "Django", "Flask"], answer: 1 }
    ]
  },
  // 3. Data Science
  3: {
    title: "Data Science Bootcamp",
    quizzes: [
      { id: 1, question: "What does CSV stand for?", options: ["Computer Style Value", "Comma Separated Values", "Common System Variable", "Code Syntax Value"], answer: 1 },
      { id: 2, question: "Which library is best for visualization?", options: ["Pandas", "NumPy", "Matplotlib", "Requests"], answer: 2 },
      { id: 3, question: "What is 'Data Cleaning'?", options: ["Deleting data", "Formatting and correcting errors", "Backing up data", "Encrypting data"], answer: 1 },
      { id: 4, question: "What is the mean of [2, 4, 6]?", options: ["2", "6", "4", "12"], answer: 2 },
      { id: 5, question: "Which plot is best for distribution?", options: ["Pie Chart", "Histogram", "Line Chart", "Scatter Plot"], answer: 1 },
      { id: 6, question: "What does EDA stand for?", options: ["Electronic Data Analysis", "Exploratory Data Analysis", "External Database Access", "Efficient Data Algorithm"], answer: 1 },
      { id: 7, question: "Which of these is a categorical variable?", options: ["Age", "Height", "Gender", "Salary"], answer: 2 },
      { id: 8, question: "What is an outlier?", options: ["A missing value", "An average value", "An extreme value", "A duplicate value"], answer: 2 },
      { id: 9, question: "What is the median of [1, 3, 5, 100]?", options: ["3", "5", "4", "27.25"], answer: 2 },
      { id: 10, question: "Pandas is built on top of?", options: ["Matplotlib", "NumPy", "Scikit-learn", "TensorFlow"], answer: 1 },
      { id: 11, question: "Which method loads a CSV in Pandas?", options: ["load_csv()", "read_csv()", "import_csv()", "get_csv()"], answer: 1 },
      { id: 12, question: "What is a 'DataFrame'?", options: ["A graph", "A tabular data structure", "A database", "A file format"], answer: 1 },
      { id: 13, question: "Correlation measures?", options: ["Causation", "Relationship strength", "Difference", "Variance"], answer: 1 },
      { id: 14, question: "A Null value represents?", options: ["Zero", "Missing data", "Negative one", "False"], answer: 1 },
      { id: 15, question: "SQL is primarily used for?", options: ["Visualization", "Database Management", "Web Design", "Networking"], answer: 1 }
    ]
  },
  // 4. Generative AI
  4: {
    title: "Generative AI Masterclass",
    quizzes: [
      { id: 1, question: "What does GAN stand for?", options: ["General AI Network", "Generative Adversarial Network", "Global Auto Node", "Graphical AI Net"], answer: 1 },
      { id: 2, question: "Which model architecture revolutionized NLP in 2017?", options: ["RNN", "LSTM", "Transformer", "CNN"], answer: 2 },
      { id: 3, question: "What is 'Hallucination' in LLMs?", options: ["System crash", "Confident but wrong answer", "Slow response", "Data leak"], answer: 1 },
      { id: 4, question: "Which is a diffusion model?", options: ["BERT", "Stable Diffusion", "GPT-4", "ResNet"], answer: 1 },
      { id: 5, question: "What defines a Generative model?", options: ["It classifies data", "It creates new data instances", "It groups data", "It reduces dimensions"], answer: 1 },
      { id: 6, question: "ChatGPT is based on which architecture?", options: ["CNN", "Transformer", "RNN", "Autoencoder"], answer: 1 },
      { id: 7, question: "What is 'Prompt Engineering'?", options: ["Building hardware", "Designing inputs for AI", "Coding in Python", "Training models"], answer: 1 },
      { id: 8, question: "Which is a text-to-image model?", options: ["GPT-3", "Midjourney", "Whisper", "Codex"], answer: 1 },
      { id: 9, question: "In GANs, what does the Discriminator do?", options: ["Generates fake data", "Distinguishes real from fake", "Optimizes the code", "Stores the data"], answer: 1 },
      { id: 10, question: "What is a 'token' in LLMs?", options: ["A coin", "A piece of text (word/part)", "An API key", "A neural node"], answer: 1 },
      { id: 11, question: "Fine-tuning means?", options: ["Creating a model from scratch", "Adjusting a pre-trained model", "Deleting a model", "Speeding up inference"], answer: 1 },
      { id: 12, question: "Which company developed GPT?", options: ["Google", "OpenAI", "Meta", "Amazon"], answer: 1 },
      { id: 13, question: "Temperature in LLMs controls?", options: ["Speed", "Randomness/Creativity", "Cost", "Memory"], answer: 1 },
      { id: 14, question: "What is RAG?", options: ["Retrieval-Augmented Generation", "Random AI Generator", "Real Algorithm Graph", "Rapid Access Guide"], answer: 0 },
      { id: 15, question: "Large Language Models are trained on?", options: ["Images only", "Massive text datasets", "Spreadsheets", "Audio files"], answer: 1 }
    ]
  },
  // 5. Deep Learning
  5: {
    title: "Deep Learning Specialization",
    quizzes: [
      { id: 1, question: "What is an Activation Function?", options: ["Calculates error", "Introduces non-linearity", "Initializes weights", "Splits data"], answer: 1 },
      { id: 2, question: "Which layer is used for Image Processing?", options: ["Dense", "Convolutional", "Recurrent", "Embedding"], answer: 1 },
      { id: 3, question: "What solves the Vanishing Gradient problem?", options: ["Sigmoid", "RNN", "LSTM", "Dropout"], answer: 2 },
      { id: 4, question: "What is a common optimizer?", options: ["Adam", "Eve", "Linear", "Relu"], answer: 0 },
      { id: 5, question: "What is 'Dropout' used for?", options: ["Speeding up training", "Preventing overfitting", "Increasing accuracy", "Saving memory"], answer: 1 },
      { id: 6, question: "What does a Neuron calculate?", options: ["Weighted sum + bias", "Product of inputs", "Difference of inputs", "Random value"], answer: 0 },
      { id: 7, question: "Which function output is between 0 and 1?", options: ["ReLU", "Sigmoid", "Tanh", "Linear"], answer: 1 },
      { id: 8, question: "What is 'Backpropagation'?", options: ["Forward pass", "Updating weights based on error", "Initializing network", "Testing phase"], answer: 1 },
      { id: 9, question: "What is an 'Epoch'?", options: ["One batch processed", "One full pass of dataset", "One minute of training", "One error calculation"], answer: 1 },
      { id: 10, question: "TensorFlow was developed by?", options: ["Facebook", "Google", "Microsoft", "Amazon"], answer: 1 },
      { id: 11, question: "Which architecture is best for sequence data?", options: ["CNN", "RNN", "Perceptron", "Autoencoder"], answer: 1 },
      { id: 12, question: "What is a 'Tensor'?", options: ["A multidimensional array", "A neural connection", "A learning rate", "A loss function"], answer: 0 },
      { id: 13, question: "PyTorch is developed by?", options: ["Google", "Meta (Facebook)", "OpenAI", "IBM"], answer: 1 },
      { id: 14, question: "What does ReLU stand for?", options: ["Rectified Linear Unit", "Real Linear Unit", "Recurring Loop Unit", "Random Logic Unit"], answer: 0 },
      { id: 15, question: "The input layer consists of?", options: ["Hidden neurons", "Feature values", "Output classes", "Weights"], answer: 1 }
    ]
  },
  // 6. NLP
  6: {
    title: "NLP with Transformers",
    quizzes: [
      { id: 1, question: "What is Tokenization?", options: ["Translating text", "Splitting text into units", "Removing stopwords", "Predicting next word"], answer: 1 },
      { id: 2, question: "What does BERT stand for?", options: ["Basic Encoder Rep", "Bidirectional Encoder Representations", "Binary Error Rate", "Big Entity Recognition"], answer: 1 },
      { id: 3, question: "What is 'Stop Word' removal?", options: ["Stopping the model", "Removing common words like 'the'", "Deleting errors", "Ending a sentence"], answer: 1 },
      { id: 4, question: "Which is a library for NLP?", options: ["OpenCV", "NLTK", "Pandas", "Flask"], answer: 1 },
      { id: 5, question: "What is Stemming?", options: ["Growing trees", "Reducing words to root form", "Adding prefixes", "Creating sentences"], answer: 1 },
      { id: 6, question: "What is Sentiment Analysis?", options: ["Checking grammar", "Determining emotion/tone", "Translating language", " summarizing text"], answer: 1 },
      { id: 7, question: "What is a 'Corpus'?", options: ["A dead code", "A large collection of text", "A neural layer", "An error type"], answer: 1 },
      { id: 8, question: "Word2Vec is a technique for?", options: ["Word Embeddings", "Word Counting", "Word Spelling", "Word Deletion"], answer: 0 },
      { id: 9, question: "What implies the 'Attention' mechanism?", options: ["Focusing on relevant parts of input", "Being careful", "Paying specifically for compute", "Listening to audio"], answer: 0 },
      { id: 10, question: "Which task is Seq2Seq used for?", options: ["Image classification", "Machine Translation", "Clustering", "Regression"], answer: 1 },
      { id: 11, question: "What is Named Entity Recognition (NER)?", options: ["Identifying names/dates/places", "Naming variables", "Recognizing errors", "Finding files"], answer: 0 },
      { id: 12, question: "GPT models are?", options: ["Auto-regressive", "Auto-encoding", "Bidirectional only", "Stateless"], answer: 0 },
      { id: 13, question: "What is 'Lemmatization'?", options: ["Grouping words", "Reducing to dictionary base form", "Removing punctuation", "Capitalizing text"], answer: 1 },
      { id: 14, question: "TF-IDF measures?", options: ["Word importance", "Text length", "Processing speed", "File size"], answer: 0 },
      { id: 15, question: "Hugging Face is famous for?", options: ["Social Media", "Transformers Library", "Gaming", "Cloud Hosting"], answer: 1 }
    ]
  },
  // 7. React
  7: {
    title: "React Developer Roadmap",
    quizzes: [
      { id: 1, question: "What is used for passing data to a component?", options: ["State", "Props", "Hooks", "Context"], answer: 1 },
      { id: 2, question: "Which hook handles side effects?", options: ["useState", "useEffect", "useContext", "useReducer"], answer: 1 },
      { id: 3, question: "What is JSX?", options: ["JavaScript XML", "Java Syntax", "JSON XML", "Java Source"], answer: 0 },
      { id: 4, question: "React uses a ____ DOM.", options: ["Real", "Shadow", "Virtual", "False"], answer: 2 },
      { id: 5, question: "Which hook manages local state?", options: ["useEffect", "useState", "useRef", "useMemo"], answer: 1 },
      { id: 6, question: "How do you prevent re-renders of a child?", options: ["React.memo", "useMemo", "useCallback", "All of the above"], answer: 3 },
      { id: 7, question: "What is the children prop?", options: ["A library", "Content inside component tags", "A child component type", "A state variable"], answer: 1 },
      { id: 8, question: "How do you create a ref?", options: ["createRef", "useRef", "ref()", "Both A and B"], answer: 3 },
      { id: 9, question: "Context API is used for?", options: ["Routing", "Global State Management", "API calls", "Styling"], answer: 1 },
      { id: 10, question: "Which command creates a React app?", options: ["npm create-react-app", "npx create-react-app", "node react-app", "install react"], answer: 1 },
      { id: 11, question: "What is a 'Fragment'?", options: ["A broken component", "A wrapper without extra DOM node", "A small state", "An error"], answer: 1 },
      { id: 12, question: "useEffect runs after?", options: ["Render", "Click", "Hover", "State change only"], answer: 0 },
      { id: 13, question: "What does 'npm' stand for?", options: ["Node Package Manager", "New Project Maker", "Network Protocol Method", "No Project Module"], answer: 0 },
      { id: 14, question: "Which library is common for routing?", options: ["React Router", "Redux", "Axios", "Jest"], answer: 0 },
      { id: 15, question: "Redux is used for?", options: ["Routing", "State Management", "Styling", "Testing"], answer: 1 }
    ]
  },
  // 8. JS Zero to Hero
  8: {
    title: "JavaScript Zero to Hero",
    quizzes: [
      { id: 1, question: "Which keyword declares a constant?", options: ["var", "let", "const", "static"], answer: 2 },
      { id: 2, question: "What does 'DOM' stand for?", options: ["Data Object Model", "Document Object Model", "Disk Operating Mode", "Digital Ordinance Map"], answer: 1 },
      { id: 3, question: "Which is NOT a JS data type?", options: ["String", "Boolean", "Float", "Undefined"], answer: 2 },
      { id: 4, question: "What is 'NaN'?", options: ["Not a Null", "New and New", "Not a Number", "None a None"], answer: 2 },
      { id: 5, question: "Which symbol is used for comments?", options: ["//", "#", "", "==>"], answer: 0 },
      { id: 11, question: "Event used for clicking?", options: ["onHover", "onClick", "onPress", "onTouch"], answer: 1 },
      { id: 12, question: "Which array method adds to the end?", options: ["pop()", "shift()", "push()", "unshift()"], answer: 2 },
      { id: 13, question: "What is a Closure?", options: ["Function closing", "Function remembering its scope", "Ending a loop", "Error handling"], answer: 1 },
      { id: 14, question: "Promise has which states?", options: ["Start, Stop", "Pending, Fulfilled, Rejected", "True, False", "On, Off"], answer: 1 },
      { id: 15, question: "Async/Await is sugar for?", options: ["Promises", "Loops", "Classes", "Variables"], answer: 0 }
    ]
  },
  // 9. C Programming
  9: {
    title: "C Programming Essentials",
    quizzes: [
      { id: 1, question: "How do you declare an integer?", options: ["int x;", "num x;", "var x;", "float x;"], answer: 0 },
      { id: 2, question: "Which symbol gets the address of a variable?", options: ["*", "&", "#", "@"], answer: 1 },
      { id: 3, question: "Every C program must have a ____ function.", options: ["start()", "loop()", "main()", "init()"], answer: 2 },
      { id: 4, question: "What ends a statement in C?", options: [":", ".", ";", ","], answer: 2 },
      { id: 5, question: "Which format specifier is for integer?", options: ["%d", "%c", "%f", "%s"], answer: 0 },
      { id: 6, question: "How do you create a pointer?", options: ["int &p", "int *p", "int p[]", "pointer p"], answer: 1 },
      { id: 7, question: "Which header is needed for printf?", options: ["<stdio.h>", "<conio.h>", "<math.h>", "<stdlib.h>"], answer: 0 },
      { id: 8, question: "Array index starts at?", options: ["1", "0", "-1", "Any"], answer: 1 },
      { id: 9, question: "Which loop is a post-test loop?", options: ["for", "while", "do-while", "foreach"], answer: 2 },
      { id: 10, question: "What is the size of 'char'?", options: ["2 bytes", "4 bytes", "1 byte", "8 bytes"], answer: 2 },
      { id: 11, question: "Operator for logical AND?", options: ["&", "&&", "||", "|"], answer: 1 },
      { id: 12, question: "How to comment in C?", options: ["// or /* */", "#", "", "'"], answer: 0 },
      { id: 13, question: "Function used to read input?", options: ["print", "scan", "scanf", "input"], answer: 2 },
      { id: 14, question: "Keyword to define a structure?", options: ["class", "struct", "object", "type"], answer: 1 },
      { id: 15, question: "What is 'malloc' used for?", options: ["Memory allocation", "Math function", "Making loop", "Main logic"], answer: 0 }
    ]
  },
  // 10. Full Stack
  10: {
    title: "Full-Stack Web Development",
    quizzes: [
      { id: 1, question: "Which is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], answer: 2 },
      { id: 2, question: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "Hyper Transfer Text Path", "Home Type Text Page"], answer: 0 },
      { id: 3, question: "Express.js is a framework for?", options: ["React", "Node.js", "Python", "Java"], answer: 1 },
      { id: 4, question: "What is used for styling web pages?", options: ["HTML", "CSS", "JS", "SQL"], answer: 1 },
      { id: 5, question: "What is the frontend of a MERN stack?", options: ["MongoDB", "Express", "React", "Node"], answer: 2 },
      { id: 6, question: "REST API uses which methods?", options: ["GET, POST, PUT, DELETE", "READ, WRITE, SEND", "FETCH, PUSH, PULL", "CONNECT, DISCONNECT"], answer: 0 },
      { id: 7, question: "What is 'Git'?", options: ["A database", "A version control system", "A programming language", "A server"], answer: 1 },
      { id: 8, question: "Which status code means 'Not Found'?", options: ["200", "500", "404", "403"], answer: 2 },
      { id: 9, question: "What is JWT?", options: ["Java Web Token", "JSON Web Token", "Script Web Tag", "Join With Table"], answer: 1 },
      { id: 10, question: "Which is a CSS Framework?", options: ["Django", "Laravel", "Tailwind", "Spring"], answer: 2 },
      { id: 11, question: "What does API stand for?", options: ["Application Programming Interface", "Apple Program Info", "Auto Process Input", "Applied Protocol Index"], answer: 0 },
      { id: 12, question: "What is 'Docker'?", options: ["A coding style", "A containerization platform", "A database", "A browser"], answer: 1 },
      { id: 13, question: "GraphQL is an alternative to?", options: ["SQL", "REST", "HTML", "CSS"], answer: 1 },
      { id: 14, question: "What runs JavaScript on the server?", options: ["Chrome", "Node.js", "React", "Python"], answer: 1 },
      { id: 15, question: "Which is used for state management?", options: ["Redux", "Axios", "Mocha", "Chai"], answer: 0 }
    ]
  },
  // 11. AI Prompt Engineering
  11: {
    title: "AI Prompt Engineering",
    quizzes: [
      { id: 1, question: "What represents a unit of text in LLMs?", options: ["Word", "Byte", "Token", "Char"], answer: 2 },
      { id: 2, question: "Zero-shot prompting means?", options: ["0 examples provided", "0 correct answers", "0 time taken", "0 models used"], answer: 0 },
      { id: 3, question: "What is Hallucination?", options: ["Model creating fake info", "Model seeing images", "Model running fast", "Model crashing"], answer: 0 },
      { id: 4, question: "Which is a text-to-image model?", options: ["GPT-4", "DALL-E", "BERT", "Llama"], answer: 1 },
      { id: 5, question: "Chain-of-Thought prompting helps in?", options: ["Image gen", "Reasoning tasks", "Audio sync", "Database queries"], answer: 1 },
      { id: 6, question: "Few-shot prompting provides?", options: ["No examples", "A few examples", "Code only", "Images only"], answer: 1 },
      { id: 7, question: "Temperature parameter controls?", options: ["Model heat", "Randomness of output", "Token cost", "Speed"], answer: 1 },
      { id: 8, question: "What is 'Prompt Injection'?", options: ["Optimizing prompts", "A security vulnerability", "Installing prompts", "Deleting history"], answer: 1 },
      { id: 9, question: "Which role does a 'System Prompt' play?", options: ["Sets behavior/persona", "Asks the user question", "Outputs the answer", "Connects to internet"], answer: 0 },
      { id: 10, question: "LLM stands for?", options: ["Large Learning Model", "Large Language Model", "Long Logic Mode", "Linear Learning Map"], answer: 1 },
      { id: 11, question: "What is RAG?", options: ["Retrieval-Augmented Generation", "Random AI Gen", "Real Algo Graph", "Rapid Access Guide"], answer: 0 },
      { id: 12, question: "Which model is open source?", options: ["GPT-4", "Llama 2", "Claude 3", "Gemini"], answer: 1 },
      { id: 13, question: "Token limit refers to?", options: ["Cost", "Max input/output length", "Time allowed", "Number of users"], answer: 1 },
      { id: 14, question: "A negative prompt specifies?", options: ["What to include", "What to exclude", "Bad grammar", "Errors"], answer: 1 },
      { id: 15, question: "Fine-tuning creates?", options: ["A specialized model", "A faster model", "A smaller model", "A general model"], answer: 0 }
    ]
  },
  // 12. Computer Vision
  12: {
    title: "Computer Vision with PyTorch",
    quizzes: [
      { id: 1, question: "What is a Tensor?", options: ["A flow chart", "A multi-dimensional array", "A neural node", "An image file"], answer: 1 },
      { id: 2, question: "CNN stands for?", options: ["Central Neural Net", "Convolutional Neural Network", "Computer Neural Node", "Common Network Node"], answer: 1 },
      { id: 3, question: "YOLO is used for?", options: ["Text Gen", "Object Detection", "Audio Sync", "Database"], answer: 1 },
      { id: 4, question: "Augmentation is?", options: ["Shrinking models", "Creating modified data copies", "Deleting data", "Speeding up training"], answer: 1 },
      { id: 5, question: "What is OpenCV?", options: ["A CV Library", "A Database", "A Web Framework", "An OS"], answer: 0 },
      { id: 6, question: "Which layer extracts features?", options: ["Pooling", "Convolutional", "Dense", "Softmax"], answer: 1 },
      { id: 7, question: "Pooling layer reduces?", options: ["Accuracy", "Spatial dimensions", "Filters", "Channels"], answer: 1 },
      { id: 8, question: "RGB image has how many channels?", options: ["1", "2", "3", "4"], answer: 2 },
      { id: 9, question: "Semantic Segmentation classifies?", options: ["Whole image", "Each pixel", "Bounding boxes", "Videos"], answer: 1 },
      { id: 10, question: "What is a 'Kernel' in CNN?", options: ["A filter matrix", "A CPU core", "An image", "A bias"], answer: 0 },
      { id: 11, question: "ResNet is famous for?", options: ["Residual connections", "Recurrent loops", "Random weights", "Resetting state"], answer: 0 },
      { id: 12, question: "Grayscale image has how many channels?", options: ["3", "1", "0", "4"], answer: 1 },
      { id: 13, question: "What is 'IoU'?", options: ["Intersection over Union", "Input over Unit", "Image of User", "Index of Usage"], answer: 0 },
      { id: 14, question: "Transfer learning uses?", options: ["Pre-trained weights", "Random weights", "No weights", "New architecture"], answer: 0 },
      { id: 15, question: "MNIST is a dataset of?", options: ["Cars", "Faces", "Handwritten digits", "Animals"], answer: 2 }
    ]
  },
  // 13. DSA
  13: {
    title: "Data Structures & Algorithms",
    quizzes: [
      { id: 1, question: "What describes worst-case complexity?", options: ["Omega", "Theta", "Big O", "Alpha"], answer: 2 },
      { id: 2, question: "LIFO is associated with?", options: ["Queue", "Stack", "Tree", "Graph"], answer: 1 },
      { id: 3, question: "Binary Search requires data to be?", options: ["Sorted", "Random", "Hashed", "Linked"], answer: 0 },
      { id: 4, question: "Which is a Graph algorithm?", options: ["Merge Sort", "BFS", "Binary Search", "Hashing"], answer: 1 },
      { id: 5, question: "FIFO describes which structure?", options: ["Stack", "Queue", "Array", "Heap"], answer: 1 },
      { id: 6, question: "Time complexity of accessing array index?", options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], answer: 2 },
      { id: 7, question: "Which sort is O(n log n)?", options: ["Bubble Sort", "Merge Sort", "Insertion Sort", "Selection Sort"], answer: 1 },
      { id: 8, question: "A Tree is a type of?", options: ["Graph", "Linear List", "Stack", "Queue"], answer: 0 },
      { id: 9, question: "Hashing uses what to map keys?", options: ["Hash Function", "Sorting", "Looping", "Tree"], answer: 0 },
      { id: 10, question: "Recursion is?", options: ["A loop", "Function calling itself", "An error", "A data type"], answer: 1 },
      { id: 11, question: "Shortest path algorithm?", options: ["Dijkstra's", "DFS", "Binary Search", "Quicksort"], answer: 0 },
      { id: 12, question: "Linked List nodes contain?", options: ["Data & Pointer", "Only Data", "Index & Value", "Key & Pair"], answer: 0 },
      { id: 13, question: "Best case for Bubble Sort?", options: ["O(n)", "O(n^2)", "O(1)", "O(log n)"], answer: 0 },
      { id: 14, question: "Stack operation to remove?", options: ["Push", "Pop", "Peek", "Add"], answer: 1 },
      { id: 15, question: "BST stands for?", options: ["Binary Search Tree", "Best Sort Type", "Basic Structure Type", "Big Search Tree"], answer: 0 }
    ]
  },
  // 14. SQL
  14: {
    title: "SQL & Databases Mastery",
    quizzes: [
      { id: 1, question: "Which command retrieves data?", options: ["GET", "SELECT", "FETCH", "PULL"], answer: 1 },
      { id: 2, question: "A primary key must be?", options: ["Unique & Not Null", "Duplicate", "Null", "Text only"], answer: 0 },
      { id: 3, question: "Which JOIN returns matching rows only?", options: ["LEFT", "RIGHT", "INNER", "OUTER"], answer: 2 },
      { id: 4, question: "SQL stands for?", options: ["Structured Query Language", "Simple Question List", "System Query Link", "Standard Queue Logic"], answer: 0 },
      { id: 5, question: "Which command adds a row?", options: ["ADD", "INSERT", "UPDATE", "CREATE"], answer: 1 },
      { id: 6, question: "Which command modifies data?", options: ["CHANGE", "MODIFY", "UPDATE", "ALTER"], answer: 2 },
      { id: 7, question: "Which clause filters records?", options: ["HAVING", "FILTER", "WHERE", "SELECT"], answer: 2 },
      { id: 8, question: "Command to remove a table?", options: ["DELETE", "REMOVE", "DROP", "ERASE"], answer: 2 },
      { id: 9, question: "What is a Foreign Key?", options: ["Links two tables", "Unlocks database", "External file", "A password"], answer: 0 },
      { id: 10, question: "COUNT() is an example of?", options: ["Aggregate Function", "Scalar Function", "String Function", "Math Operator"], answer: 0 },
      { id: 11, question: "Which wildcards uses '%'?", options: ["LIKE", "EQUALS", "SIMILAR", "SAME"], answer: 0 },
      { id: 12, question: "DISTINCT keyword does what?", options: ["Sorts data", "Removes duplicates", "Counts rows", "Deletes nulls"], answer: 1 },
      { id: 13, question: "ORDER BY default sort is?", options: ["Ascending", "Descending", "Random", "None"], answer: 0 },
      { id: 14, question: "GROUP BY is often used with?", options: ["Aggregates", "Inserts", "Updates", "Drops"], answer: 0 },
      { id: 15, question: "What is Normalization?", options: ["Organizing data to reduce redundancy", "Deleting tables", "Backing up", "Creating indexes"], answer: 0 }
    ]
  },
  // 15. Cloud AWS
  15: {
    title: "Cloud Computing on AWS",
    quizzes: [
      { id: 1, question: "Which is a Compute service?", options: ["S3", "EC2", "RDS", "VPC"], answer: 1 },
      { id: 2, question: "S3 stores data as?", options: ["Files", "Objects", "Blocks", "Tables"], answer: 1 },
      { id: 3, question: "Lambda is?", options: ["Server-based", "Serverless", "Database", "Storage"], answer: 1 },
      { id: 4, question: "IAM handles?", options: ["Billing", "Access & Permissions", "Networking", "Storage"], answer: 1 },
      { id: 5, question: "What is a Region?", options: ["A geographic area", "A data center", "A server", "A rack"], answer: 0 },
      { id: 6, question: "VPC stands for?", options: ["Virtual Public Cloud", "Virtual Private Cloud", "Verified Private Connection", "Visual Private Center"], answer: 1 },
      { id: 7, question: "Which service is a Relational Database?", options: ["DynamoDB", "RDS", "S3", "Lambda"], answer: 1 },
      { id: 8, question: "CloudFront is a?", options: ["CDN", "Database", "Server", "Storage"], answer: 0 },
      { id: 9, question: "Route 53 is for?", options: ["Routing traffic (DNS)", "Driving directions", "Calculating costs", "Monitoring"], answer: 0 },
      { id: 10, question: "What is an AMI?", options: ["Amazon Machine Image", "Amazon Main Interface", "Auto Machine Install", "Account Management Id"], answer: 0 },
      { id: 11, question: "CloudWatch is used for?", options: ["Streaming movies", "Monitoring & Logging", "Watching costs", "Security checks"], answer: 1 },
      { id: 12, question: "EBS stands for?", options: ["Elastic Block Store", "Easy Block Storage", "Elastic Byte System", "External Bus Service"], answer: 0 },
      { id: 13, question: "Which model is AWS?", options: ["IaaS/PaaS/SaaS", "Local Hosting", "On-Premise", "Peer-to-Peer"], answer: 0 },
      { id: 14, question: "Auto Scaling helps to?", options: ["Adjust capacity automatically", "Fix bugs", "Update code", "Backup data"], answer: 0 },
      { id: 15, question: "Glacier is for?", options: ["Fast access", "Archival storage", "Database", "Compute"], answer: 1 }
    ]
  },
  // 16. Cybersecurity
  16: {
    title: "Cybersecurity Fundamentals",
    quizzes: [
      { id: 1, question: "What is the CIA Triad?", options: ["Confidentiality, Integrity, Availability", "Control, Intel, Access", "Cyber, Internet, Attacks", "Code, Input, Audit"], answer: 0 },
      { id: 2, question: "Phishing is a type of?", options: ["Malware", "Social Engineering", "Hardware failure", "Coding error"], answer: 1 },
      { id: 3, question: "SQL Injection targets?", options: ["Firewalls", "Databases", "Email", "Wifi"], answer: 1 },
      { id: 4, question: "VPN stands for?", options: ["Virtual Private Network", "Visual Public Net", "Verified Private Node", "Virtual Port Node"], answer: 0 },
      { id: 5, question: "What is a Firewall?", options: ["Network security device", "A literal wall", "Antivirus software", "A virus"], answer: 0 },
      { id: 6, question: "DDoS stands for?", options: ["Distributed Denial of Service", "Direct Data on Server", "Digital Defense of System", "Data Domain of Site"], answer: 0 },
      { id: 7, question: "Encryption turns text into?", options: ["Plaintext", "Ciphertext", "Code", "Images"], answer: 1 },
      { id: 8, question: "Two-Factor Authentication (2FA) adds?", options: ["Two passwords", "An extra layer of security", "Two users", "Double speed"], answer: 1 },
      { id: 9, question: "What is Malware?", options: ["Malicious Software", "Mail Aware", "Manual Ware", "Main Hardware"], answer: 0 },
      { id: 10, question: "White Hat hackers are?", options: ["Ethical", "Malicious", "Neutral", "Unknown"], answer: 0 },
      { id: 11, question: "Ransomware does what?", options: ["Encrypts files for ransom", "Steals passwords", "Slows down PC", "Shows ads"], answer: 0 },
      { id: 12, question: "HTTPS uses which protocol for security?", options: ["FTP", "SSL/TLS", "SSH", "SMTP"], answer: 1 },
      { id: 13, question: "Brute Force attack means?", options: ["Guessing passwords by trial/error", "Physical damage", "Social engineering", "Using a virus"], answer: 0 },
      { id: 14, question: "What is a Zero-Day exploit?", options: ["An old virus", "A vulnerability unknown to vendor", "A patch", "A secure code"], answer: 1 },
      { id: 15, question: "Penetration Testing simulates?", options: ["A cyber attack", "A hardware failure", "A power outage", "A network upgrade"], answer: 0 }
    ]
  }
};

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Logic to handle course IDs matching what you have in AICourse.jsx
  let lookupId = id;
  if (parseInt(id) >= 7 && parseInt(id) <= 14 && !courseData[id]) {
    lookupId = 4; // Fallback logic
  }
  const course = courseData[lookupId] || courseData[1];
  const quizzes = course.quizzes || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  // Constants
  const PASSING_SCORE_PERCENTAGE = 60;
  const scorePercentage = Math.round((score / quizzes.length) * 100);
  const isPassed = scorePercentage >= PASSING_SCORE_PERCENTAGE;

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === quizzes[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizzes.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  const handleClaimCertificate = () => {
    navigate(`/ai-course/${id}/certificate`);
  };

  if (!quizzes.length) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center relative overflow-hidden">
        <ShaderBackground color="#0f172a" alpha={0.2} />
        <div className="z-10 text-center p-8 bg-[#0A0A0A] border border-white/10 rounded-3xl">
          <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">No Quiz Available</h2>
          <button 
            onClick={() => navigate(-1)} 
            className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0">
        <ShaderBackground color="#0f172a" alpha={0.2} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 md:py-32">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span>Back to Course</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          {!showResult ? (
            <>
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">{course.title}</h1>
                  <p className="text-gray-400 text-sm">Question {currentQuestion + 1} of {quizzes.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Timer className="w-6 h-6 text-blue-400" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/5 h-2 rounded-full mb-8 overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / quizzes.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                  {quizzes[currentQuestion].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-10">
                {quizzes[currentQuestion].options.map((option, index) => {
                  let optionClass = "border-white/10 hover:bg-white/5";
                  let icon = null;

                  if (isAnswered) {
                    if (index === quizzes[currentQuestion].answer) {
                      optionClass = "border-green-500/50 bg-green-500/10 text-green-400";
                      icon = <CheckCircle2 size={20} />;
                    } else if (index === selectedOption) {
                      optionClass = "border-red-500/50 bg-red-500/10 text-red-400";
                      icon = <XCircle size={20} />;
                    } else {
                      optionClass = "border-white/5 opacity-50";
                    }
                  } else if (selectedOption === index) {
                    optionClass = "border-blue-500 bg-blue-500/10 text-blue-400";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(index)}
                      disabled={isAnswered}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${optionClass} ${!isAnswered && 'cursor-pointer hover:border-white/30'}`}
                    >
                      <span className="font-medium text-lg text-white/90">{option}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex justify-end pt-6 border-t border-white/10">
                <button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className={`px-8 py-3.5 rounded-xl font-medium transition-all transform active:scale-95 ${
                    isAnswered 
                      ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-lg shadow-blue-500/20" 
                      : "bg-white/5 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {currentQuestion === quizzes.length - 1 ? "View Results" : "Next Question"}
                </button>
              </div>
            </>
          ) : (
            // Results View
            <div className="text-center py-10">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border ${isPassed ? 'bg-yellow-500/20 border-yellow-500/30' : 'bg-red-500/20 border-red-500/30'}`}
              >
                <Trophy className={`w-12 h-12 ${isPassed ? 'text-yellow-500' : 'text-red-500'}`} />
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white mb-2">{isPassed ? "Quiz Passed!" : "Quiz Failed"}</h2>
              <p className="text-gray-400 mb-8 text-lg">
                You scored <span className="text-white font-bold text-2xl">{score}</span> out of {quizzes.length} ({scorePercentage}%)
              </p>

              {/* Conditional Score Message */}
              {!isPassed && (
                <p className="text-red-400 mb-6 text-sm">
                  You need at least {PASSING_SCORE_PERCENTAGE}% to claim your certificate.
                </p>
              )}

              <div className="w-full h-4 bg-white/10 rounded-full max-w-sm mx-auto mb-10 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / quizzes.length) * 100}%` }}
                  className={`h-full ${isPassed ? 'bg-green-500' : 'bg-red-500'}`}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 text-white rounded-xl font-medium transition-colors cursor-pointer"
                >
                  Back to Course
                </button>
                <button 
                  onClick={handleRetry}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 text-white rounded-xl font-medium transition-colors cursor-pointer"
                >
                  <RefreshCw size={18} />
                  Retry Quiz
                </button>

                {/* Show Certificate Button only if Passed */}
                {isPassed && (
                   <button 
                     onClick={handleClaimCertificate}
                     className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors cursor-pointer shadow-lg shadow-blue-600/20 animate-pulse"
                   >
                     <Award size={18} />
                     Claim Certificate
                   </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;