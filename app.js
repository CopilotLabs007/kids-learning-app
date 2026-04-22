const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;
const topicFacts = {
  alphabet: [
    'A is for Apple, and apples can be red, green, or yellow.',
    'The letter M starts words like Moon, Monkey, and Music.',
    'Z is one of the least used letters in English words.'
  ],
  numbers: [
    'Zero means nothing is there, but it is very important in math.',
    'Ten is made from one group of ten ones.',
    'Even numbers can be split into two equal groups.'
  ],
  colors: [
    'Blue and yellow can be mixed to make green.',
    'Warm colors include red, orange, and yellow.',
    'Artists use light and dark shades to make colors feel lively.'
  ],
  shapes: [
    'A triangle always has three sides.',
    'A rectangle has four sides and opposite sides are equal.',
    'A circle has no corners at all.'
  ],
  animals: [
    'Elephants use their trunks to smell, drink, and pick things up.',
    'Penguins cannot fly, but they are strong swimmers.',
    'Giraffes have very long necks to help reach leaves high in trees.'
  ],
  birds: [
    'Owls can turn their heads very far to look around.',
    'Parrots can copy sounds and even short words.',
    'Flamingos get their pink colour from the food they eat.'
  ],
  playground: [
    'Playwright can fill forms, click buttons, and validate live updates.',
    'Drag and drop, tabs, uploads, and dialogs are useful end-to-end checks.',
    'Local storage features are helpful for testing state that survives reloads.'
  ],
  quiz: [
    'Good quizzes show progress, allow retries, and reveal clear results.',
    'Radio buttons are a reliable way to test single-choice questions.',
    'Playwright can assert both the score and the review answers.'
  ]
};

const quizQuestions = [
  {
    id: 'q1',
    prompt: 'Which word starts with the letter B?',
    options: ['Apple', 'Ball', 'Tiger'],
    answer: 'Ball'
  },
  {
    id: 'q2',
    prompt: 'What number comes after 7?',
    options: ['6', '8', '9'],
    answer: '8'
  },
  {
    id: 'q3',
    prompt: 'Which color is made by mixing red and yellow?',
    options: ['Purple', 'Orange', 'Green'],
    answer: 'Orange'
  },
  {
    id: 'q4',
    prompt: 'Which shape has three sides?',
    options: ['Circle', 'Square', 'Triangle'],
    answer: 'Triangle'
  },
  {
    id: 'q5',
    prompt: 'Which animal says Moo?',
    options: ['Duck', 'Cow', 'Lion'],
    answer: 'Cow'
  }
];

const topicOptions = Object.keys(topicFacts);

const renderPage = (res, view, title, page, extraData = {}) => {
  res.render(view, {
    title,
    page,
    ...extraData
  });
};

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  renderPage(res, 'index', 'Kids Learning App - Home', 'home');
});

app.get('/alphabet', (req, res) => {
  renderPage(res, 'alphabet', 'Learn the Alphabet', 'alphabet');
});

app.get('/numbers', (req, res) => {
  renderPage(res, 'numbers', 'Learn Numbers', 'numbers');
});

app.get('/colors', (req, res) => {
  renderPage(res, 'colors', 'Learn Colors', 'colors');
});

app.get('/shapes', (req, res) => {
  renderPage(res, 'shapes', 'Learn Shapes', 'shapes');
});

app.get('/animals', (req, res) => {
  renderPage(res, 'animals', 'Learn Animals', 'animals');
});

app.get('/birds', (req, res) => {
  renderPage(res, 'birds', 'Learn Birds', 'birds');
});

app.get('/playground', (req, res) => {
  renderPage(
    res,
    'playground',
    'Playwright Testing Playground',
    'playground',
    { topicOptions }
  );
});

app.get('/quiz', (req, res) => {
  renderPage(
    res,
    'quiz',
    'Quiz Challenge',
    'quiz',
    { quizQuestions }
  );
});

app.get('/api/facts', (req, res) => {
  const { topic = 'alphabet', index = '0' } = req.query;

  if (!topicOptions.includes(topic)) {
    return res.status(400).json({ error: 'Invalid topic selected.' });
  }

  const parsedIndex = Number.parseInt(index, 10);

  if (Number.isNaN(parsedIndex) || parsedIndex < 0) {
    return res.status(400).json({ error: 'Invalid fact index.' });
  }

  const facts = topicFacts[topic];
  const fact = facts[parsedIndex % facts.length];

  return res.json({
    topic,
    index: parsedIndex % facts.length,
    totalFacts: facts.length,
    fact
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
