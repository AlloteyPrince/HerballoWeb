import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '@/pages/NotFound.vue';
import HomePage from '@/pages/HomePage.vue';
import About from '@/pages/About.vue';
import Shop from '@/pages/Shop.vue';
import Consultation from '@/pages/Consultation.vue';


const routes = [
  
  {
    path: '/:pathMatch(.*)*',           
    name: 'NotFound',             
    component: NotFound,      
  },
  {
    path: '/',                
    name: 'home',             
    component: HomePage,      
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop,
  },
  {
    path: '/consultation',
    name: 'consultation',
    component: Consultation,
  },

//   // --- Example: Nested Route / Page Group (e.g., Admin Section) ---
//   {
//     path: '/admin',             // The parent path for the admin section
//     component: AdminLayout,     // This component will serve as the layout for all its children
//     // You can add route guards or meta fields here that apply to all children
//     // meta: { requiresAuth: true, isAdmin: true },
//     children: [                 // This array defines the nested routes
//       {
//         path: '',               // Resolved as /admin (the default child route for the group)
//         name: 'admin-dashboard',
//         component: AdminDashboard,
//       },
//       {
//         path: 'users',          // Resolved as /admin/users
//         name: 'admin-users',
//         component: AdminUsers,
//       }, 
//     ],
//   },

];


const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;