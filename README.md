# ImageScapes Copilot: Creating Dimensional Alt Text with Human-in-the-Loop for Enhanced Image Accessibility

ImageScapes Copilot is a follow-up project to the Dimensional Alt Text research presented at CHI 2023 Late-Breaking Work. Our goal is to enhance image accessibility for screen reader users by enabling a chat-like authoring experience to create dimensional alt text that provides a better spatial understanding of the image.

ImageScapes Copilot utilizes Microsoft Azure Computer Vision API for image processing and Open AI's Chat API for natural language conversation. Additionally, Langchain is used as a bridge between the two APIs to provide an intuitive authoring experience. Crucially, our approach also incorporates a Human-in-the-loop mechanism to ensure high-quality alt text that cannot be achieved solely through AI-generated approaches.

With ImageScapes Copilot, authors can provide a more immersive and enjoyable browsing experience for screen reader users by creating dimensional alt text that describes the foreground, middle ground, and background of images.

ImageScapes Copilot is an open-source project that welcomes contributions from the community. Whether you are a developer, designer, or accessibility advocate, we encourage you to get involved and help us make the web a more inclusive place for all users.

Thank you for your interest in ImageScapes Copilot. We hope you find this project helpful and informative!

## Prerequisites

Before you begin, ensure you have the following software installed on your local machine:

- Python 3.6 or later
- Pip (Python package manager)
- Node.js
- Npm (Node.js package manager)

Additionally, you need a Microsoft Azure account with a valid subscription key and endpoint for accessing the Computer Vision API.

## Project Setup

1. Clone the repository and navigate to the project folder:
```
git clone https://github.com/your_username/my_project.git
cd my_project
```

2. Create a virtual environment and activate it:
```
python3 -m venv venv
source venv/bin/activate # For Linux/macOS
.\venv\Scripts\activate # For Windows
```

3. Install the required Python packages:
```
pip install -r requirements.txt
```

4. Install the required JavaScript packages:
```
npm install
```

## Setting up environment variables

To keep sensitive information like API keys secure, we use environment variables. Follow these steps to set up the necessary environment variable for this project:

### Unix-based systems (Linux, macOS)

1. Open a terminal window.
2. Run the following command to set the environment variable:

```bash
export AZURE_SUBSCRIPTION_KEY="<your_azure_subscription_key>"
export AZURE_RESOURCE="<your_azure_resource>"
```

Please ensure that you replace `<your_azure_subscription_key>`, `<your_azure_resource>` with your actual API key when following the instructions.


## Running the Project

1. Start the Flask server:

```
python app.py
```

2. Open your web browser and navigate to `http://localhost:5000`. You should see the web interface for uploading and analyzing images using the Google Cloud Vision API.

## API Information

This project utilizes the Microsoft Computer Vision API for image analysis. The specific version of the API in use is the 2023-02-01-preview version.

### API Documentation

For detailed information about the API, its features, and how to use it, refer to the official Microsoft Computer Vision API documentation:

- [Image Analysis API Documentation](https://learn.microsoft.com/en-us/rest/api/computervision/2023-02-01-preview/image-analysis/analyze?tabs=HTTP)

### API Testing

To test the API and explore its functionality, you can use the interactive testing console provided by Microsoft:

- [API Testing Console](https://westus.dev.cognitive.microsoft.com/docs/services/unified-vision-apis-public-preview-2023-02-01-preview/operations/61d65934cd35050c20f73ab6/console)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)



