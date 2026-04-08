/* script.js 
   Author: Michael Jebulan
*/

// ==========================================
// 1. ON LOAD EVENTS & THEME TOGGLE
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    
    // --- Dynamic Greeting ---
    const headerElement = document.querySelector("header p");
    if (headerElement) { 
        const currentHour = new Date().getHours();
        let greeting = currentHour < 12 ? "Good Morning!" : currentHour < 18 ? "Good Afternoon!" : "Good Evening!";
        headerElement.innerText = greeting + " " + headerElement.innerText;
    }

    // --- Hacker Name Animation ---
    const myName = "Michael Jebulan"; 
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
    }

    // --- THEME TOGGLE LOGIC (Restored!) ---
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    if (toggleButton) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            toggleButton.innerText = "🌙 Dark Mode";
        }

        toggleButton.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                toggleButton.innerText = "🌙 Dark Mode";
                localStorage.setItem('theme', 'light');
            } else {
                toggleButton.innerText = "☀️ Light Mode";
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- SAY HELLO BUTTON FIX ---
    const helloButton = document.getElementById("hello-btn");
    if (helloButton) {
        helloButton.addEventListener("click", function() {
            alert("Hello Michael! Welcome to my portfolio.");
        });
    }
});

// ==========================================
// 2. NAVIGATION & FILTERING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

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
// 3. GITHUB STATS FETCH
// ==========================================
async function getGithubStats() {
    const username = "maykul-dev"; 
    try {
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
getGithubStats(); 

// ==========================================
// 4. MODAL (PDF Viewer) LOGIC
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

