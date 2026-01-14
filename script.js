document.addEventListener('DOMContentLoaded', () => {
    // Game state
    const gameState = {
        currentLevel: 1,
        totalLevels: 100,
        selectedDoor: null,
        correctDoor: Math.floor(Math.random() * 3) + 1,
        gameCompleted: false
    };

    // DOM Elements
    const doors = document.querySelectorAll('.door');
    const resetBtn = document.getElementById('reset-btn');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const progressBar = document.querySelector('.rounded-full.h-2\\.5 div');

    // Initialize game
    function initGame() {
        updateProgress();
        setupEventListeners();
    }

    // Update progress bar
    function updateProgress() {
        const progress = (gameState.currentLevel / gameState.totalLevels) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Set up event listeners
    function setupEventListeners() {
        doors.forEach(door => {
            door.addEventListener('click', () => handleDoorClick(door));
        });

        resetBtn.addEventListener('click', resetGame);
        nextLevelBtn.addEventListener('click', goToNextLevel);
    }

    // Handle door click
    function handleDoorClick(door) {
        if (gameState.gameCompleted) return;

        const doorNumber = parseInt(door.dataset.door);
        gameState.selectedDoor = doorNumber;

        // Remove previous selections
        doors.forEach(d => d.classList.remove('selected'));

        // Mark selected door
        door.classList.add('selected');

        // Check answer
        if (doorNumber === gameState.correctDoor) {
            handleCorrectAnswer(door);
        } else {
            handleIncorrectAnswer(door);
        }
    }

    // Handle correct answer
    function handleCorrectAnswer(door) {
        door.classList.add('correct');
        door.querySelector('i').setAttribute('data-feather', 'check-circle');
        feather.replace();

        // Show confetti effect
        createConfetti();

        // Show next level button
        nextLevelBtn.classList.remove('hidden');
        gameState.gameCompleted = true;

        // Update hint
        document.querySelector('.bg-blue-900\\/50 p').textContent = "Correct! You found the treasure!";
    }

    // Handle incorrect answer
    function handleIncorrectAnswer(door) {
        door.classList.add('incorrect');
        door.querySelector('i').setAttribute('data-feather', 'x-circle');
        feather.replace();

        // Show correct door
        const correctDoorElement = document.querySelector(`[data-door="${gameState.correctDoor}"]`);
        correctDoorElement.classList.add('correct');
        correctDoorElement.querySelector('i').setAttribute('data-feather', 'check-circle');
        feather.replace();

        // Update hint
        document.querySelector('.bg-blue-900\\/50 p').textContent = `Wrong! The treasure was behind Door ${gameState.correctDoor}`;
    }

    // Create confetti effect
    function createConfetti() {
        const colors = ['#EF4444', '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'];
        const container = document.body;

        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            
            container.appendChild(confetti);

            // Remove confetti after animation completes
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Reset game
    function resetGame() {
        gameState.selectedDoor = null;
        gameState.correctDoor = Math.floor(Math.random() * 3) + 1;
        gameState.gameCompleted = false;

        doors.forEach(door => {
            door.classList.remove('selected', 'correct', 'incorrect');
            door.querySelector('i').setAttribute('data-feather', 'lock');
        });

        feather.replace();
        nextLevelBtn.classList.add('hidden');

        // Reset hint
        document.querySelector('.bg-blue-900\\/50 p').textContent = "Hint: The treasure is behind the door with the highest number.";
    }

    // Go to next level
    function goToNextLevel() {
        alert("Congratulations! You've completed Level 1. In a full game, you would now proceed to Level 2.");
        // In a real implementation, this would navigate to the next level page
        // window.location.href = 'level2.html';
    }

    // Initialize the game
    initGame();
});
