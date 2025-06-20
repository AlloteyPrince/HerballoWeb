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
    path: "/ulearn/:id",
    name: "plantDetail",
    component: PlantDetail,
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
      {
        path: "summary",
        name: "summary",
        component: Summary,
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

export default router;
