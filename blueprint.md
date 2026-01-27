# Lotto Number Generator

This is a simple web application that generates lotto numbers. It also includes a theme switcher and a contact form.

## Features

*   **Lotto Number Generation:** Generates 6 unique numbers between 1 and 45.
*   **Theme Switcher:** Allows switching between a dark and a light theme. The preference is saved in the browser's local storage.
*   **Contact Form:** A contact form that submits to Formspree.

## Deployment

This project is configured for deployment with Firebase.

### Firebase Configuration

*   **`.firebaserc`:** Configures the Firebase project ID. **Note:** You need to replace `"YOUR-FIREBASE-PROJECT-ID"` with your actual Firebase project ID.
*   **`firebase.json`:** Configures Firebase Hosting. It's set to deploy the contents of the current directory.
*   **`database.rules.json`:** Basic security rules for Firestore, denying all read and write operations.
*   **`.idx/mcp.json`:** Configured for the Firebase multi-cloud platform.

### How to Deploy

1.  Make sure you have the Firebase CLI installed.
2.  Log in to your Firebase account using `firebase login`.
3.  Replace `"YOUR-FIREBASE-PROJECT-ID"` in `.firebaserc` with your actual Firebase project ID.
4.  Run `firebase deploy` to deploy the website.