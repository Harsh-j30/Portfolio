// script.js
console.log("Portfolio JavaScript is connected!");

document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth scrolling for navigation links ---
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove the '#'
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Skills Progress Bar Animation ---
    const progressBars = document.querySelectorAll('.progress-bar .progress');

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const progressValue = bar.dataset.progress; // Get the data-progress attribute
            bar.style.width = progressValue + '%';
        });
    }

    // Trigger skills animation when the skills section comes into view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the section is visible
        });
        observer.observe(skillsSection);
    } else {
        // Fallback for immediate animation if skills section isn't explicitly defined with ID 'skills'
        animateProgressBars();
    }


    // --- Dark/Light Mode Toggle ---
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    document.body.appendChild(themeToggle); // Append to body, likely near the top for fixed positioning

    // Check saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        // If no theme saved or it's 'light', ensure the light mode icon is shown
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for dark mode
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for light mode
            localStorage.setItem('theme', 'light');
        }
    });

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon when dark mode is enabled
    }

    // --- Auto-typing Effect for Hero Section ---
    const autoTypeTextElement = document.getElementById('auto-type-text');
    if (autoTypeTextElement) { // Ensure the element exists
        const phrases = ["Web Developer.", "Full-Stack Developer.", "Problem Solver.", "DevOps Inspire."];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseBeforeDelete = 1500;
        const pauseBeforeNext = 1000;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                // Deleting text
                autoTypeTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(typeEffect, pauseBeforeNext);
                } else {
                    setTimeout(typeEffect, deletingSpeed);
                }
            } else {
                // Typing text
                autoTypeTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, pauseBeforeDelete);
                } else {
                    setTimeout(typeEffect, typingSpeed);
                }
            }
        }
        typeEffect(); // Start the typing effect
    }


    // --- Project Read More functionality ---
    const readMoreProjectBtns = document.querySelectorAll('.project-card .read-toggle');

    readMoreProjectBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            // Find the closest ancestor that is a paragraph with class 'read-more'
            const parentParagraph = button.closest('p.read-more');
            if (parentParagraph) {
                parentParagraph.classList.toggle('expanded');
                if (parentParagraph.classList.contains('expanded')) {
                    button.textContent = 'Read less';
                } else {
                    button.textContent = 'Read more';
                }
            }
        });
    });

    // --- Certificate Read More functionality ---
    const readMoreCertificateLinks = document.querySelectorAll('.read-more-certificate-link');

    readMoreCertificateLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const parentParagraph = link.closest('.certificate-description');
            if (parentParagraph) {
                parentParagraph.classList.toggle('expanded');
                if (parentParagraph.classList.contains('expanded')) {
                    link.textContent = 'Read Less';
                } else {
                    link.textContent = 'Read More';
                }
            }
        });
    });
});