const THEME_KEY = 'kids-learning-theme';
const FAVORITES_KEY = 'kids-learning-favorites';
const VISITED_KEY = 'kids-learning-visited';
const NOTES_KEY = 'kids-learning-notes';
const COUNTER_KEY = 'kids-learning-counter';

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeVisitedPages();
    initializeFavorites();
    initializeTopicSearch();
    initializeCardInteractions();
    initializePlayground();
    initializeQuiz();
});

const readStoredArray = (key) => {
    try {
        const parsedValue = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(parsedValue) ? parsedValue : [];
    } catch {
        return [];
    }
};

const writeStoredArray = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const updateDashboardCount = (elementId, value) => {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
        targetElement.textContent = String(value);
    }
};

const speakText = (text) => {
    const cleanText = String(text).replace(/<[^>]*>/g, '').trim().slice(0, 240);

    if (!cleanText || !('speechSynthesis' in window)) {
        return;
    }

    const speech = new SpeechSynthesisUtterance(cleanText);
    speech.volume = 1;
    speech.rate = 0.9;
    speech.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
};

const initializeTheme = () => {
    const toggleButton = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem(THEME_KEY) || 'sunny';
    document.body.dataset.theme = savedTheme;

    const updateButton = () => {
        if (!toggleButton) {
            return;
        }

        const isSkyTheme = document.body.dataset.theme === 'sky';
        toggleButton.textContent = isSkyTheme
            ? 'Switch to Sunny Theme'
            : 'Switch to Sky Theme';
        toggleButton.setAttribute('aria-pressed', String(isSkyTheme));
    };

    updateButton();

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            document.body.dataset.theme = document.body.dataset.theme === 'sky'
                ? 'sunny'
                : 'sky';
            localStorage.setItem(THEME_KEY, document.body.dataset.theme);
            updateButton();
        });
    }
};

const initializeVisitedPages = () => {
    const pageName = document.body.dataset.page;

    if (pageName && pageName !== 'home') {
        const visitedPages = new Set(readStoredArray(VISITED_KEY));
        visitedPages.add(pageName);
        writeStoredArray(VISITED_KEY, Array.from(visitedPages));
    }

    updateDashboardCount('visited-count', readStoredArray(VISITED_KEY).length);
};

const initializeFavorites = () => {
    const favoriteButtons = document.querySelectorAll('[data-favorite-topic]');
    const favorites = new Set(readStoredArray(FAVORITES_KEY));

    const syncButtonState = (button, isFavorite) => {
        button.classList.toggle('is-active', isFavorite);
        button.textContent = isFavorite ? 'Saved' : 'Save Topic';
        button.setAttribute('aria-pressed', String(isFavorite));
    };

    favoriteButtons.forEach((button) => {
        const topic = button.dataset.favoriteTopic;
        syncButtonState(button, favorites.has(topic));

        button.addEventListener('click', () => {
            if (favorites.has(topic)) {
                favorites.delete(topic);
            } else {
                favorites.add(topic);
            }

            writeStoredArray(FAVORITES_KEY, Array.from(favorites));
            syncButtonState(button, favorites.has(topic));
            updateDashboardCount('favorite-count', favorites.size);
        });
    });

    updateDashboardCount('favorite-count', favorites.size);
};

const initializeTopicSearch = () => {
    const searchInput = document.getElementById('topic-search');
    const topicCards = document.querySelectorAll('[data-topic-card]');
    const emptyState = document.getElementById('topic-empty-state');

    if (!searchInput || !topicCards.length) {
        return;
    }

    const applyFilter = () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        topicCards.forEach((card) => {
            const name = card.dataset.topicName || '';
            const keywords = card.dataset.topicKeywords || '';
            const isVisible = !searchTerm
                || `${name} ${keywords}`.toLowerCase().includes(searchTerm);

            card.hidden = !isVisible;
            if (isVisible) {
                visibleCount += 1;
            }
        });

        if (emptyState) {
            emptyState.hidden = visibleCount > 0;
        }
    };

    searchInput.addEventListener('input', applyFilter);
};

const initializeCardInteractions = () => {
    const cards = document.querySelectorAll(
        '.letter-card, .number-card, .color-card, .shape-card, .animal-card'
    );

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.add('is-popped');
            setTimeout(() => {
                card.classList.remove('is-popped');
            }, 250);

            if (card.classList.contains('animal-card')) {
                const animalName = card.querySelector('.animal-name')?.textContent || '';
                const animalSound = card.querySelector('.animal-sound')?.textContent || '';
                speakText(`${animalName} says ${animalSound}`);
            }

            if (card.classList.contains('letter-card')) {
                const letter = card.querySelector('.letter')?.textContent || '';
                const example = card.querySelector('.example')?.textContent || '';
                speakText(`${letter} for ${example}`);
            }

            if (card.classList.contains('number-card')) {
                const number = card.querySelector('.number')?.textContent || '';
                const numberWord = card.querySelector('.number-word')?.textContent || '';
                speakText(`${number}, ${numberWord}`);
            }

            if (card.classList.contains('color-card')) {
                const colorName = card.querySelector('.color-name')?.textContent || '';
                speakText(colorName);
            }

            if (card.classList.contains('shape-card')) {
                const shapeName = card.querySelector('.shape-name')?.textContent || '';
                speakText(`This is a ${shapeName}`);
            }
        });
    });
};

const initializePlayground = () => {
    if (document.body.dataset.page !== 'playground') {
        return;
    }

    initializeProfileForm();
    initializeCounter();
    initializeModal();
    initializeTabs();
    initializeUploads();
    initializeNotes();
    initializeMatchingGame();
    initializeFactFinder();
};

const initializeProfileForm = () => {
    const form = document.getElementById('profile-form');
    const energyInput = document.getElementById('energy-level');
    const energyOutput = document.getElementById('energy-output');
    const clearButton = document.getElementById('profile-clear');
    const errorElement = document.getElementById('profile-error');
    const resultElement = document.getElementById('profile-result');

    if (!form || !energyInput || !energyOutput || !clearButton || !errorElement || !resultElement) {
        return;
    }

    const updateEnergyOutput = () => {
        energyOutput.textContent = energyInput.value;
    };

    const resetResult = () => {
        errorElement.hidden = true;
        errorElement.textContent = '';
        resultElement.hidden = true;
        resultElement.replaceChildren();
    };

    updateEnergyOutput();
    energyInput.addEventListener('input', updateEnergyOutput);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        resetResult();

        const learnerName = document.getElementById('learner-name')?.value.trim() || '';
        const learnerAge = document.getElementById('learner-age')?.value || '';
        const selectedLesson = form.querySelector('input[name="favoriteLesson"]:checked');
        const storyMode = document.getElementById('story-mode')?.checked;

        if (learnerName.length < 2 || !learnerAge || !selectedLesson) {
            errorElement.textContent = 'Please enter a name, choose an age group, and select a lesson.';
            errorElement.hidden = false;
            return;
        }

        const lines = [
            `Learner: ${learnerName}`,
            `Age group: ${learnerAge}`,
            `Favorite lesson: ${selectedLesson.value}`,
            `Story mode: ${storyMode ? 'On' : 'Off'}`,
            `Energy level: ${energyInput.value}`
        ];

        const fragment = document.createDocumentFragment();
        lines.forEach((line) => {
            const row = document.createElement('p');
            row.textContent = line;
            fragment.appendChild(row);
        });

        resultElement.appendChild(fragment);
        resultElement.hidden = false;
    });

    clearButton.addEventListener('click', () => {
        form.reset();
        energyInput.value = '5';
        updateEnergyOutput();
        resetResult();
    });
};

const initializeCounter = () => {
    const counterValue = document.getElementById('counter-value');
    const decreaseButton = document.getElementById('counter-decrease');
    const increaseButton = document.getElementById('counter-increase');
    const resetButton = document.getElementById('counter-reset');

    if (!counterValue || !decreaseButton || !increaseButton || !resetButton) {
        return;
    }

    let currentValue = Number.parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10);

    const render = () => {
        counterValue.textContent = String(currentValue);
        localStorage.setItem(COUNTER_KEY, String(currentValue));
    };

    decreaseButton.addEventListener('click', () => {
        currentValue -= 1;
        render();
    });

    increaseButton.addEventListener('click', () => {
        currentValue += 1;
        render();
    });

    resetButton.addEventListener('click', () => {
        currentValue = 0;
        render();
    });

    render();
};

const initializeModal = () => {
    const modal = document.getElementById('reminder-modal');
    const openButton = document.getElementById('open-modal');
    const closeButton = document.getElementById('close-modal');
    const acceptButton = document.getElementById('accept-modal');

    if (!modal || !openButton || !closeButton || !acceptButton) {
        return;
    }

    const closeModal = () => {
        modal.hidden = true;
    };

    const openModal = () => {
        modal.hidden = false;
        acceptButton.focus();
    };

    openButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    acceptButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });
};

const initializeTabs = () => {
    const tabButtons = document.querySelectorAll('[data-tab-target]');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (!tabButtons.length || !tabPanels.length) {
        return;
    }

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.tabTarget;

            tabButtons.forEach((otherButton) => {
                const isSelected = otherButton === button;
                otherButton.classList.toggle('is-active', isSelected);
                otherButton.setAttribute('aria-selected', String(isSelected));
            });

            tabPanels.forEach((panel) => {
                const isTarget = panel.id === targetId;
                panel.hidden = !isTarget;
                panel.classList.toggle('is-active', isTarget);
            });
        });
    });
};

const initializeUploads = () => {
    const uploadInput = document.getElementById('file-upload');
    const uploadList = document.getElementById('upload-list');

    if (!uploadInput || !uploadList) {
        return;
    }

    uploadInput.addEventListener('change', () => {
        uploadList.replaceChildren();
        const files = Array.from(uploadInput.files || []);

        files.forEach((file) => {
            const item = document.createElement('li');
            item.textContent = `${file.name} (${file.type || 'unknown type'})`;
            uploadList.appendChild(item);
        });
    });
};

const initializeNotes = () => {
    const noteInput = document.getElementById('note-input');
    const addNoteButton = document.getElementById('add-note');
    const noteList = document.getElementById('note-list');

    if (!noteInput || !addNoteButton || !noteList) {
        return;
    }

    let notes = readStoredArray(NOTES_KEY);

    const renderNotes = () => {
        noteList.replaceChildren();

        notes.forEach((note, index) => {
            const item = document.createElement('li');
            item.className = 'note-item';

            const text = document.createElement('span');
            text.textContent = note;

            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'icon-btn';
            removeButton.dataset.removeIndex = String(index);
            removeButton.textContent = 'Remove';

            item.append(text, removeButton);
            noteList.appendChild(item);
        });

        writeStoredArray(NOTES_KEY, notes);
    };

    addNoteButton.addEventListener('click', () => {
        const note = noteInput.value.trim();

        if (!note) {
            return;
        }

        notes = [...notes, note];
        noteInput.value = '';
        renderNotes();
    });

    noteList.addEventListener('click', (event) => {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        const removeIndex = target.dataset.removeIndex;

        if (typeof removeIndex === 'undefined') {
            return;
        }

        notes = notes.filter((_note, index) => index !== Number.parseInt(removeIndex, 10));
        renderNotes();
    });

    renderNotes();
};

const initializeMatchingGame = () => {
    const chips = document.querySelectorAll('.draggable-chip');
    const dropZones = document.querySelectorAll('.drop-zone');
    const statusText = document.getElementById('match-status');
    const resetButton = document.getElementById('reset-matches');
    let draggedItem = '';

    if (!chips.length || !dropZones.length || !statusText || !resetButton) {
        return;
    }

    const updateStatus = () => {
        const matches = document.querySelectorAll('.drop-zone.is-matched').length;
        statusText.textContent = `${matches} of 3 matches complete.`;
    };

    chips.forEach((chip) => {
        chip.dataset.originalLabel = chip.textContent;

        chip.addEventListener('dragstart', (event) => {
            draggedItem = chip.dataset.item || '';
            event.dataTransfer?.setData('text/plain', draggedItem);
        });
    });

    dropZones.forEach((zone) => {
        zone.dataset.baseLabel = zone.textContent;

        zone.addEventListener('dragover', (event) => {
            event.preventDefault();
            zone.classList.add('is-hovered');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('is-hovered');
        });

        zone.addEventListener('drop', (event) => {
            event.preventDefault();
            zone.classList.remove('is-hovered');
            const droppedItem = event.dataTransfer?.getData('text/plain') || draggedItem;

            if (droppedItem && droppedItem === zone.dataset.accepts) {
                zone.classList.add('is-matched');
                zone.textContent = `${zone.dataset.baseLabel}: ${droppedItem}`;

                const matchedChip = document.querySelector(`.draggable-chip[data-item="${droppedItem}"]`);
                if (matchedChip instanceof HTMLElement) {
                    matchedChip.disabled = true;
                    matchedChip.hidden = true;
                }
            }

            updateStatus();
        });
    });

    resetButton.addEventListener('click', () => {
        chips.forEach((chip) => {
            chip.disabled = false;
            chip.hidden = false;
            chip.textContent = chip.dataset.originalLabel || chip.textContent;
        });

        dropZones.forEach((zone) => {
            zone.classList.remove('is-matched', 'is-hovered');
            zone.textContent = zone.dataset.baseLabel || zone.textContent;
        });

        updateStatus();
    });

    updateStatus();
};

const initializeFactFinder = () => {
    const topicSelect = document.getElementById('fact-topic');
    const loadButton = document.getElementById('load-fact');
    const nextButton = document.getElementById('next-fact');
    const result = document.getElementById('fact-result');
    let currentIndex = 0;

    if (!topicSelect || !loadButton || !nextButton || !result) {
        return;
    }

    const loadFact = async () => {
        const selectedTopic = topicSelect.value;
        const response = await fetch(`/api/facts?topic=${encodeURIComponent(selectedTopic)}&index=${currentIndex}`);

        if (!response.ok) {
            result.textContent = 'Unable to load a fact right now.';
            return;
        }

        const payload = await response.json();
        result.textContent = `${payload.topic}: ${payload.fact}`;
    };

    loadButton.addEventListener('click', () => {
        currentIndex = 0;
        loadFact();
    });

    nextButton.addEventListener('click', () => {
        currentIndex += 1;
        loadFact();
    });

    topicSelect.addEventListener('change', () => {
        currentIndex = 0;
        result.textContent = 'Select a topic and load a fact.';
    });
};

const initializeQuiz = () => {
    if (document.body.dataset.page !== 'quiz') {
        return;
    }

    const dataElement = document.getElementById('quiz-data');
    const startButton = document.getElementById('start-quiz');
    const intro = document.getElementById('quiz-intro');
    const stage = document.getElementById('quiz-stage');
    const results = document.getElementById('quiz-results');
    const progressText = document.getElementById('quiz-progress-text');
    const progressBar = document.getElementById('quiz-progress-bar');
    const questionElement = document.getElementById('quiz-question');
    const form = document.getElementById('quiz-form');
    const previousButton = document.getElementById('previous-question');
    const nextButton = document.getElementById('next-question');
    const scoreElement = document.getElementById('quiz-score');
    const messageElement = document.getElementById('quiz-message');
    const reviewElement = document.getElementById('quiz-review');
    const retryButton = document.getElementById('retry-quiz');

    if (
        !dataElement || !startButton || !intro || !stage || !results || !progressText
        || !progressBar || !questionElement || !form || !previousButton || !nextButton
        || !scoreElement || !messageElement || !reviewElement || !retryButton
    ) {
        return;
    }

    const questions = JSON.parse(dataElement.textContent || '[]');
    const state = {
        currentIndex: 0,
        answers: Array(questions.length).fill('')
    };

    const renderQuestion = () => {
        const currentQuestion = questions[state.currentIndex];
        questionElement.textContent = currentQuestion.prompt;
        progressText.textContent = `Question ${state.currentIndex + 1} of ${questions.length}`;
        progressBar.style.width = `${((state.currentIndex + 1) / questions.length) * 100}%`;
        previousButton.disabled = state.currentIndex === 0;
        nextButton.textContent = state.currentIndex === questions.length - 1 ? 'Show Results' : 'Next';

        form.replaceChildren();

        currentQuestion.options.forEach((option) => {
            const label = document.createElement('label');
            label.className = 'quiz-option';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'quiz-answer';
            input.value = option;
            input.checked = state.answers[state.currentIndex] === option;

            input.addEventListener('change', () => {
                state.answers[state.currentIndex] = option;
                nextButton.disabled = false;
            });

            const text = document.createElement('span');
            text.textContent = option;

            label.append(input, text);
            form.appendChild(label);
        });

        nextButton.disabled = !state.answers[state.currentIndex];
    };

    const showResults = () => {
        const score = state.answers.reduce((count, answer, index) => (
            answer === questions[index].answer ? count + 1 : count
        ), 0);

        stage.hidden = true;
        results.hidden = false;
        scoreElement.textContent = `You scored ${score} out of ${questions.length}`;
        messageElement.textContent = score >= 4
            ? 'Excellent work! You are ready for more practice.'
            : 'Nice try. Review the answers and try again.';

        reviewElement.replaceChildren();

        questions.forEach((question, index) => {
            const item = document.createElement('li');
            item.className = state.answers[index] === question.answer ? 'correct-answer' : 'wrong-answer';
            item.textContent = `${question.prompt} Your answer: ${state.answers[index] || 'No answer'}. Correct answer: ${question.answer}.`;
            reviewElement.appendChild(item);
        });
    };

    startButton.addEventListener('click', () => {
        intro.hidden = true;
        stage.hidden = false;
        results.hidden = true;
        state.currentIndex = 0;
        state.answers = Array(questions.length).fill('');
        renderQuestion();
    });

    previousButton.addEventListener('click', () => {
        if (state.currentIndex > 0) {
            state.currentIndex -= 1;
            renderQuestion();
        }
    });

    nextButton.addEventListener('click', () => {
        if (!state.answers[state.currentIndex]) {
            return;
        }

        if (state.currentIndex === questions.length - 1) {
            showResults();
            return;
        }

        state.currentIndex += 1;
        renderQuestion();
    });

    retryButton.addEventListener('click', () => {
        results.hidden = true;
        intro.hidden = false;
    });
};