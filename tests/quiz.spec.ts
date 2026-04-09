import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/quiz');
});

test('starts the quiz and shows the first question', async ({ page }) => {
  await expect(page.getByTestId('quiz-intro')).toBeVisible();
  await page.getByTestId('start-quiz').click();

  await expect(page.getByTestId('quiz-stage')).toBeVisible();
  await expect(page.getByTestId('quiz-progress-text')).toHaveText('Question 1 of 5');
  await expect(page.getByTestId('quiz-question')).toHaveText(
    'Which word starts with the letter B?'
  );
  await expect(page.getByTestId('next-question')).toBeDisabled();
});

test('moves forward and backward through quiz questions', async ({ page }) => {
  await page.getByTestId('start-quiz').click();
  await page.getByRole('radio', { name: 'Ball' }).check();
  await page.getByTestId('next-question').click();

  await expect(page.getByTestId('quiz-progress-text')).toHaveText('Question 2 of 5');
  await expect(page.getByTestId('quiz-question')).toHaveText('What number comes after 7?');

  await page.getByTestId('previous-question').click();
  await expect(page.getByTestId('quiz-progress-text')).toHaveText('Question 1 of 5');
  await expect(page.getByRole('radio', { name: 'Ball' })).toBeChecked();
});

test('shows a perfect score and review answers', async ({ page }) => {
  await page.getByTestId('start-quiz').click();

  await page.getByRole('radio', { name: 'Ball' }).check();
  await page.getByTestId('next-question').click();
  await page.getByRole('radio', { name: '8' }).check();
  await page.getByTestId('next-question').click();
  await page.getByRole('radio', { name: 'Orange' }).check();
  await page.getByTestId('next-question').click();
  await page.getByRole('radio', { name: 'Triangle' }).check();
  await page.getByTestId('next-question').click();
  await page.getByRole('radio', { name: 'Cow' }).check();
  await page.getByTestId('next-question').click();

  await expect(page.getByTestId('quiz-results')).toBeVisible();
  await expect(page.getByTestId('quiz-score')).toHaveText('You scored 5 out of 5');
  await expect(page.getByTestId('quiz-message')).toHaveText(
    'Excellent work! You are ready for more practice.'
  );
  await expect(page.getByTestId('quiz-review')).toContainText(
    'Which word starts with the letter B? Your answer: Ball. Correct answer: Ball.'
  );
});

test('allows restarting the quiz after results', async ({ page }) => {
  await page.getByTestId('start-quiz').click();

  await page.getByRole('radio', { name: 'Apple' }).check();
  await page.getByTestId('next-question').click();
  await page.getByRole('radio', { name: '6' }).check();
  await page.getByTestId('next-question').click();
  await page.getByRole('radio', { name: 'Purple' }).check();
  await page.getByTestId('next-question').click();
  await page.getByRole('radio', { name: 'Circle' }).check();
  await page.getByTestId('next-question').click();
  await page.getByRole('radio', { name: 'Duck' }).check();
  await page.getByTestId('next-question').click();

  await expect(page.getByTestId('quiz-score')).toHaveText('You scored 0 out of 5');
  await expect(page.getByTestId('quiz-message')).toHaveText(
    'Nice try. Review the answers and try again.'
  );

  await page.getByTestId('retry-quiz').click();
  await expect(page.getByTestId('quiz-intro')).toBeVisible();
  await expect(page.getByTestId('quiz-results')).toBeHidden();
});