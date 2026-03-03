# Local Setup Guide

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 18+ and npm (for frontend development)
- Git

## Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Aarish2707/Password-generate.git
cd Password-generate
```

### 2. Build the Project

```bash
./mvnw clean install
```

Or on Windows:

```bash
mvnw.cmd clean install
```

### 3. Run the Application

```bash
./mvnw spring-boot:run
```

Or on Windows:

```bash
mvnw.cmd spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Test the API

```bash
curl -X POST http://localhost:8080/api/password/generate \
  -H "Content-Type: application/json" \
  -d '{"strength":"HIGH","length":16}'
```

## Frontend Setup (Development Mode)

### 1. Navigate to Frontend Directory

```bash
cd password-generator-frontend-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create `.env` file:

```
VITE_API_URL=http://localhost:8080
```

### 4. Run Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:8080` (configured in vite.config.ts)

## Production Build

### 1. Build Frontend

```bash
cd password-generator-frontend-main
npm run build
```

### 2. Copy Build to Static Folder

```bash
# From frontend directory
xcopy dist\* ..\src\main\resources\static\ /E /I /Y
```

Or on Unix/Linux/Mac:

```bash
cp -r dist/* ../src/main/resources/static/
```

### 3. Build and Run Spring Boot

```bash
cd ..
./mvnw clean package
java -jar target/PwdGenerator-0.0.1-SNAPSHOT.jar
```

Access the application at `http://localhost:8080`

## Docker Setup

### 1. Build Docker Image

```bash
docker build -t password-generator .
```

### 2. Run Container

```bash
docker run -p 8080:8080 password-generator
```

## API Endpoints

### Generate Password

- **URL**: `/api/password/generate`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "strength": "LOW" | "MEDIUM" | "HIGH",
    "length": 4-128
  }
  ```
- **Response**: Plain text password

### Test Endpoint

- **URL**: `/api/password/test`
- **Method**: `GET`
- **Response**: "Backend is working!"

## Password Strength Levels

- **LOW**: Lowercase + Uppercase letters
- **MEDIUM**: Lowercase + Uppercase + Numbers
- **HIGH**: Lowercase + Uppercase + Numbers + Special characters

## Troubleshooting

### Port Already in Use

Change the port in `src/main/resources/application.properties`:

```properties
server.port=8081
```

### CORS Issues

Allowed origins are configured in `CorsConfig.java`:
- `http://localhost:3000`
- `http://localhost:8080`
- Production URL

### Build Failures

Clear Maven cache:

```bash
./mvnw clean
rm -rf ~/.m2/repository
./mvnw install
```

## Project Structure

```
Password-generate/
├── src/
│   ├── main/
│   │   ├── java/com/aarish/PwdGenerator/
│   │   │   ├── config/          # CORS and Security config
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── service/         # Business logic
│   │   │   ├── DTO/             # Data transfer objects
│   │   │   ├── utility/         # Password generation utility
│   │   │   └── exception/       # Exception handlers
│   │   └── resources/
│   │       ├── static/          # Frontend build files
│   │       └── application.properties
│   └── test/
├── password-generator-frontend-main/  # React frontend source
├── Dockerfile
├── pom.xml
└── README.md
```

## Environment Variables

### Backend

- `PORT`: Server port (default: 8080)

### Frontend

- `VITE_API_URL`: Backend API URL (default: http://localhost:8080)

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.3.11
- Maven

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Framer Motion

## License

Copyright © 2023 Aarish2707
