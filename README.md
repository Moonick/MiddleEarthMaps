# MiddleEarthMaps

## Description

The MiddleEarthMaps is a mobile app developed using React Native. It features a single screen with a Google Maps interface displaying pins representing different locations. Location data is fetched from an API, and users can tap on pins to view detailed information, including location title, latitude, longitude, connector types, and statuses. Pins are dynamically rendered based on the map's visible boundaries.

## Getting Started

### Prerequisites

Before you can run the app, make sure you have the following installed:

- [Node.js](https://nodejs.org/): Download and install the latest LTS version.
- [Yarn](https://classic.yarnpkg.com/) package manager.
- [Expo CLI](https://docs.expo.dev/get-started/installation/): Install Expo CLI globally if your app is based on Expo.

### Installation

Follow these steps to set up and run the app locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Moonick/MiddleEarthMaps.git

2. Navigate to the project directory:

   ```bash
   cd MiddleEarthMaps

3. Create an .env file with the keys from .env.example and add the IP of your local network and an availbale port for the backend service.

4. Install dependencies for the client:

     ```bash
   yarn install 
   
5. Install dependencies for the server (Express server):

    ```bash
   cd backend
   yarn install 

6. Start the development server for the client using Expo:

    ```bash
   cd MiddleEarthMaps
   npx expo start 

7. Start the Express server (in a separate terminal):

    ```bash
   cd backend
   node app.js

### Running on a Physical Device

To run the Middle Earth Maps React Native app on a physical device, follow these steps:

1. **Install Expo Go App:**

   - On your physical device, go to the App Store (iOS) or Google Play Store (Android).
   - Search for "Expo Go" and install the Expo Go app.


3. **Configure Your Development Environment:**

   - Ensure you have Node.js and npm (Node Package Manager) installed on your computer. You can download them from [Node.js official website](https://nodejs.org/).

   - Install the Expo CLI globally if you haven't already:

     ```bash
     npm install -g expo-cli
     ```

5. **Scan the QR Code:**

   - Open the camera app on your physical device.
   - Point the camera at the QR code displayed in your browser.

