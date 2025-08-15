# BETTROI - Voter Sentiment Dashboard

A real-time political intelligence system designed to help leaders, campaign managers, and political consultants measure voter mood, track emerging issues, and take timely action.

## Features

- **Real-time Sentiment Analysis**: Monitor positive, negative, and neutral sentiment across key political issues
- **Geographic Heatmaps**: Ward-by-ward sentiment visualization for targeted campaign strategies  
- **Trend Monitoring**: Track sentiment changes over time with interactive charts
- **Competitor Analysis**: Side-by-side comparison of candidate sentiment scores
- **Influencer Tracking**: Identify and monitor key voices shaping political conversations
- **AI-Driven Alerts**: Real-time notifications for significant sentiment shifts
- **Issue Classification**: Categorize discussions into jobs, infrastructure, health, education, and law & order

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd voter-sentiment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Dashboard Components

### 1. Sentiment Analysis Overview
- **Current Sentiment by Issue**: Bar chart showing sentiment scores across political topics
- **Overall Sentiment Distribution**: Pie chart of positive/negative/neutral/mixed sentiment

### 2. Trend Analysis  
- **Sentiment Trends Over Time**: Multi-line chart tracking issue sentiment evolution
- **Issue Importance Share**: Pie chart showing relative importance of political topics

### 3. Geographic Intelligence
- **Sentiment Heatmap**: Ward-by-ward color-coded sentiment visualization
- **Regional Issue Mapping**: Identify which issues matter most by location

### 4. Competitive Intelligence
- **Competitor Sentiment Comparison**: Side-by-side analysis of candidate performance
- **Market Share Analysis**: Track sentiment advantage across different issues

### 5. Influencer Network
- **Key Voice Identification**: Monitor positive, neutral, and critical influencers
- **Engagement Metrics**: Track reach and engagement rates
- **Strategy Recommendations**: AI-powered suggestions for influencer engagement

### 6. Alert System
- **Real-time Monitoring**: Live alerts for sentiment spikes and issues
- **Severity Classification**: High, medium, and low priority notifications
- **Action Recommendations**: AI-generated suggestions for campaign responses

## Data Security & Compliance

- **Anonymized Data**: All personal information is aggregated and anonymized
- **Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Compliance**: Adheres to Indian IT Act and Election Commission guidelines
- **Privacy**: No personal identifiable information is stored or processed

## Customization

The dashboard supports customizable taxonomies per constituency and configurable alert triggers. Issue categories and sentiment thresholds can be adjusted based on local political contexts.

## License

This project is proprietary software developed for political campaign management and analysis.

---

**Built with modern web technologies for real-time political intelligence.**