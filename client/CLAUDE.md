# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack e-commerce application with:
- **Frontend (client/)**: React 19 + TypeScript + Vite + Tailwind CSS v4
- **Backend (ecommerce/)**: Spring Boot 4.0 + Java 21 + PostgreSQL

## Build & Run Commands

### Frontend (client/)
```bash
npm install          # Install dependencies
npm run dev          # Development server (http://localhost:5173)
npm run build       # Production build (TypeScript compile + Vite build)
npm run lint        # Run ESLint
npm run preview     # Preview production build
```

### Backend (ecommerce/)
```bash
cd ../ecommerce
./mvnw spring-boot:run              # Run with Maven (requires PostgreSQL)
./mvnw clean package                # Build JAR
./mvnw spring-boot:run -DskipTests  # Run without tests
```

Database: PostgreSQL must be running on `localhost:5432` with database `ecommerce` (user: `postgres`, password: `Yassine1234`).

## Architecture

### Frontend Structure
- `src/main.tsx` - Entry point; wraps App with Redux Provider, BrowserRouter, and ToastContainer
- `src/App.tsx` - Route definitions with role-based access control
- `src/store/store.ts` - Redux store with slices for: products, auth, categories, carts, address
- `src/api/api.ts` - Axios instance configured with `VITE_BACKEND_URL` and `withCredentials: true`
- `src/features/` - Redux Toolkit slices (authSlice, productSlice, categorySlice, cartSlice, addressSlice)
- `src/pages/` - Route components (Home, Products, Cart, Authentication, Admin/*, UserProfile/*)
- `src/components/` - Reusable UI components organized by feature (authComponents, cartComponents, header, hero, etc.)
- `src/layout/` - Layout wrappers (Layout for public pages, AdminLayout, UserLayout)
- `src/utils/RequireRole.tsx` - Role-based route protection component

### Backend Structure
- `controllers/` - REST endpoints (AuthController, ProductController, CategoryController, CartController, UserController, etc.)
- `services/` - Business logic with interface + Impl pattern (e.g., UserService/UserServiceImplt)
- `models/` - JPA entities: User, Product, Category, Cart, CartItem, Order, OrderItem, Payment, Address, Role, ProductImage, PasswordResetToken
- `repository/` - Spring Data JPA repositories
- `config/` - Configuration classes (AppConfig, WebConfig, WebMvcConfig, CloudinaryConfig)
- `security/` - JWT authentication + OAuth2 (Google) integration
  - `security/jwt/` - AuthTokenFilter, AuthEntryPointJwt
  - `security/services/` - UserDetailsServiceImpl, CustomOAuth2UserService, OAuth2SuccessHandler

### API Pattern
- All API calls go through `src/api/api.ts` axios instance
- Base URL: `VITE_BACKEND_URL/api/v2` (default: `http://localhost:8080/api/v2`)
- Authentication uses HTTP-only cookies (JWT tokens handled server-side)

### Key Routes
- `/` - Home page (public)
- `/products` - Product listing with filters
- `/cart` - Shopping cart
- `/auth` - Login/Register
- `/profile/*` - User profile (requires ROLE_USER)
- `/admin/*` - Admin dashboard (requires ROLE_ADMIN)
- `/seller/dashboard` - Seller dashboard (requires ROLE_SELLER)

## Authentication Flow
- Cookie-based JWT authentication
- `fetchCurrentUser` thunk called on app load to rehydrate auth state
- Google OAuth2 available
- Role-based access: `ROLE_USER`, `ROLE_ADMIN`, `ROLE_SELLER`

## State Management
- Redux Toolkit with `createSlice` and `createAsyncThunk`
- Cart state persisted to localStorage
- Auth state rehydrated from backend cookie on page refresh

## Key Patterns

### Redux Thunks
All async operations use `createAsyncThunk`:
```typescript
export const someAction = createAsyncThunk(
  "slice/action",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/endpoint");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
```

### Backend Service Pattern
Services follow interface + implementation naming:
- Interface: `UserService.java`
- Implementation: `UserServiceImplt.java`

### Path Alias
Frontend uses `@/` as alias for `src/`:
```typescript
import Something from "@/components/Something";
```

## Environment Variables
Frontend (`client/.env`):
```
VITE_BACKEND_URL=http://localhost:8080
```

Backend (`ecommerce/src/main/resources/application.properties`):
- PostgreSQL connection settings
- JWT configuration
- Cloudinary credentials (image hosting)
- Mail settings (Brevo SMTP)
- Google OAuth2 credentials