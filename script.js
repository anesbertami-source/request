// ====================================
// LOVE PROPOSAL WEBSITE - JAVASCRIPT 💕
// Made with love and passion
// ====================================

// DOM Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const myNameInput = document.getElementById('myName');
const herNameInput = document.getElementById('herName');
const initialSection = document.getElementById('initialSection');
const successSection = document.getElementById('successSection');
const coupleNames = document.getElementById('coupleNames');
const cuteMessage = document.getElementById('cuteMessage');
const successDetails = document.getElementById('successDetails');
const restartBtn = document.getElementById('restartBtn');
const heartsBackground = document.getElementById('heartsBackground');

// Data
const cuteMessages = [
    "I can't wait to see you smile in person!<br/>You make my heart skip a beat. 💖<br/>This is going to be amazing!",
    "You're my favorite person, and I can't wait to spend time with you.<br/>Let's make some beautiful memories together! 💕",
    "My heart knew you were special the moment I met you.<br/>I'm so excited for our date! 🌹",
    "You make every day brighter just by being you.<br/>I can't wait to see that beautiful smile! 💋",
    "I'm falling for you more and more each day.<br/>Let's make this date unforgettable! ✨",
    "You're not just my crush, you're my dream come true.<br/>I'm so lucky to have you! 😘",
    "Every moment with you is a treasure. I can't wait for our date! 💝",
    "You're the reason my heart beats faster.<br/>Let's create beautiful memories together! 💫"
];

const funnyNoMessages = [
    "You sure? 😊",
    "Come on... 🥺",
    "Pretty please? 💕",
    "You're breaking my heart! 💔",
    "Last chance! 😭"
];

// State
let clickCount = 0;

// ====================================
// EVENT LISTENERS
// ====================================

// Yes Button Click
yesBtn.addEventListener('click', handleYes);

// No Button Hover - Changes Position
noBtn.addEventListener('mouseover', function() {
    const pos = getRandomPosition();
    noBtn.style.position = 'fixed';
    noBtn.style.left = pos.x + 'px';
    noBtn.style.top = pos.y + 'px';
});

// No Button Click - Funny Messages
noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    clickCount++;
    
    if (clickCount < 5) {
        const pos = getRandomPosition();
        noBtn.style.position = 'fixed';
        noBtn.style.left = pos.x + 'px';
        noBtn.style.top = pos.y + 'px';
        noBtn.textContent = funnyNoMessages[clickCount - 1];
    } else {
        // After 5 clicks, surrender
        noBtn.textContent = "YES!!!";
        setTimeout(() => {
            handleYes();
        }, 500);
    }
});

// Restart Button
restartBtn.addEventListener('click', resetPage);

// Focus on first input on load
window.addEventListener('load', () => {
    myNameInput.focus();
});

// ====================================
// CORE FUNCTIONS
// ====================================

/**
 * Get random position for the No button
 * Ensures button stays within viewport
 */
function getRandomPosition() {
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 200);
    return { x, y };
}

/**
 * Handle Yes button click - Main logic
 */
function handleYes() {
    const myName = myNameInput.value.trim() || 'Someone Special';
    const herName = herNameInput.value.trim() || 'Angel';

    // Validation
    if (myNameInput.value.trim() === '' || herNameInput.value.trim() === '') {
        alert('Please enter both names before proceeding! 💕');
        return;
    }

    // Hide initial section, show success
    initialSection.classList.add('hidden');
    successSection.classList.add('show');

    // Update names and message
    coupleNames.textContent = `${myName} & ${herName} 💕`;
    const selectedMessage = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
    cuteMessage.innerHTML = selectedMessage;

    // Send to backend
    saveProposal(myName, herName);

    // Create animations
    createHearts();
    createEmojiRain();
}

/**
 * Save proposal to backend
 */
function saveProposal(name1, name2) {
    fetch('/api/proposal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            person1: name1,
            person2: name2,
            timestamp: new Date().toISOString()
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Display success details from backend
            successDetails.innerHTML = `
                <p>💕 Love Story #${data.proposalId} 💕</p>
                <p class="timestamp">Proposed on: ${new Date(data.timestamp).toLocaleString()}</p>
            `;
        }
    })
    .catch(error => {
        console.error('Error saving proposal:', error);
        // Still show success UI even if backend fails
        successDetails.innerHTML = `
            <p>✨ Your love story has been recorded ✨</p>
            <p class="timestamp">Proposed on: ${new Date().toLocaleString()}</p>
        `;
    });
}

/**
 * Create floating hearts animation
 */
function createHearts() {
    heartsBackground.classList.add('show');
    const heartEmojis = ['💕', '❤️', '💖', '💗', '💓', '💞'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heartsBackground.appendChild(heart);
        }, i * 100);
    }
}

/**
 * Create emoji rain animation
 */
function createEmojiRain() {
    const emojis = ['💕', '❤️', '💖', '💗', '💓', '💞', '✨', '🌹', '💑', '💞'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.classList.add('emoji-rain');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * window.innerWidth + 'px';
            emoji.style.top = '-50px';
            emoji.style.animationDuration = (2 + Math.random() * 2) + 's';
            document.body.appendChild(emoji);

            setTimeout(() => emoji.remove(), 4000);
        }, i * 100);
    }
}

/**
 * Reset page to initial state
 */
function resetPage() {
    clickCount = 0;
    myNameInput.value = '';
    herNameInput.value = '';
    noBtn.textContent = 'NO';
    noBtn.style.position = 'absolute';
    noBtn.style.left = '50%';
    noBtn.style.top = '0';
    noBtn.style.transform = 'translateX(-50%)';
    initialSection.classList.remove('hidden');
    successSection.classList.remove('show');
    heartsBackground.classList.remove('show');
    successDetails.innerHTML = '';
    heartsBackground.innerHTML = '';
    myNameInput.focus();
}
