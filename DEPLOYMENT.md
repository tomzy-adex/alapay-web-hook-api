# Deployment Guide

## Render Deployment

### Prerequisites
- Render account
- PostgreSQL database (can be provisioned through Render)
- Environment variables configured

### Steps

1. **Connect your repository to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository

2. **Configure the service**
   - **Name**: `alapay-webhook-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`

3. **Set Environment Variables**
   In the Render dashboard, add these environment variables:
   ```
   NODE_ENV=production
   DATABASE_URL=your-postgresql-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=https://your-frontend-url.com
   INDIVIDUAL_URL=https://your-individual-url.com
   PORT=6525
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application

### Alternative: Using render.yaml

If you have the `render.yaml` file in your repository, Render will automatically use those settings.

## Environment Variables

### Required Variables
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `FRONTEND_URL`: URL of your frontend application
- `INDIVIDUAL_URL`: URL of your individual user application

### Optional Variables
- `PORT`: Server port (default: 6525)
- `NODE_ENV`: Environment (development/production)
- `SMTP_HOST`: SMTP server for email
- `SMTP_PORT`: SMTP port
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password
- `REDIS_URL`: Redis connection string

## Troubleshooting

### Common Issues

1. **"Cannot find module '/opt/render/project/src/dist/main.js'"**
   - Ensure the build command runs successfully
   - Check that `npm run build` completes without errors
   - Verify the `dist` directory is created

2. **Database Connection Issues**
   - Verify `DATABASE_URL` is correctly set
   - Ensure database is accessible from Render
   - Check if SSL is required for your database

3. **Port Issues**
   - Render automatically sets the `PORT` environment variable
   - Your application should use `process.env.PORT` instead of hardcoded port

### Build Process

The build process:
1. Installs dependencies (`npm install`)
2. Compiles TypeScript to JavaScript (`npm run build`)
3. Creates the `dist` directory with compiled files
4. Starts the application using `npm run start:prod`

### Health Check

Your application should respond to health checks at:
- `GET /api/v1/health` (if implemented)
- `GET /docs` (Swagger documentation)

## Local Development

To run locally:

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production build
npm run start:prod
```

## Database Migrations

If you need to run migrations on Render:

1. Add a build script that runs migrations:
   ```json
   "build": "npm run migration:run && nest build"
   ```

2. Or run migrations manually through Render's shell:
   ```bash
   npm run migration:run
   ``` 