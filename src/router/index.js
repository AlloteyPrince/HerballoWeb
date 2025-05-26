import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; // Example: Your main homepage
import AboutView from '../views/AboutView.vue'; // Example: A simple about page
import ContactView from '../views/ContactView.vue'; // Example: A contact page

// Layout components (for nested routes/page groups)
import AdminLayout from '../views/layouts/AdminLayout.vue'; // Example: A layout for admin pages

// Specific components for the 'admin' page group (nested routes)
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import AdminUsers from '../views/admin/AdminUsers.vue';
import AdminSettings from '../views/admin/AdminSettings.vue';

// Fallback component for 404 Not Found pages
import NotFound from '../views/NotFound.vue';


// 3. Define your array of route objects
//    Each object represents a single route in your application.
const routes = [
  // --- Public Routes ---
  {
    path: '/',                 // The URL path for this route
    name: 'home',              // A unique name for the route (good for programmatic navigation)
    component: HomeView,       // The Vue component to render when this path is matched
    // meta: { title: 'Home Page' } // Optional: Custom data attached to the route
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
  },

  // --- Example: Nested Route / Page Group (e.g., Admin Section) ---
  {
    path: '/admin',             // The parent path for the admin section
    component: AdminLayout,     // This component will serve as the layout for all its children
    // You can add route guards or meta fields here that apply to all children
    // meta: { requiresAuth: true, isAdmin: true },
    children: [                 // This array defines the nested routes
      {
        path: '',               // Resolved as /admin (the default child route for the group)
        name: 'admin-dashboard',
        component: AdminDashboard,
      },
      {
        path: 'users',          // Resolved as /admin/users
        name: 'admin-users',
        component: AdminUsers,
      },
      {
        path: 'settings',       // Resolved as /admin/settings
        name: 'admin-settings',
        component: AdminSettings,
      },
      // Example of a dynamic nested route
      // {
      //   path: 'users/:id',    // Resolved as /admin/users/123
      //   name: 'admin-user-detail',
      //   component: () => import('../views/admin/AdminUserDetail.vue'), // Example of lazy-loading a component
      // }
    ],
  },

  // --- Catch-all 404 Not Found Route ---
  // This route should always be the last one in your routes array.
  // It uses a regex to match any path that hasn't been matched by previous routes.
  {
    path: '/:pathMatch(.*)*', // Matches all unmatched paths
    name: 'NotFound',
    component: NotFound,       // The component to render for 404 errors
  },
];

// 4. Create the router instance
//    - history: Defines how URLs are managed (e.g., clean URLs vs. hash-based URLs)
//    - routes: Passes the array of defined routes
const router = createRouter({
  history: createWebHistory(), // Recommended for clean URLs
  // history: createWebHashHistory(), // Use this if you prefer hash-based URLs (e.g., example.com/#/about)
  routes,
});

// 5. Export the router instance
//    This allows you to import and use it in your main.js file to attach it to your Vue app.
export default router;