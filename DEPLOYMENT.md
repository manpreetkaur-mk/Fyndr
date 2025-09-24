# Deployment Guide: Vercel + Neon

This guide will help you deploy your Next.js application to Vercel with a Neon PostgreSQL database.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Neon account (sign up at https://neon.tech)

## Step 1: Set up Neon Database

1. **Create Neon Account & Project**
   - Go to https://neon.tech and sign up
   - Create a new project
   - Choose a region close to your users
   - Select PostgreSQL version (latest recommended)

2. **Get Database Connection String**
   - In your Neon dashboard, go to "Connection Details"
   - Copy the connection string (it will look like):
     ```
     postgresql://username:password@host.neon.tech:5432/database?sslmode=require
     ```
   - Save this for later - you'll need it for Vercel

3. **Optional: Set up Database Schema**
   ```bash
   # If you have Prisma migrations
   npx prisma db push
   ```

## Step 2: Prepare Your Code for Deployment

1. **Commit your changes to Git**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Ensure your repository is on GitHub**
   - If not already, push your code to a GitHub repository

## Step 3: Deploy to Vercel

1. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - In the Vercel deployment setup, add these environment variables:
     ```
     DATABASE_URL=your-neon-connection-string-here
     NEXTAUTH_URL=https://your-app-name.vercel.app
     NEXTAUTH_SECRET=generate-a-secure-secret-key-here
     GRAPHQL_ENDPOINT=/api/graphql
     ```

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically detect it's a Next.js project
   - Wait for deployment to complete

## Step 4: Post-Deployment Setup

1. **Update Database Schema** (if needed)
   ```bash
   # From your local machine, with DATABASE_URL pointing to Neon
   npx prisma db push
   ```

2. **Verify Deployment**
   - Visit your Vercel app URL
   - Check that the application loads correctly
   - Test any database functionality

## Environment Variables Reference

### Required for Production:
- `DATABASE_URL`: Your Neon PostgreSQL connection string
- `NEXTAUTH_URL`: Your Vercel app URL
- `NEXTAUTH_SECRET`: A secure random string for NextAuth.js

### Optional:
- `GRAPHQL_ENDPOINT`: GraphQL endpoint path (default: `/api/graphql`)

## Troubleshooting

### Common Issues:

1. **Prisma Client not generated**
   ```bash
   npx prisma generate
   ```

2. **Database connection errors**
   - Verify your `DATABASE_URL` is correct
   - Ensure SSL mode is enabled for Neon

3. **Build failures**
   - Check Vercel build logs
   - Ensure all dependencies are in `package.json`

4. **GraphQL endpoint not working**
   - Verify your API routes are properly set up
   - Check Apollo Server configuration

## Automatic Deployments

Once set up, Vercel will automatically:
- Deploy when you push to your main branch
- Run your build script (`npm run build`)
- Generate Prisma client during build
- Apply environment variables

## Monitoring

- Check Vercel dashboard for deployment status
- Monitor Neon dashboard for database performance
- Use Vercel Analytics for application insights

## Next Steps

1. Set up custom domain (optional)
2. Configure CI/CD workflows
3. Set up database monitoring
4. Implement proper error tracking
5. Set up backup strategies for your database

---

**Need help?**
- Vercel Documentation: https://vercel.com/docs
- Neon Documentation: https://neon.tech/docs
- Next.js Documentation: https://nextjs.org/docs
