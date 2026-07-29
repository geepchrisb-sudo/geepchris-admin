// js/auth.js
// Handles login, logout, and auth state management

const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');
const loginBtn = document.getElementById('loginBtn');

// Login function
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Clear previous error
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
    
    // Disable button during login
    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        // Redirect to dashboard on success
        window.location.href = 'admin-dashboard.html';
    } catch (error) {
        // Show error message
        errorMsg.textContent = error.message;
        errorMsg.style.display = 'block';
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign In';
    }
});

// Check if user is already logged in (prevent showing login page if already authenticated)
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await checkAuthState();
        if (user) {
            // User is already logged in, redirect to dashboard
            window.location.href = 'admin-dashboard.html';
        }
    } catch (error) {
        // User is not logged in, stay on login page
        console.log('User not logged in');
    }
});

// Logout function (to be used on dashboard pages)
export function logout() {
    auth.signOut()
        .then(() => {
            window.location.href = 'admin-login.html';
        })
        .catch((error) => {
            console.error('Logout error:', error);
        });
}