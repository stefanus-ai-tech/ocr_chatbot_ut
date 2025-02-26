# OCR Chatbot Universitas Terbuka

This project is a web application built with Vite, React, Shadcn UI, and TypeScript, providing a chatbot interface for interacting with Universitas Terbuka information. It uses Netlify functions and the Groq API for the backend.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

## Features

- Chat interface for interacting with Universitas Terbuka information.
- Uses the Groq API with the `llama-3.3-70b-versatile` model for generating responses.
- System prompt designed to provide accurate and relevant information about Universitas Terbuka.
- Handles off-topic requests gracefully.
- Responsive design using Shadcn UI components.
- Markdown support for rich text formatting in responses.
- Expandable/collapsible chat window.

## Project Structure

```
.
├── .gitignore
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── netlify.toml          # Netlify configuration file
├── package-lock.json
├── package.json          # Project dependencies and scripts
├── postcss.config.js
├── README.md             # This file
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts        # Vite configuration file
├── frontend/             # Frontend source code
│   └── src/
│       └── setupProxy.js
│       └── components/
│           └── Chat.tsx  # Main chat component
│           └── ErrorBoundary.tsx
├── netlify/              # Netlify functions
│   └── functions/
│       └── chat.ts       # Chatbot backend logic
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   └── placeholder.svg
└── src/
    ├── App.css
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    ├── app/
    │   └── globals.css   # Global CSS styles
    ├── components/       # React components
    │    ├── Chat.tsx
    │    ├── ErrorMessage.jsx
    │    ├── Layout.tsx
    │    ├── ProtectedRoute.tsx
    │    └── ui/          # Shadcn UI components
    ├── config/
    ├── contexts/
    │   └── AuthContext.tsx
    ├── functions/
    │   └── chat.ts
    ├── hooks/
    │   ├── use-mobile.tsx
    │   └── use-toast.ts
    ├── lib/
    │   └── utils.ts
    ├── pages/            # Application pages
    │   ├── AdminDashboard.tsx
    │   ├── Index.tsx
    │   ├── Login.tsx
    │   ├── NotFound.tsx
    │   ├── StudentDashboard.tsx
    │   └── Unauthorized.tsx
    ├── styles/
    │   └── error.css
    └── utils/
        └── errorHandler.js
```

## Getting Started

### Prerequisites

- Node.js (version 18 or later recommended)
- npm (or yarn, or bun)
- A Groq API key

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/stefanus-ai-tech/ocr_chatbot_ut
    cd ocr_chatbot_ut
    ```

2.  Install dependencies:

    ```bash
    npm install  # Or yarn install, or bun install
    ```

### Environment Variables

Delete `.example` from the file `.env.example`

Also create a `.env` file in the `netlify/functions` directory with the same content. Replace `your_groq_api_key` with your actual Groq API key.

## Deployment

This project is set up for deployment on Netlify.

1.  Create a new site on Netlify.
2.  Connect your GitHub repository.
3.  Set the build command to `npm run build` (or `yarn build` or `bun run build`).
4.  Set the publish directory to `dist`.
5.  Add the `GROQ_API_KEY` environment variable in the Netlify site settings.

## Built With

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Shadcn UI](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Netlify Functions](https://www.netlify.com/products/functions/)
- [Groq API](https://groq.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Contributing

We welcome contributions to this project! If you'd like to contribute, please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, descriptive commit messages.
4.  Push your branch to your forked repository.
5.  Submit a pull request to the main repository.

Please ensure your code adheres to the project's coding style and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details. (Note: You should create a LICENSE file and choose an appropriate license).
