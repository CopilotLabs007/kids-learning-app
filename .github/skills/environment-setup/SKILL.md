---
name: environment-setup
description: Automates initial setup steps for new team members working on kids-learning-app, including prerequisites, installation, and verification.
---

# Instructions

When I say "set up my environment" or "help me get started," guide through these steps:

## Prerequisites Check

First, verify these are installed:

```bash
# Check Node.js (need v18+)
node --version

# Check npm
npm --version

# Check Git
git --version

# If Node.js not installed:
# Visit https://nodejs.org/ and install LTS version
```

## Repository Setup

### 1. Clone Repository

```bash
# Clone the repo
git clone <repository-url>
cd kids-learning-app

# Check you're on main branch
git branch

# Update to latest
git pull origin main
```

### 2. Install Dependencies

```bash
# Install all npm packages
npm install

# Verify package.json dependencies installed
ls node_modules/
```

**Expected packages:**
- express (v5.1.0)
- express-ejs-layouts (v2.5.1)
- ejs (installed as dependency)

### 3. Verify File Structure

Check that you have:
```
kids-learning-app/
├── app.js              # Main server file
├── package.json        # Dependencies
├── .gitignore          # Git ignore rules
├── README.md           # Project documentation
├── public/
│   ├── css/
│   │   └── style.css   # All styles
│   └── js/
│       ├── main.js     # TTS utilities
│       └── quiz.js     # Quiz logic
└── views/
    ├── layout.ejs      # Shared layout with nav
    ├── index.ejs       # Home page
    ├── alphabet.ejs    # Topic pages...
    ├── numbers.ejs
    ├── colors.ejs
    ├── shapes.ejs
    ├── animals.ejs
    ├── fruits.ejs
    └── quiz-fruits.ejs # Quiz page
```

### 4. Configure Environment

```bash
# Create .env file (if needed)
echo "PORT=3000" > .env
echo "NODE_ENV=development" >> .env

# Ensure .env is in .gitignore
grep ".env" .gitignore
```

### 5. Start Development Server

```bash
# Start the app
npm start

# You should see:
# Server is running on http://localhost:3000
```

Keep this terminal open while developing.

### 6. Verify Installation

Open browser and test:

1. **Home page**: http://localhost:3000/
   - Should show 6 topic cards (Alphabet, Numbers, Colors, Shapes, Animals, Fruits)

2. **Topic page**: http://localhost:3000/alphabet
   - Should show alphabet cards with letters and emojis
   - Click a card - should hear TTS

3. **Quiz page**: http://localhost:3000/quiz/fruits
   - Should show quiz questions
   - Click answer - should see feedback
   - Complete quiz - should see score

4. **Check console**: No errors in browser DevTools (F12)

## VS Code Setup (Recommended)

### Install Extensions

```bash
# Open VS Code
code .

# Install recommended extensions:
# - ESLint
# - Prettier
# - EJS language support
# - LiveServer (optional)
```

### VS Code Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "files.eol": "\n",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Useful VS Code Shortcuts

- `Cmd/Ctrl + P` - Quick file open
- `Cmd/Ctrl + Shift + F` - Search across files
- `Cmd/Ctrl + B` - Toggle sidebar
- `Cmd/Ctrl + `` ` - Toggle terminal

## Development Workflow

### Making Changes

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** to files

3. **Test locally**
   - Restart server if you changed `app.js`
   - Refresh browser if you changed views/JS/CSS

4. **Commit changes**
   ```bash
   git add .
   git commit -m "Brief description of changes"
   ```

5. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

### Hot Reload (Optional)

For automatic server restart on file changes:

```bash
# Install nodemon globally
npm install -g nodemon

# Or add to project
npm install --save-dev nodemon

# Update package.json scripts:
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}

# Run in dev mode
npm run dev
```

## Troubleshooting Setup Issues

### Issue: npm install fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Port 3000 already in use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process (replace <PID> with actual PID)
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### Issue: TTS not working

- Check browser supports Web Speech API (Chrome, Edge, Safari)
- Check system volume is not muted
- Try different browser

### Issue: Styles not loading

```bash
# Clear browser cache
# Cmd/Ctrl + Shift + R (hard refresh)

# Verify CSS file path
curl http://localhost:3000/css/style.css
```

## Next Steps After Setup

1. **Read README.md**: Understand project structure and features
2. **Explore code**: Start with `app.js` → `views/` → `public/js/`
3. **Pick a task**: Look for "good first issue" labels
4. **Ask questions**: Don't hesitate if something is unclear
5. **Make a small change**: Add a comment or fix a typo to test workflow

## Project-Specific Notes

### Educational Purpose
This is a learning app for kids (ages 3-7) to learn:
- Alphabet (letters A-Z with emojis)
- Numbers (0-9 with emojis)
- Colors (8 basic colors)
- Shapes (5 basic shapes)
- Animals (10 common animals)
- Fruits (10 common fruits)
- Quizzes (interactive tests)

### Technology Stack
- **Backend**: Node.js + Express 5
- **Templates**: EJS with layouts
- **Frontend**: Vanilla JavaScript (no frameworks)
- **Styling**: Pure CSS with CSS Grid/Flexbox
- **TTS**: Web Speech API
- **No database**: All data is static

### Design Philosophy
- Large, colorful cards
- Click for audio (TTS)
- Simple navigation
- Age-appropriate content
- Fast and responsive
- No ads or tracking

## Welcome Message

```
Welcome to kids-learning-app! 🎉

Your environment is set up and ready to go.

Server running at: http://localhost:3000

Next steps:
  1. Read README.md for project overview
  2. Explore the codebase
  3. Pick a task from issues or ask what to work on
  4. Have fun coding! 🚀

Need help? Ask in team chat or create an issue.
```
