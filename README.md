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

3. Install dependencies for the client:

     ```bash
   yarn install 
   
4. Install dependencies for the server (Express server):

    ```bash
   cd backend
   yarn install 
      
5. Start the development server for the client using Expo:

    ```bash
   cd MiddleEarthMaps
   npx expo start 

6. Start the Express server (in a separate terminal):

    ```bash
   cd backend
   node app.js

7. API Endpoint: Configure the endpoint URL to your local network IP, e.g., http://192.168.1.2:3000/api/pins. Replace 192.168.1.2 with your server's IP address.


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

Happy mapping!

### Improvements

1. User location - Implement a more user-friendly experience when the user denies location access. Provide clear instructions and options for the user to enable location services.
2. Fetching data - Optimize the data fetching process to reduce loading times and improve app performance. Consider implementing data caching, pagination, or lazy loading for a smoother user experience.
3. Serach bar - Add a search bar that allows users to search for specific pins or locations within the app.
4. Pin Rendering - To improve app responsiveness, consider rendering pins in smaller chunks or batches, especially if the pin data set is large. This can prevent UI freezes and provide a smoother scrolling experience
5. Offline Mode - Enable an offline mode that allows users to access previously viewed locations and pins even without an internet connection. Implement local data storage and synchronization when the app is online.
6. Testing - include more integration tests
7. Error Handling - provide informative error messages to users in case of failures or unexpected situations
