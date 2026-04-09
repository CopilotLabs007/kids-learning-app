import { expect, test } from '@playwright/test';
import { PlaygroundPage } from './pages/playground-page';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });

  await page.goto('/playground');
});

test('loads the playground sections', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await expect(page).toHaveTitle(/Playwright Testing Playground/i);
  await playgroundPage.expectCoreSections();
});

test('saves the learner profile', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await playgroundPage.saveProfile({
    learnerName: 'Mia',
    learnerAge: '6-7',
    favoriteLesson: 'lesson-alphabet',
    storyMode: true,
    energyLevel: '8'
  });

  await playgroundPage.expectProfileSummary([
    'Learner: Mia',
    'Age group: 6-7',
    'Favorite lesson: Alphabet',
    'Story mode: On',
    'Energy level: 8'
  ]);
});

test('shows validation if the profile form is incomplete', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await playgroundPage.profileSubmit.click();

  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('alert')).toContainText(
    'Please enter a name, choose an age group, and select a lesson.'
  );
});

test('opens and closes the reminder modal with both buttons', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await playgroundPage.openModal();
  await playgroundPage.closeModal();

  await playgroundPage.openModal();
  await playgroundPage.acceptModal();
});

test('increments and resets the counter', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await expect(playgroundPage.counterValue).toHaveText('0');
  await playgroundPage.incrementCounter(2);
  await expect(playgroundPage.counterValue).toHaveText('2');

  await playgroundPage.resetCounter();
  await expect(playgroundPage.counterValue).toHaveText('0');
});

test('switches tabs and lists uploaded files', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await playgroundPage.openUploadTab();
  await playgroundPage.fileUpload.setInputFiles([
    {
      name: 'practice-note.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('playwright upload sample', 'utf-8')
    }
  ]);

  await expect(playgroundPage.uploadList).toContainText('practice-note.txt');
});

test('adds and removes notes from the notes board', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await playgroundPage.openNotesTab();
  await playgroundPage.addNote('Practice colors');
  await expect(playgroundPage.noteList).toContainText('Practice colors');

  await playgroundPage.removeFirstNote();
  await expect(playgroundPage.noteList).not.toContainText('Practice colors');
});

test('loads facts from the API', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await playgroundPage.loadFact('animals');
  await expect(playgroundPage.factResult).toContainText(/animals:/i);

  const firstFact = await playgroundPage.factResult.textContent();
  await playgroundPage.loadNextFact();
  await expect(playgroundPage.factResult).not.toHaveText(firstFact || '');
});

test('matches habitats with drag and drop', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await playgroundPage.matchHabitats();
  await expect(playgroundPage.matchStatus).toHaveText('3 of 3 matches complete.');

  await playgroundPage.resetMatches();
  await expect(playgroundPage.matchStatus).toHaveText('0 of 3 matches complete.');
});