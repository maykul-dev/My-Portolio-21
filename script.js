/* script.js 
   Author: Michael Jebulan
*/

// ==========================================
// 1. ON LOAD EVENTS (Greeting & Animation)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    
    // --- Dynamic Greeting ---
    const headerElement = document.querySelector("header p");
    if (headerElement) { // Safety check
        const currentHour = new Date().getHours();
        let greeting = currentHour < 12 ? "Good Morning!" : currentHour < 18 ? "Good Afternoon!" : "Good Evening!";
        headerElement.innerText = greeting + " " + headerElement.innerText;
    }

    // --- Hacker Name Animation ---
    const myName = "Hi, I'm Michael Jebulan"; // Removed "Hi, I'm" to make it look cleaner!
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const nameElement = document.getElementById("typed-name");

    if (nameElement) {
        let iterations = 0;
        const interval = setInterval(() => {
            nameElement.innerText = myName.split("").map((letter, index) => {
                if (index < iterations) return myName[index];
                return letters[Math.floor(Math.random() * letters.length)];
            }).join("");
            
            if (iterations >= myName.length) clearInterval(interval);
            iterations += 1 / 3; 
        }, 30);
    } else {
        console.error("Error: Could not find <span id='typed-name'></span> in the HTML!");
    }
});

// ==========================================
// 2. THEME TOGGLE (Dark/Light Mode)
// ==========================================
const toggleButton = document.getElementById('theme-toggle');
if (toggleButton) {
    const body = document.body;
    
    // Check saved preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        toggleButton.innerText = "🌙 Dark Mode";
    }

    // Toggle on click
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        let theme = body.classList.contains('light-mode') ? 'light' : 'dark';
        toggleButton.innerText = theme === 'light' ? "🌙 Dark Mode" : "☀️ Light Mode";
        localStorage.setItem('theme', theme);
    });
}

// ==========================================
// 3. NAVIGATION & FILTERING
// ==========================================
// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Project Filter
function filterProjects(category) {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        if (category === 'all' || project.getAttribute('data-category') === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// ==========================================
// 4. GITHUB STATS FETCH
// ==========================================
async function getGithubStats() {
    const username = "maykul-dev"; 
    try {
        // FIXED URL
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        
        const repoCountElement = document.getElementById('repo-count');
        if(repoCountElement && data.public_repos !== undefined) {
            repoCountElement.innerText = data.public_repos;
        }
    } catch (error) {
        console.error("Error fetching GitHub stats", error);
    }
}
getGithubStats(); // Call the function

// ==========================================
// 5. MODAL (PDF Viewer) LOGIC
// ==========================================
function openPdfModal(pdfUrl) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('modalPdfViewer');
    const downloadLink = document.getElementById('fallbackLink');

    if (modal && viewer && downloadLink) {
        viewer.src = pdfUrl;
        downloadLink.href = pdfUrl;
        modal.style.display = 'flex'; 
    }
}

function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('modalPdfViewer');
    if (modal) modal.style.display = 'none';
    if (viewer) viewer.src = '';
}

window.onclick = function(event) {
    const modal = document.getElementById('pdfModal');
    if (event.target == modal) {
        closePdfModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closePdfModal();
    }
});

// ==========================================
// 6. SECURITY (Disable Right-Click & F12)
// ==========================================
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.onkeydown = function(e) {
    // FIXED 'event' to 'e'
    if (
        e.keyCode == 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode == 73) || // Ctrl+Shift+I (73 is 'I')
        (e.ctrlKey && e.shiftKey && e.keyCode == 67) || // Ctrl+Shift+C (67 is 'C')
        (e.ctrlKey && e.shiftKey && e.keyCode == 74) || // Ctrl+Shift+J (74 is 'J')
        (e.ctrlKey && e.keyCode == 85) // Ctrl+U (85 is 'U')
    ) {
        return false;
    }
}