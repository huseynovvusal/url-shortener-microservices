# 🚀 URL Shortener Microservices

A modern, scalable URL shortening platform built using microservices architecture. This project demonstrates my skills and best practices in building distributed systems with Node.js, TypeScript, Docker, Redis caching, and RabbitMQ event-driven communication.

## 📋 Overview

This robust URL shortener service provides:

- ✅ Fast URL shortening with custom or auto-generated codes
- ✅ User authentication and management
- ✅ Comprehensive analytics and tracking
- ✅ Scalable microservices architecture with distributed data stores
- ✅ High-performance caching using Redis
- ✅ Event-driven architecture with RabbitMQ
- ✅ Containerized deployment with Docker

## 🏗️ Architecture

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'darkMode': true, 'background': '#333', 'primaryTextColor': '#fff' }}}%%
graph TD
    Client([Client/Browser]) --> Gateway[API Gateway]

    subgraph "URL Shortener System"
        Gateway --> |Auth Requests| UserService[User Service]
        Gateway --> |URL Requests| URLService[URL Service]
        Gateway --> |Analytics Requests| AnalyticsService[Analytics Service]

        URLService --> |Publishes Events| RabbitMQ{RabbitMQ}
        RabbitMQ --> |Consumes Events| AnalyticsService

        URLService --> MongoDB[(MongoDB)]
        URLService --> Redis[(Redis Cache)]
        UserService --> PostgreSQL[(PostgreSQL)]
        AnalyticsService --> MongoDB

        subgraph "User Service"
            UserService --> UserController[Controller]
            UserController --> UserService_Service[Service]
            UserService_Service --> UserRepository[Repository]
            UserRepository --> PostgreSQL
        end

        subgraph "URL Service"
            URLService --> URLController[Controller]
            URLController --> URLService_Service[Service]
            URLService_Service --> URLRepository[Repository]
            URLRepository --> MongoDB
            URLService_Service --> URLCache[Cache]
            URLCache --> Redis
        end

        subgraph "Analytics Service"
            AnalyticsService --> AnalyticsController[Controller]
            AnalyticsController --> AnalyticsService_Service[Service]
            AnalyticsService_Service --> AnalyticsRepository[Repository]
            AnalyticsRepository --> MongoDB
            RabbitMQ --> AnalyticsConsumer[Consumer]
            AnalyticsConsumer --> AnalyticsService_Service
        end
    end

    class Client,Gateway,UserService,URLService,AnalyticsService,RabbitMQ,MongoDB,Redis,PostgreSQL,UserController,UserService_Service,UserRepository,URLController,URLService_Service,URLRepository,URLCache,AnalyticsController,AnalyticsService_Service,AnalyticsRepository,AnalyticsConsumer nodeStyle

    %% Styles that work in both light and dark modes
    classDef nodeStyle fill:#f9f9f9,stroke:#333,stroke-width:1px,color:#333
    classDef microservice fill:#d1f0fd,stroke:#0078d4,stroke-width:2px,color:#333
    classDef database fill:#e7f5d7,stroke:#5ca53a,stroke-width:2px,color:#333
    classDef messagebroker fill:#fde7c7,stroke:#ff8c00,stroke-width:2px,color:#333
    classDef gateway fill:#e7d1fd,stroke:#7b2cbf,stroke-width:2px,color:#333
    classDef client fill:#f5f5f5,stroke:#333,stroke-width:1px,stroke-dasharray: 5 5,color:#333

    class UserService,URLService,AnalyticsService microservice
    class MongoDB,PostgreSQL,Redis database
    class RabbitMQ messagebroker
    class Gateway gateway
    class Client client
```

## 🧩 Architectural Patterns & Design Principles

This project implements several industry-standard architectural patterns and design principles:

### Clean Architecture

- **Separation of Concerns**: Each service is organized into layers with clear boundaries
- **Domain-Driven Design**: Business logic is isolated from infrastructure concerns
- **Use Cases**: Business rules are defined as use cases in service layers
- **Dependency Rule**: Dependencies point inward, with inner layers unaware of outer layers

### Dependency Injection (DI)

- **Inversion of Control**: Using TypeScript-based DI containers for service instantiation
- **Testability**: Dependencies can be easily mocked for unit testing
- **Loose Coupling**: Components interact through abstractions rather than concrete implementations

### Repository Pattern

- **Data Access Abstraction**: Repository interfaces isolate business logic from data access
- **Persistence Ignorance**: Business logic remains independent of specific database implementations
- **Interchangeable Data Sources**: Ability to swap MongoDB, PostgreSQL, or other datastores with minimal code changes

### SOLID Principles

- **Single Responsibility**: Each class and module has one clear responsibility
- **Open/Closed**: Entities are open for extension but closed for modification
- **Liskov Substitution**: Interfaces are designed to ensure subtypes can be substituted for base types
- **Interface Segregation**: Small, focused interfaces prevent unnecessary dependencies
- **Dependency Inversion**: High-level modules depend on abstractions, not concrete implementations

### Event-Driven Architecture

- **Message Brokers**: RabbitMQ facilitates loose coupling between services
- **Asynchronous Communication**: Services communicate through events without direct dependencies
- **Eventual Consistency**: Data is synchronized across services asynchronously
- **Fault Tolerance**: Services can continue to operate despite failures in other services

### API Gateway Pattern

- **Single Entry Point**: Unified API interface for all client communications
- **Cross-Cutting Concerns**: Centralized handling of authentication, logging, and monitoring
- **Request Routing**: Dynamic routing of requests to appropriate microservices
- **API Composition**: Aggregation of data from multiple services for client requests

The system consists of four main microservices:

### 1. API Gateway

- Entry point for all client requests
- Handles request routing to appropriate services
- Implements rate limiting, security headers, and request validation
- Authentication middleware for protected endpoints

### 2. URL Service

- Core service for URL shortening functionality
- Creates and stores short URLs with MongoDB
- Uses Redis for caching frequently accessed URLs
- Publishes analytics events to RabbitMQ

### 3. User Service

- Manages user registration and authentication
- Stores user data in PostgreSQL with Prisma ORM
- Handles JWT token generation and validation
- Password encryption with bcrypt

### 4. Analytics Service

- Processes URL access events from RabbitMQ
- Tracks and stores analytics data in MongoDB
- Provides detailed analytics on URL performance
- Captures data on geographic location, referrers, browsers, devices, and OS

## 💾 Data Storage

- **PostgreSQL**: User accounts and related data
- **MongoDB**: URL mappings and analytics information
- **Redis**: High-performance caching for frequent URL lookups
- **RabbitMQ**: Message broker for event-driven communication between services

## 🔧 Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Databases**: PostgreSQL, MongoDB, Redis
- **Message Queue**: RabbitMQ
- **ORM/ODM**: Prisma (PostgreSQL), Mongoose (MongoDB)
- **Authentication**: JWT, bcrypt
- **Containerization**: Docker, Docker Compose
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier

## 🛠️ Setup & Installation

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)

### Quick Start

1. Clone the repository

```bash
git clone https://github.com/yourusername/url-shortener-microservices.git
cd url-shortener-microservices
```

2. Create `.env` files for each service (see `.env.example` in each service directory)

3. Start all services using Docker Compose

```bash
cd volumes
docker-compose up -d
```

4. The services will be available at:
   - API Gateway: http://localhost:3000
   - User Service: http://localhost:3001
   - URL Service: http://localhost:3002
   - Analytics Service: http://localhost:3003

### Local Development

Each service can be run independently for development:

```bash
cd <service-directory>
npm install
npm run dev
```

## 📊 API Documentation

### URL Service

- `POST /api/urls` - Create a new short URL
- `GET /api/urls` - Get all URLs for authenticated user
- `GET /:shortCode` - Redirect to the original URL

### User Service

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get token
- `GET /api/users/me` - Get current user details

### Analytics Service

- `GET /api/analytics/:urlId` - Get analytics for a specific URL

## 🚀 Future Improvements

- Web dashboard for user management and analytics
- Custom domain support
- Advanced analytics visualizations
- QR code generation for short URLs
- Expiration dates for links
- API rate limiting tiers
- ELK Stack (Elasticsearch, Logstash, Kibana) for centralized logging and monitoring

## 👤 Author

Created by Vusal Huseynov as a demonstration of microservices architecture best practices using modern web technologies.

---

⭐ If you find this project useful, please consider giving it a star!
