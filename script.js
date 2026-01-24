/* script.js 
  Author: Michael Jebulan
*/

// 1. The function connected to your "Click Me" button
function sayHello() {
    let name = prompt("What is your name?");
    if (name) {
        alert("Welcome to my portfolio, " + name + "! Thanks for visiting.");
    } else {
        alert("Hello! Thanks for visiting my portfolio.");
    }
}

// 2. Dynamic Greeting (Runs automatically when page loads)
// This shows you know how to work with Dates and conditions
document.addEventListener("DOMContentLoaded", function() {
    const headerElement = document.querySelector("header p");
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning!";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

    // Appends the greeting to your existing header text
    // Original: "Senior BSIT Student..." -> New: "Good Morning! Senior BSIT Student..."
    headerElement.innerText = greeting + " " + headerElement.innerText;
});

// 3. Smooth Scrolling for Navigation Links (Optional but professional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
/* Updated Theme Logic with "Memory" */
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// 1. Check if user has a saved preference on load
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    toggleButton.innerText = "🌙 Dark Mode";
}

// 2. Toggle and Save
toggleButton.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    let theme = 'dark'; // Default
    if (body.classList.contains('light-mode')) {
        theme = 'light';
        toggleButton.innerText = "🌙 Dark Mode";
    } else {
        toggleButton.innerText = "☀️ Light Mode";
    }
    
    // Save to LocalStorage
    localStorage.setItem('theme', theme);
});
function filterProjects(category) {
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        // If category is 'all' OR matches the data-category, show it.
        if (category === 'all' || project.getAttribute('data-category') === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none'; // Hide it
        }
    });
}
// Fetch GitHub Data
async function getGithubStats() {
    const username = "maykul-dev"; // Your actual GitHub username
    try {
        const response = await fetch(`https://api.github.com/maykuldev/${maykul-dev}`);
        const data = await response.json();
        
        // Find the element where you want to show this
        // Make sure you add <span id="repo-count">0</span> somewhere in your HTML
        const repoCountElement = document.getElementById('repo-count');
        if(repoCountElement) {
            repoCountElement.innerText = data.public_repos;
        }
    } catch (error) {
        console.log("Error fetching GitHub stats", error);
    }
}

// Call the function
getGithubStats();
/* Disable Right-Click */
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

/* Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+U) */
document.onkeydown = function(e) {
    if (
        event.keyCode == 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) || // Ctrl+Shift+C
        (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) // Ctrl+U
    ) {
        return false;
    }
}
