document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE NAV DRAWER TOGGLE
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close mobile nav when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileToggle && nav) {
                mobileToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // 2. PASSWORD VISIBILITY TOGGLE
    const pwdToggles = document.querySelectorAll('.password-toggle');
    pwdToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const input = toggle.previousElementSibling;
            const icon = toggle.querySelector('i');
            
            if (input && icon) {
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            }
        });
    });

    // Helper functions for validation
    const showError = (inputEl, errorEl, message) => {
        inputEl.classList.add('invalid');
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    };

    const clearError = (inputEl, errorEl) => {
        inputEl.classList.remove('invalid');
        errorEl.style.display = 'none';
    };

    // 3. SIGNUP FORM VALIDATION & STORAGE
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Form Fields
            const nameInput = document.getElementById('fullName');
            const nameError = document.getElementById('fullNameError');
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const phoneInput = document.getElementById('phone');
            const phoneError = document.getElementById('phoneError');
            const courseSelect = document.getElementById('course');
            const courseError = document.getElementById('courseError');
            const pwdInput = document.getElementById('password');
            const pwdError = document.getElementById('passwordError');
            const confirmInput = document.getElementById('confirmPassword');
            const confirmError = document.getElementById('confirmError');
            const consentCheckbox = document.getElementById('consentCheckbox');
            const consentError = document.getElementById('consentError');

            // Name validation
            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Full name is required');
                isValid = false;
            } else if (nameInput.value.trim().length < 3) {
                showError(nameInput, nameError, 'Name must be at least 3 characters');
                isValid = false;
            } else {
                clearError(nameInput, nameError);
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Email address is required');
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }

            // Phone validation
            const phonePattern = /^[0-9]{10}$/;
            if (!phoneInput.value.trim()) {
                showError(phoneInput, phoneError, 'Mobile number is required');
                isValid = false;
            } else if (!phonePattern.test(phoneInput.value.trim().replace(/[\s-]/g, ''))) {
                showError(phoneInput, phoneError, 'Enter a valid 10-digit mobile number');
                isValid = false;
            } else {
                clearError(phoneInput, phoneError);
            }

            // Course selection validation
            if (!courseSelect.value) {
                showError(courseSelect, courseError, 'Please select a program of interest');
                isValid = false;
            } else {
                clearError(courseSelect, courseError);
            }

            // Password validation
            if (!pwdInput.value) {
                showError(pwdInput, pwdError, 'Password is required');
                isValid = false;
            } else if (pwdInput.value.length < 6) {
                showError(pwdInput, pwdError, 'Password must be at least 6 characters');
                isValid = false;
            } else {
                clearError(pwdInput, pwdError);
            }

            // Confirm Password validation
            if (!confirmInput.value) {
                showError(confirmInput, confirmError, 'Please confirm your password');
                isValid = false;
            } else if (confirmInput.value !== pwdInput.value) {
                showError(confirmInput, confirmError, 'Passwords do not match');
                isValid = false;
            } else {
                clearError(confirmInput, confirmError);
            }

            // Consent validation
            if (!consentCheckbox.checked) {
                consentError.textContent = 'You must authorize contact terms to proceed with registration.';
                consentError.style.display = 'block';
                isValid = false;
            } else {
                consentError.style.display = 'none';
            }

            if (isValid) {
                // Mock registration data storage
                const userData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim().toLowerCase(),
                    phone: phoneInput.value.trim(),
                    course: courseSelect.value,
                    password: pwdInput.value // Storing in plain text purely for mock capability
                };

                // Store in localStorage (multi-user simulator)
                localStorage.setItem(`user_${userData.email}`, JSON.stringify(userData));
                
                // Set active session
                sessionStorage.setItem('loggedInUser', JSON.stringify(userData));

                // Redirect to dashboard
                alert('Registration successful! Welcome to Bharath University.');
                window.location.href = 'dashboard.html';
            }
        });
    }

    // 4. LOGIN FORM VALIDATION & RETRIEVAL
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const emailInput = document.getElementById('loginEmail');
            const emailError = document.getElementById('loginEmailError');
            const pwdInput = document.getElementById('loginPassword');
            const pwdError = document.getElementById('loginPasswordError');
            const formSummaryError = document.getElementById('formSummaryError');

            if (formSummaryError) formSummaryError.style.display = 'none';

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Email address is required');
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput, emailError);
            }

            // Password validation
            if (!pwdInput.value) {
                showError(pwdInput, pwdError, 'Password is required');
                isValid = false;
            } else {
                clearError(pwdInput, pwdError);
            }

            if (isValid) {
                const email = emailInput.value.trim().toLowerCase();
                const password = pwdInput.value;

                // Check localStorage
                const storedUserRaw = localStorage.getItem(`user_${email}`);
                if (storedUserRaw) {
                    const storedUser = JSON.parse(storedUserRaw);
                    if (storedUser.password === password) {
                        // Success matching credentials
                        sessionStorage.setItem('loggedInUser', JSON.stringify(storedUser));
                        window.location.href = 'dashboard.html';
                        return;
                    }
                }

                // If not found in localStorage, simulate a default admin/test user
                if (email === 'student@bharathuniv.edu' && password === 'student123') {
                    const defaultUser = {
                        name: 'Rohan Sharma',
                        email: 'student@bharathuniv.edu',
                        phone: '9876543210',
                        course: 'B.Tech Computer Science Engineering'
                    };
                    sessionStorage.setItem('loggedInUser', JSON.stringify(defaultUser));
                    window.location.href = 'dashboard.html';
                    return;
                }

                // Show authentication error
                if (formSummaryError) {
                    formSummaryError.textContent = 'Invalid email or password. Please try again or create an account.';
                    formSummaryError.style.display = 'block';
                }
            }
        });
    }

    // 5. DASHBOARD CONTROL FLOW
    const dashboardContainer = document.getElementById('dashboardContainer');
    if (dashboardContainer) {
        const loggedInUserRaw = sessionStorage.getItem('loggedInUser');
        if (!loggedInUserRaw) {
            // Unauthenticated user - send to login
            window.location.href = 'login.html';
            return;
        }

        const user = JSON.parse(loggedInUserRaw);

        // Populate dashboard profile elements
        const nameElements = document.querySelectorAll('.js-user-name');
        const emailElements = document.querySelectorAll('.js-user-email');
        const phoneElements = document.querySelectorAll('.js-user-phone');
        const courseElements = document.querySelectorAll('.js-user-course');
        const avatarElement = document.querySelector('.profile-avatar');

        nameElements.forEach(el => el.textContent = user.name);
        emailElements.forEach(el => el.textContent = user.email);
        if (phoneElements) phoneElements.forEach(el => el.textContent = user.phone || 'N/A');
        if (courseElements) courseElements.forEach(el => el.textContent = user.course || 'N/A');

        // Set avatar letter
        if (avatarElement && user.name) {
            avatarElement.textContent = user.name.charAt(0).toUpperCase();
        }

        // Logout action
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('loggedInUser');
                window.location.href = 'login.html';
            });
        }

        // File Uploader interactive indicator
        const fileUpload = document.getElementById('fileUpload');
        const uploadStatus = document.getElementById('uploadStatus');
        if (fileUpload && uploadStatus) {
            fileUpload.addEventListener('change', () => {
                if (fileUpload.files.length > 0) {
                    uploadStatus.textContent = `File "${fileUpload.files[0].name}" successfully staged for upload!`;
                    uploadStatus.style.color = '#2F855A';
                }
            });
        }
    }

    // 6. CHAT HELPDESK WIDGET INTERACTION
    const chatTrigger = document.querySelector('.chat-trigger');
    const chatClose = document.querySelector('.chat-close');
    const chatWindow = document.querySelector('.chat-window');
    const chatTooltip = document.querySelector('.chat-tooltip');
    const chatBadge = document.querySelector('.chat-badge');
    const chatInput = document.querySelector('.chat-input');
    const chatSend = document.querySelector('.chat-send');
    const chatBody = document.querySelector('.chat-body');

    if (chatTrigger && chatWindow) {
        chatTrigger.addEventListener('click', () => {
            chatWindow.classList.add('active');
            if (chatTooltip) chatTooltip.style.display = 'none';
            if (chatBadge) chatBadge.style.display = 'none';
            setTimeout(() => {
                chatInput.focus();
            }, 300);
        });
    }

    if (chatClose && chatWindow) {
        chatClose.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent trigger toggle
            chatWindow.classList.remove('active');
        });
    }

    const appendChatMessage = (text, sender) => {
        if (!chatBody) return;
        const msgEl = document.createElement('div');
        msgEl.className = `chat-msg ${sender}`;
        msgEl.textContent = text;
        chatBody.appendChild(msgEl);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleBotResponse = (userText) => {
        const text = userText.toLowerCase();
        let reply = "I'm not sure about that. Please ask about 'admission', 'courses', 'fees', or 'VVISM contact details', or contact our counselor directly!";
        
        if (text.includes('admission') || text.includes('apply') || text.includes('register')) {
            reply = "To apply for admissions 2026-27, please go to the Signup page by clicking 'Apply Now' in the header. Filling out the form takes just 2 minutes!";
        } else if (text.includes('course') || text.includes('program') || text.includes('degree') || text.includes('b.tech') || text.includes('mbbs') || text.includes('mba')) {
            reply = "We offer B.Tech (CSE, ECE), MBBS, BDS, MBA, BBA, and Integrated BA LLB. Check out the 'Programs' section on the homepage for details!";
        } else if (text.includes('fee') || text.includes('cost') || text.includes('payment')) {
            reply = "Application fee is non-refundable. You can calculate and stage course fees from the pay fees tab inside your logged-in student dashboard.";
        } else if (text.includes('vvism') || text.includes('contact') || text.includes('consent') || text.includes('dnc') || text.includes('phone')) {
            reply = "By submitting, you agree to allow Vishwa Vishwani Institute of Systems & Management (VVISM) and partners to contact you via SMS, Email, WhatsApp, RCS, or Call, overriding DNC registry status.";
        } else if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            reply = "Hello! Welcome to Bharath University Helpdesk. How can I assist you with your admissions inquiry today?";
        }
        
        setTimeout(() => {
            appendChatMessage(reply, 'bot');
        }, 800);
    };

    const submitUserMsg = () => {
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;
        
        appendChatMessage(text, 'user');
        chatInput.value = '';
        
        handleBotResponse(text);
    };

    if (chatSend && chatInput) {
        chatSend.addEventListener('click', submitUserMsg);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitUserMsg();
            }
        });
    }
});

