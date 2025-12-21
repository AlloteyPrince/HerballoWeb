import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/pages/NotFound.vue";
import HomePage from "@/pages/HomePage.vue";
import ULearn from "@/pages/Library/ULearn.vue";
import About from "@/pages/About.vue";
import Shop from "@/pages/Shop.vue";
import Consultation from "@/pages/Consultation/Consultation.vue";
import Payment from "@/pages/Consultation/Payment.vue";
import Booking from "@/pages/Consultation/Booking.vue";
import Summary from "@/pages/Consultation/Summary.vue";
import BookPaySuccess from "@/pages/Consultation/BookPaySuccess.vue";
import ProductDev from "@/pages/ProductDev.vue";
import PrivacyPolicy from "@/pages/PrivacyPolicy.vue";
import TermsOfUse from "@/pages/TermsOfUse.vue";
import Contact from "@/pages/Contact.vue";
import PlantDetail from "@/pages/Library/PlantDetail.vue";
import Blog from "@/pages/Blog.vue";
import AdminLogin from "@/pages/AdminLogin.vue";
import AdminDashboard from "@/pages/AdminDashboard.vue";
import BlogDetails from "@/pages/BlogDetails.vue";
import EditDetails from "@/pages/EditDetails.vue";
import PublicBlogDetail from "@/pages/PublicBlogDetail.vue";
// import NewsletterSender from "@/pages/admin/NewsletterSender.vue";
import SubManagement from "@/pages/admin/SubManagement.vue";
import Resources from "@/pages/Resources.vue";

const routes = [
  {
    path: "/admin/login",
    name: "login",
    component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    name: "dashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/blog/:id",
    name: "blogDetails",
    component: BlogDetails,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/admin/blog/edit/:id",
    name: "editDetails",
    component: EditDetails,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/admin/subscribers/submanagement",
    name: "submanagement",
    component: SubManagement,
    meta: { requiresAuth: true },
    props: true,
  },
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
    path: "/ulearn/:id",
    name: "plantDetail",
    component: PlantDetail,
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog,
  },
  {
    path: "/blog/:slug",
    name: "publicBlogDetail",
    component: PublicBlogDetail,
    props: true,
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
      // MODIFIED: Updated the summary route to accept a parameter
      {
        path: "summary/:bookingId?",
        name: "summary",
        component: Summary,
        props: true,
      },
      {
        path: "bookpaysuccess",
        name: "bookpaysuccess",
        component: BookPaySuccess,
      },
    ],
  },
  {
    path: "/productdev",
    name: "productdev",
    component: ProductDev,
  },
  {
    path: "/resources",
    name: "resources",
    component: Resources,
  },
  {
    path: "/privacypolicy",
    name: "privacypolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/termsofuse",
    name: "termsofuse",
    component: TermsOfUse,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/admin/login");
  } else {
    next();
  }
});

export default router;
