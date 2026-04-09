import { expect, type Locator, type Page } from '@playwright/test';

type ProfileOptions = {
  learnerName: string;
  learnerAge: string;
  favoriteLesson: 'lesson-alphabet' | 'lesson-numbers' | 'lesson-animals';
  storyMode?: boolean;
  energyLevel?: string;
};

export class PlaygroundPage {
  readonly page: Page;
  readonly profileCard: Locator;
  readonly actionsCard: Locator;
  readonly tabsCard: Locator;
  readonly matchingCard: Locator;
  readonly factCard: Locator;
  readonly learnerName: Locator;
  readonly learnerAge: Locator;
  readonly storyMode: Locator;
  readonly energyLevel: Locator;
  readonly profileSubmit: Locator;
  readonly profileResult: Locator;
  readonly counterValue: Locator;
  readonly counterIncrease: Locator;
  readonly counterReset: Locator;
  readonly openModalButton: Locator;
  readonly closeModalButton: Locator;
  readonly acceptModalButton: Locator;
  readonly reminderModal: Locator;
  readonly uploadTab: Locator;
  readonly notesTab: Locator;
  readonly uploadPanel: Locator;
  readonly notesPanel: Locator;
  readonly fileUpload: Locator;
  readonly uploadList: Locator;
  readonly noteInput: Locator;
  readonly addNoteButton: Locator;
  readonly noteList: Locator;
  readonly factTopic: Locator;
  readonly loadFactButton: Locator;
  readonly nextFactButton: Locator;
  readonly factResult: Locator;
  readonly penguinChip: Locator;
  readonly lionChip: Locator;
  readonly duckChip: Locator;
  readonly iceZone: Locator;
  readonly savannaZone: Locator;
  readonly pondZone: Locator;
  readonly matchStatus: Locator;
  readonly resetMatchesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileCard = page.getByTestId('profile-card');
    this.actionsCard = page.getByTestId('actions-card');
    this.tabsCard = page.getByTestId('tabs-card');
    this.matchingCard = page.getByTestId('matching-card');
    this.factCard = page.getByTestId('fact-card');
    this.learnerName = page.getByTestId('learner-name');
    this.learnerAge = page.getByTestId('learner-age');
    this.storyMode = page.getByTestId('story-mode');
    this.energyLevel = page.getByTestId('energy-level');
    this.profileSubmit = page.getByTestId('profile-submit');
    this.profileResult = page.getByTestId('profile-result');
    this.counterValue = page.getByTestId('counter-value');
    this.counterIncrease = page.getByTestId('counter-increase');
    this.counterReset = page.getByTestId('counter-reset');
    this.openModalButton = page.getByTestId('open-modal');
    this.closeModalButton = page.getByTestId('close-modal');
    this.acceptModalButton = page.getByTestId('accept-modal');
    this.reminderModal = page.getByTestId('reminder-modal');
    this.uploadTab = page.getByTestId('tab-upload');
    this.notesTab = page.getByTestId('tab-notes');
    this.uploadPanel = page.getByTestId('panel-upload');
    this.notesPanel = page.getByTestId('panel-notes');
    this.fileUpload = page.getByTestId('file-upload');
    this.uploadList = page.getByTestId('upload-list');
    this.noteInput = page.getByTestId('note-input');
    this.addNoteButton = page.getByTestId('add-note');
    this.noteList = page.getByTestId('note-list');
    this.factTopic = page.getByTestId('fact-topic');
    this.loadFactButton = page.getByTestId('load-fact');
    this.nextFactButton = page.getByTestId('next-fact');
    this.factResult = page.getByTestId('fact-result');
    this.penguinChip = page.getByTestId('drag-penguin');
    this.lionChip = page.getByTestId('drag-lion');
    this.duckChip = page.getByTestId('drag-duck');
    this.iceZone = page.getByTestId('drop-ice');
    this.savannaZone = page.getByTestId('drop-savanna');
    this.pondZone = page.getByTestId('drop-pond');
    this.matchStatus = page.getByTestId('match-status');
    this.resetMatchesButton = page.getByTestId('reset-matches');
  }

  async expectCoreSections(): Promise<void> {
    await expect(this.profileCard).toBeVisible();
    await expect(this.actionsCard).toBeVisible();
    await expect(this.tabsCard).toBeVisible();
    await expect(this.matchingCard).toBeVisible();
    await expect(this.factCard).toBeVisible();
  }

  async saveProfile(options: ProfileOptions): Promise<void> {
    await this.learnerName.fill(options.learnerName);
    await this.learnerAge.selectOption(options.learnerAge);
    await this.page.getByTestId(options.favoriteLesson).check();

    if (options.storyMode) {
      await this.storyMode.check();
    }

    if (options.energyLevel) {
      await this.energyLevel.fill(options.energyLevel);
    }

    await this.profileSubmit.click();
  }

  async expectProfileSummary(lines: string[]): Promise<void> {
    await expect(this.profileResult).toBeVisible();

    for (const line of lines) {
      await expect(this.profileResult).toContainText(line);
    }
  }

  async openModal(): Promise<void> {
    await this.openModalButton.click();
    await expect(this.reminderModal).toBeVisible();
  }

  async closeModal(): Promise<void> {
    await this.closeModalButton.click();
    await expect(this.reminderModal).toBeHidden();
  }

  async acceptModal(): Promise<void> {
    await this.acceptModalButton.click();
    await expect(this.reminderModal).toBeHidden();
  }

  async incrementCounter(times: number): Promise<void> {
    for (let currentCount = 0; currentCount < times; currentCount += 1) {
      await this.counterIncrease.click();
    }
  }

  async resetCounter(): Promise<void> {
    await this.counterReset.click();
  }

  async openUploadTab(): Promise<void> {
    await this.uploadTab.click();
    await expect(this.uploadPanel).toBeVisible();
  }

  async openNotesTab(): Promise<void> {
    await this.notesTab.click();
    await expect(this.notesPanel).toBeVisible();
  }

  async addNote(note: string): Promise<void> {
    await this.noteInput.fill(note);
    await this.addNoteButton.click();
  }

  async removeFirstNote(): Promise<void> {
    await this.noteList.getByRole('button', { name: 'Remove' }).click();
  }

  async loadFact(topic: string): Promise<void> {
    await this.factTopic.selectOption(topic);
    await this.loadFactButton.click();
  }

  async loadNextFact(): Promise<void> {
    await this.nextFactButton.click();
  }

  async matchHabitats(): Promise<void> {
    await this.penguinChip.dragTo(this.iceZone);
    await this.lionChip.dragTo(this.savannaZone);
    await this.duckChip.dragTo(this.pondZone);
  }

  async resetMatches(): Promise<void> {
    await this.resetMatchesButton.click();
  }
}