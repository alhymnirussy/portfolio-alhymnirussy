document.addEventListener('DOMContentLoaded', function() {

    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#') && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });
        });
    }

    const typingEffectElement = document.getElementById('typing-effect');
    if (typingEffectElement) {
        const titles = ["Mobile Developer", "Flutter Enthusiast", "Frontend Developer"];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 150;
        const deletingSpeed = 75;
        const delayBetweenWords = 2000;

        function type() {
            const currentTitle = titles[titleIndex];
            let displayText = '';

            if (isDeleting) {
                displayText = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            typingEffectElement.textContent = displayText;

            let speed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentTitle.length) {
                speed = delayBetweenWords;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                speed = 500;
            }

            setTimeout(type, speed);
        }

        if (titles.length > 0) {
             setTimeout(type, 1000);
        }
    }

    const toggleButtons = document.querySelectorAll('.btn-toggle-details');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contentWrapper = this.closest('.timeline-content');
            const extraInfo = contentWrapper.querySelector('.timeline-extra-info');

            if (extraInfo) {
                const isVisible = extraInfo.style.display === 'block';

                if (isVisible) {
                    extraInfo.style.display = 'none';
                    this.textContent = 'More';
                } else {
                    extraInfo.style.display = 'block';
                    this.textContent = 'Hide';
                }
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm && formStatus && submitButton) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            formStatus.className = 'form-status-message';
            formStatus.textContent = 'Sending...';
            formStatus.style.display = 'block';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';

            const formData = new FormData(contactForm);
            const formAction = contactForm.getAttribute('action');

            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                formStatus.style.display = 'block';
                if (response.ok) {
                    formStatus.textContent = 'Thank you! Your message has been sent.';
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (data.errors && data.errors.length > 0) {
                            formStatus.textContent = 'Oops! ' + data.errors.map(error => error.message).join(', ');
                        } else {
                            formStatus.textContent = 'Oops! There was a problem submitting your form. Please try again.';
                        }
                        formStatus.classList.add('error');
                    }).catch(() => {
                         formStatus.textContent = 'Oops! There was a problem submitting your form. Status: ' + response.status;
                         formStatus.classList.add('error');
                    });
                }
            })
            .catch(error => {
                formStatus.style.display = 'block';
                console.error('Form submission error:', error);
                formStatus.textContent = 'Oops! There was a network error. Please try again later.';
                formStatus.classList.add('error');
            })
            .finally(() => {
                 submitButton.disabled = false;
                 submitButton.style.opacity = '1';
                 setTimeout(() => {
                     formStatus.textContent = '';
                     formStatus.className = 'form-status-message';
                     formStatus.style.display = 'none';
                 }, 6000);
            });
        });
    }

});