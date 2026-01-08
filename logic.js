/**
 * Logic to identify the project creator and verify ownership.
 */

async function init() {
    const avatarEl = document.getElementById('creator-avatar');
    const usernameEl = document.getElementById('creator-username');
    const idEl = document.getElementById('creator-id');
    const badgeEl = document.getElementById('verification-badge');
    const cardEl = document.getElementById('creator-card');
    const codeDisplay = document.getElementById('code-display');

    // The logic snippet we want to display to the user
    const logicSnippet = `// 1. Get the project creator info
const projectOwner = await window.websim.getCreator();
console.log("Creator:", projectOwner.username);

// 2. Get the current logged-in user info
const currentUser = await window.websim.getCurrentUser();

// 3. Compare IDs to verify ownership
const isOwner = projectOwner.id === currentUser.id;

if (isOwner) {
    console.log("You are the creator of this page!");
} else {
    console.log("You are a visitor.");
}`;

    // Display the code snippet
    codeDisplay.textContent = logicSnippet;
    
    // Trigger Prism highlight if loaded
    if (window.Prism) {
        window.Prism.highlightElement(codeDisplay);
    }

    try {
        // --- ACTUAL IMPLEMENTATION ---

        // 1. Get Creator Info
        const creator = await window.websim.getCreator();
        
        // 2. Get Current User Info
        const currentUser = await window.websim.getCurrentUser();

        // 3. Update UI with Creator Data
        avatarEl.src = creator.avatar_url;
        avatarEl.classList.remove('skeleton');
        
        usernameEl.textContent = creator.username;
        usernameEl.classList.remove('skeleton-text');
        
        idEl.textContent = `ID: ${creator.id}`;
        idEl.classList.remove('skeleton-text');

        cardEl.classList.remove('loading');

        // 4. Verify Ownership
        const isOwner = creator.id === currentUser.id;

        badgeEl.classList.remove('hidden');
        if (isOwner) {
            badgeEl.textContent = "You are the Creator";
            badgeEl.classList.add('owner');
        } else {
            badgeEl.textContent = "You are a Visitor";
            badgeEl.classList.add('visitor');
        }

    } catch (error) {
        console.error("Error fetching websim data:", error);
        usernameEl.textContent = "Error loading data";
        idEl.textContent = "Check console for details";
        usernameEl.classList.remove('skeleton-text');
        idEl.classList.remove('skeleton-text');
        avatarEl.classList.remove('skeleton');
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);