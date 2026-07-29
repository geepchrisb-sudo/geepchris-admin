// js/auth-check.js
// This file handles authentication checks for all admin pages

import { auth } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js';

// Function to check if user is authenticated
// If not, redirect to login page
export function requireAuth() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in
                resolve(user);
            } else {
                // User is NOT logged in - redirect to login page
                window.location.href = 'admin-login.html';
                reject(new Error('User not authenticated'));
            }
        });
    });
}

// Function to check auth state without redirect (for login page)
export function checkAuthState() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });
}