// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click sound effects to cards
    const cards = document.querySelectorAll('.letter-card, .number-card, .color-card, .shape-card, .animal-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Simple animation effect
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            // If we're on the animals page, play the animal sound
            if (this.classList.contains('animal-card')) {
                const animalName = this.querySelector('.animal-name').textContent;
                const animalSound = this.querySelector('.animal-sound').textContent;
                
                // Text-to-speech for animal sounds
                speakText(`${animalName} says ${animalSound}`);
            }
            
            // If we're on the alphabet page, speak the letter and example
            if (this.classList.contains('letter-card')) {
                const letter = this.querySelector('.letter').textContent;
                const example = this.querySelector('.example').textContent;
                
                speakText(`${letter} for ${example}`);
            }
            
            // If we're on the numbers page, speak the number
            if (this.classList.contains('number-card')) {
                const number = this.querySelector('.number').textContent;
                const numberWord = this.querySelector('.number-word').textContent;
                
                speakText(`${number}, ${numberWord}`);
            }
            
            // If we're on the colors page, speak the color name
            if (this.classList.contains('color-card')) {
                const colorName = this.querySelector('.color-name').textContent;
                
                speakText(`${colorName}`);
            }
            
            // If we're on the shapes page, speak the shape name
            if (this.classList.contains('shape-card')) {
                const shapeName = this.querySelector('.shape-name').textContent;
                
                speakText(`This is a ${shapeName}`);
            }
        });
    });
    
    // Text-to-speech function using the Web Speech API
    function speakText(text) {
        // Check if the browser supports speech synthesis
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance();
            speech.text = text;
            speech.volume = 1;
            speech.rate = 0.9;
            speech.pitch = 1;
            
            // Use a child-friendly voice if available
            const voices = window.speechSynthesis.getVoices();
            for (let i = 0; i < voices.length; i++) {
                if (voices[i].name.includes('female') || voices[i].name.includes('kid')) {
                    speech.voice = voices[i];
                    break;
                }
            }
            
            window.speechSynthesis.speak(speech);
        }
    }
    
    // Add hover effects to navigation menu
    const navItems = document.querySelectorAll('nav ul li a');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});