# Kids Learning World

A fun and interactive Node.js web application designed to help children learn basic educational concepts including alphabet, numbers, colors, shapes, and animals.

## Latest Changes

- Added **Playwright Playground** (`/playground`) for end-to-end practice scenarios (forms, modals, tabs, uploads, drag and drop, and API checks).
- Added **Quiz Challenge** (`/quiz`) with progress tracking, scoring, answer review, and retry flow.
- Added **Facts API** endpoint (`/api/facts`) used by interactive pages and test automation.
- Added Playwright automated test coverage for the new playground and quiz experiences.

## Prompt Used

    A complete Node.js web application with Express and EJS templating
    Interactive pages for learning different concepts:
    Alphabet (A-Z with example words)
    Numbers (1-20 with number words)
    Colors (various colors with visual representation)
    Shapes (common shapes with visual representation)
    Animals (different animals with their sounds)
    Responsive design that works on different screen sizes
    Interactive elements with text-to-speech functionality (using the Web Speech API)


## Project Overview

This application was created as a simple educational tool for children, featuring interactive cards with visual elements and text-to-speech functionality to make learning engaging and fun.

## Features

- **Home Page**: Overview of all learning categories
- **Alphabet Section**: Learn letters A to Z with example words
- **Numbers Section**: Learn numbers 1-20 with their word forms
- **Colors Section**: Explore colors with visual examples
- **Shapes Section**: Visual representation of common shapes
- **Animals Section**: Learn animals with images and their sounds
- **Playwright Playground**: Practice modern UI and API testing flows
- **Quiz Challenge**: Answer questions and view score and review summary
- **Interactive Elements**: Cards respond to clicks with animations and voice
- **Responsive Design**: Works on desktops, tablets, and mobile devices

## Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: HTML, CSS, JavaScript
- **Templating**: EJS (Embedded JavaScript)
- **Text-to-Speech**: Web Speech API for interactive learning

## Project Structure

```
├── app.js              # Main application file with Express setup and routes
├── package.json        # Project dependencies and scripts
├── tests/              # Playwright test suites
│   ├── playground.spec.ts
│   └── quiz.spec.ts
├── public/             # Static assets
│   ├── css/            # Stylesheet files
│   │   └── style.css   # Main CSS file
│   ├── js/             # JavaScript files
│   │   └── main.js     # Main JS file for interactivity
│   └── images/         # Image assets
└── views/              # EJS template files
    ├── layout.ejs      # Main layout template
    ├── index.ejs       # Home page
    ├── alphabet.ejs    # Alphabet learning page
    ├── numbers.ejs     # Numbers learning page
    ├── colors.ejs      # Colors learning page
    ├── shapes.ejs      # Shapes learning page
    ├── animals.ejs     # Animals learning page
    ├── playground.ejs  # Playwright practice page
    └── quiz.ejs        # Quiz challenge page
```

## Implementation Details

### Routes

The application includes the following routes:
- `/` - Home page with category cards
- `/alphabet` - Learn the alphabet
- `/numbers` - Learn numbers
- `/colors` - Learn colors
- `/shapes` - Learn shapes
- `/animals` - Learn animals
- `/playground` - Playwright testing playground
- `/quiz` - Interactive quiz challenge
- `/api/facts` - JSON facts endpoint by topic and index

### Interactivity

- Cards respond to clicks with animations
- Text-to-speech functionality reads out content when cards are clicked
- Visual feedback on hover and click

### Styling

- Colorful, kid-friendly design with rounded corners and vibrant colors
- Responsive layout that works on various screen sizes
- Interactive elements with hover and click effects

## Prompts Used for Development

The application was developed based on the following prompts:

1. "Create the simple nodejs web application based on the mockups in kids-learning folder"
2. "Continue with new workspace setup" 
3. "Continue to iterate?"
4. "animal images are not displaying in the application"

## Running the Application

### From Terminal

1. Navigate to the application directory:
   ```
   cd kids-learning-app
   ```

2. Install all dependencies (first time only):
   ```
   npm install
   ```

3. Start the application:
   ```
   npm start
   ```
   
   This will run the server on port 3000 by default. You should see:
   ```
   Server is running on http://localhost:3000
   ```

4. For development with automatic restart when files change:
   ```
   npm run dev
   ```

5. Access the application by opening a browser and navigating to:
   ```
   http://localhost:3000
   ```

6. To stop the server:
   - Press `Ctrl+C` in the terminal where the server is running

### Using Visual Studio Code

1. Open the project folder in VS Code
2. Open the integrated terminal (View > Terminal)
3. Run `npm start` to start the server
4. Use the "Debug" functionality to run with debugging enabled

## Follow Steps to Get Started

Follow these steps to get up and running quickly.

### Prerequisites
- Node.js (v18+)
- npm
- A modern web browser

### Step 1: Clone the Repository
```bash
git clone https://github.com/CopilotLabs007/kids-learning-app.git
cd kids-learning-app
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the App
```bash
npm start
```
Open your browser at **http://localhost:3000**

---

## Future Enhancements

Potential improvements for future versions:
- Add a quiz/game mode for testing knowledge
- Include audio pronunciations for all items
- Add user accounts to track progress
- Implement more learning categories (e.g., vegetables, vehicles)
- Create printable worksheets for offline learning

## License

ISC

---

Created with ❤️ for children's education
