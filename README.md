# catalyzator

[Catalyzator.io](https://catalyzator.io) (`catalyzator`) is an AI-driven platform that connects promising startups with relevant grants and angel investors, with a special focus on Tnufa grants. The platform creates a unique ecosystem where startups can seamlessly transition from grant applications to angel investments.

### terminology

- **funding seeker** (innovator): a startup applying for grants or seeking angel investment
- **funding organization** (catalyst): grant organizations and angel investors
- **catalyzator**: the platform bridging innovators with catalysts

### Core Values

For Startups:
- **Smart Grant Discovery**: AI-powered grant recommendations based on Tnufa data
- **Streamlined Applications**: Voice-to-grant application generation
- **Smart Matching**: Automatic angel investor matching for grant-winning startups
- **Application Support**: End-to-end support from grant application to investor matching

For Angels:
- **Quality Deal Flow**: Access to grant-approved startups and promising applicants
- **Pre-Approval System**: Early commitment to startups during application phase

### Products

- **Pitch-to-Grant**: Transform spoken pitches into professional grant applications
- **Compass**: Smart grant recommendation engine powered by Tnufa data
- **FundMatch**: Intelligent matching platform connecting startups and angels
  - For Startups: Automatic matching with relevant angels post-grant approval
  - For Angels: Access to both approved grantees and promising applicants

### Future Products & Roadmap (2025) - Do not implement

#### For Startups (Innovators)
- **LaunchKit**: Complete startup documentation generator
  - One-pager generation
  - Executive summaries
  - Business plan builder
  - Financial model templates
  
- **PitchPerfect**: AI-powered pitch training suite
  - Pitch practice with AI feedback
  - Q&A preparation for investor meetings
  - Personalized improvement suggestions
  
- **VisaPathfinder**: Startup visa application support
  - Multi-country visa application templates
  - Eligibility assessment
  - Document preparation guidance

#### For Angels & Catalysts
- **ImpactMetrics**: Investment impact tracking
  - Portfolio performance monitoring
  - Impact measurement tools
  - Automated reporting
  
- **DealScout**: Enhanced deal discovery
  - AI-driven startup evaluation
  - Market intelligence integration
  - Competitor analysis tools

#### Platform Enhancements
- **MultiLingual Support**: Platform accessibility in 12+ languages
- **AI Co-pilot**: Intelligent assistant for both startups and investors
- **Analytics Dashboard**: Advanced metrics and insights
- **Integration Hub**: Connections with key startup tools and services

## [PRD](./docs/PRD.md)

## [TODO](./docs/TASKS.md)

## Folder Structure

```bash
catalyzator/
├── docs/
│   ├── PRD.md
│   └── TASKS.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── landing_page/
│   │   │   ├── profile/
│   │   │   └── ui/
│   │   ├── constants/
│   │   │   └── styles/
│   │   ├── pages/
│   │   │   ├── private/
│   │   │   └── public/
│   │   ├── styles/
│   │   ├── types/
│   │   └── utils/
│   └── public/
├── backend/
│   ├── src/
│   ├── requirements.txt
│   └── Dockerfile
└── docker-compose.yml
```

