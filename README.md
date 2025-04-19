# Fuel Stations Management System

A comprehensive system for managing fuel stations, their locations, fuel prices, and associated companies. Built with Next.js, Prisma, and PostgreSQL.

## Features

- Fuel station management (CRUD operations)
- Fuel company management
- Regional management
- Fuel price tracking
- Location-based search
- User authentication and authorization
- Responsive design

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Containerization**: Docker

## Prerequisites

- Node.js 20 or later
- Docker and Docker Compose
- pnpm package manager

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Ethio-telecom/fuel-stations-management-system.git
cd fuel-stations-management-system
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/fuel_stations"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Start the application with Docker:

```bash
docker-compose up -d --build
```

5. Run database migrations:

```bash
docker-compose exec app npx prisma migrate dev
```

6. Generate Prisma client:

```bash
docker-compose exec app npx prisma generate
```

7. Seed the database (optional):

```bash
docker-compose exec app npx prisma db seed
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `GET /api/stations` - Get all fuel stations
- `POST /api/stations` - Create a new fuel station
- `GET /api/fuel-companies` - Get all fuel companies
- `GET /api/regions` - Get all regions

## Database Schema

The system uses the following main entities:

- `User` - System users with different roles
- `FuelStation` - Fuel station information and location
- `FuelCompany` - Fuel company details
- `Region` - Regional information
- `FuelPrice` - Fuel price tracking

## Development

1. Start the development server:

```bash
docker-compose up -d
```

2. Make your changes and the application will automatically reload.

## Production Deployment

1. Build the production image:

```bash
docker-compose -f docker-compose.yml up -d --build

```

2. Run migrations:

```bash
docker-compose -f docker-compose.yml exec app npx prisma migrate deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/New-feature`)
3. Commit your changes (`git commit -m 'Add some new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
