# Product Management Dashboard

A modern, responsive product management dashboard built with React, TypeScript, and Vite. This application provides a comprehensive interface for managing products with features like real-time search, filtering, and inline editing.

![Dashboard Preview](c:\Users\mural\Pictures\Screenshots\product-management.png)

## Features

- 📦 Product listing with pagination
- 🔍 Real-time search with debouncing
- 📅 Date range filtering
- ⭐ Rating filters
- 💰 Inline price editing
- 📱 Fully responsive design
- ➕ Add new products with detailed information
- 🖼️ Multiple image support
- 📊 Detailed product view modal

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **State Management:** 
  - Zustand (for global state)
  - TanStack Query (for server state)
- **Styling:** 
  - Tailwind CSS
  - shadcn/ui components
  - Lucide React icons
- **Type Safety:** TypeScript

## Optimization Techniques

1. **Performance**
   - Debounced search implementation (300ms delay)
   - React Query caching with 1-minute stale time
   - Client-side pagination for better UX
   - Optimized re-renders using proper state management
   - Lazy-loaded modals

2. **Code Organization**
   - Modular component architecture
   - Custom hooks for business logic
   - TypeScript interfaces for type safety
   - Separation of concerns (components, hooks, store)

3. **State Management**
   - Zustand for lightweight global state
   - React Query for server state management
   - Local component state for UI-specific states

4. **UI/UX Improvements**
   - Loading states
   - Error handling
   - Responsive design
   - Form validation
   - Interactive feedback
   - Accessible components

## Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── ...
├── hooks/             # Custom React hooks
├── store/             # Zustand store
├── types/             # TypeScript interfaces
└── lib/               # Utility functions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```
   VITE_BASE_URL=https://dummyjson.com/products
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `VITE_BASE_URL`: API base URL for products

## API Integration

The dashboard integrates with the DummyJSON API, providing:
- Product listing
- Search functionality
- Product updates
- Adding new products

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request