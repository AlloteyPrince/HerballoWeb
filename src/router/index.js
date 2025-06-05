import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/pages/NotFound.vue";
import HomePage from "@/pages/HomePage.vue";
import ULearn from "@/pages/ULearn.vue";
import About from "@/pages/About.vue";
import Shop from "@/pages/Shop.vue";
import Consultation from "@/pages/Consultation/Consultation.vue";
import Payment from "@/pages/Consultation/Payment.vue";
import Booking from "@/pages/Consultation/Booking.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/ulearn",
    name: "ulearn",
    component: ULearn,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/shop",
    name: "shop",
    component: Shop,
  },
  {
    path: "/consultation",
    name: "consultation",
    component: Consultation,
    children: [
      {
        path: "payment",
        name: "payment",
        component: Payment,
      },
      {
        path: "booking",
        name: "booking",
        component: Booking,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },

  //   // --- Example: Nested Route / Page Group (e.g., Admin Section) ---
  //   {
  //     path: '/admin',
  //     component: AdminLayout,
  //     children: [
  //       {
  //         path: '',
  //         name: 'admin-dashboard',
  //         component: AdminDashboard,
  //       },
  //       {
  //         path: 'users',
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
