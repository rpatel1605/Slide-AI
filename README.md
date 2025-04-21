# AI Presentation Generator

A modern web application that leverages artificial intelligence to generate professional presentations automatically. Built with Next.js, React, and Google's Generative AI, this tool helps users create presentations quickly and efficiently.

## 🚀 Features

- **AI-Powered Presentation Generation**: Create presentations using natural language input
- **Customizable Templates**: Choose from various presentation styles and formats
- **Real-time Preview**: See your presentation as it's being generated
- **Download Options**: Export presentations in multiple formats
- **Complexity Analysis**: Get insights about your presentation's complexity
- **Example Presentations**: Browse through pre-made examples
- **Pricing Plans**: Choose from different subscription tiers

## 🛠️ Tech Stack

- **Frontend**:
  - Next.js 15.2.4
  - React 19
  - TypeScript
  - Tailwind CSS
  - Radix UI Components
  - Shadcn UI

- **Backend**:
  - Next.js API Routes
  - Google Generative AI
  - PPTXGenJS for presentation generation

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ai-presentation-generator-2
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
GOOGLE_API_KEY=your_google_api_key
```

## 🚀 Running the Application

1. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── download/      # Presentation download endpoints
│   │   ├── generate/      # AI generation endpoints
│   │   └── presentations/ # Presentation management endpoints
│   ├── complexity/        # Complexity analysis pages
│   ├── about/            # About page
│   ├── examples/         # Example presentations
│   ├── features/         # Feature showcase
│   └── pricing/          # Pricing information
├── components/           # Reusable UI components
├── lib/                 # Utility functions and shared code
├── public/             # Static assets
└── styles/             # Global styles
```

## 🔧 API Endpoints

- `/api/generate` - Generate presentations using AI
- `/api/download` - Download generated presentations
- `/api/presentations` - Manage saved presentations

## 🎨 UI Components

The application uses a combination of:
- Radix UI primitives
- Custom components
- Tailwind CSS for styling
- Responsive design principles

## 🔒 Environment Variables

Required environment variables:
- `GOOGLE_API_KEY`: Your Google AI API key for generative AI features

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support, please open an issue in the repository or contact the maintainers.

## 🙏 Acknowledgments

- Google AI for the generative AI capabilities
- Next.js team for the amazing framework
- All contributors and maintainers 