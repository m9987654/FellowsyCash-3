# Flous Cash Financial Services Platform

## Overview

This is a full-stack financial services platform built with React, Express, and PostgreSQL. The application provides three main financial services: quick funding, smart saving, and profitable investment. It features user authentication, service management, automated contract generation, and Telegram notifications.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design tokens
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with TypeScript support

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Authentication**: Passport.js with local strategy and express-session
- **Database ORM**: Drizzle ORM with Neon PostgreSQL
- **Session Storage**: PostgreSQL-based session store
- **File Processing**: PDF generation using pdf-lib
- **External Integrations**: Telegram Bot API for notifications

## Key Components

### Database Schema
- **Users Table**: Stores user credentials and personal information (username, email, password, full name, national ID, phone, job, address, admin status)
- **Services Table**: Tracks financial service requests with status tracking, progress monitoring, and contract management
- **Session Store**: PostgreSQL-based session management for authentication

### Authentication System
- Local username/password authentication with hashed passwords using scrypt
- Session-based authentication with PostgreSQL session store
- Protected routes with role-based access (admin/user)
- Password hashing with salt for security

### Service Management
- Three service types: funding, saving, investment
- Status tracking: pending, approved, rejected, completed
- Progress monitoring with percentage completion
- Payment confirmation workflow
- Automated contract generation and file storage

### External Integrations
- **PDF Generation**: Automated contract creation with Arabic and English content
- **Telegram Notifications**: Real-time notifications to admin chat when new services are requested
- **Neon Database**: Serverless PostgreSQL with connection pooling

## Data Flow

1. **User Registration/Login**: Users authenticate through the local strategy, sessions stored in PostgreSQL
2. **Service Request**: Users submit service requests through validated forms
3. **Contract Generation**: System automatically generates PDF contracts upon service creation
4. **Notification System**: Telegram notifications sent to admin chat for new requests
5. **Admin Management**: Admins can view all services, update statuses, and manage users
6. **Progress Tracking**: Users can monitor their service progress through the dashboard

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **passport**: Authentication middleware with local strategy
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store
- **pdf-lib**: PDF generation library
- **axios**: HTTP client for Telegram API

### UI Dependencies
- **@radix-ui/***: Comprehensive UI component primitives
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling with validation
- **zod**: Schema validation
- **tailwindcss**: Utility-first CSS framework

## Deployment Strategy

### Development Environment
- Vite development server with HMR
- Express server with middleware logging
- Development-specific Replit integrations
- TypeScript compilation and type checking

### Production Build
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations manage schema changes
- **Environment Variables**: Database URL, session secret, Telegram credentials

### Environment Configuration
- `NODE_ENV` determines development/production behavior
- Database URL required for Drizzle configuration
- Session secret for secure authentication
- Optional Telegram bot credentials for notifications

### Security Considerations
- Password hashing with scrypt and random salts
- Session-based authentication with secure session store
- Input validation using Zod schemas
- Environment variable protection for sensitive data
- CORS and security headers configuration