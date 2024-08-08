# StarNavi Heroes

StarNavi Heroes is a React application that displays a list of characters and their details from the Star Wars universe. The application uses React Router for navigation and React Query for data fetching.

## Table of Contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Demo

Experience the live demo of our application [here](https://starwars-list.vercel.app/#/home)

## Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/your-username/starnavi-heroes.git
  cd starnavi-heroes
  ```

2. Install the dependencies:
  ```sh
  npm install
  ```

3. Start the development server:
  ```sh
  npm start
  ```

## Troubleshooting on macOS

If you encounter any issues on macOS, you may need to install some additional dependencies. You can do this using Homebrew:
  ```sh
  brew install pkg-config cairo pango libpng jpeg giflib librsvg
  ```

## Usage

To use the StarNavi Heroes application, follow these steps:

1. Open your web browser and navigate to the URL where the application is hosted.

2. Browse the list of characters from the Star Wars universe.

3. Click on a character to view their details.

## Features

- Display a list of characters from the Star Wars universe.
- View detailed information about each character.
- Navigate between different pages using React Router.

## Project Structure

The project structure is as follows:

```
starnavi-heroes/
  ├── src/
  │   ├── tests/
  │   ├── components/
  │   │   ├── pagination.js
  │   │   └── ...
  │   ├── features/
  │   │   ├── character-list.js
  │   │   ├── character-details.js
  │   │   └── ...
  │   ├── services/
  │   │   ├── api.js
  │   │   └── ...
  │   ├── App.js
  │   ├── index.js
  │   └── ...
  ├── .gitignore
  ├── package.json
  ├── README.md
  └── ...
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.
