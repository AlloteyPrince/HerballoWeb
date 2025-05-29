<template>
  <div>
    <header>
      <nav ref="navbar">
        <div class="branding">
          <img src="../images/ha-logo-main.jpg" alt="" />
        </div>
        <ul v-show="!mobile" class="navigation">
          <li><router-link class="link" to="/">Home</router-link></li>
          <li><router-link class="link" to="/ulearn">ULearn</router-link></li>
          <li>
            <router-link class="link" to="/consultation"
              >Consultation</router-link
            >
          </li>
          <li><router-link class="link" to="/shop">Shop</router-link></li>
          <li><router-link class="link" to="/about">About</router-link></li>
        </ul>
        <div class="icon">
          <font-awesome-icon
            icon="fas fa-bars"
            @click="toggleMobileNav"
            v-show="mobile"
            class="hamburger-icon"
            ref="hamburgerIcon"
            :class="{ 'icon-active': mobileNav }"
          />
        </div>
        <transition name="mobile-nav">
          <ul
            v-show="mobileNav"
            class="mobile-nav dropdown-nav"
            ref="mobileNavMenu"
          >
            <li>
              <router-link class="link" to="/" @click="closeMobileNav"
                >Home</router-link
              >
            </li>
            <li>
              <router-link class="link" to="/ulearn" @click="closeMobileNav"
                >ULearn</router-link
              >
            </li>
            <li>
              <router-link class="link" to="/consultation" @click="closeMobileNav"
                >Consultation</router-link
              >
            </li>
            <li>
              <router-link class="link" to="/shop" @click="closeMobileNav"
                >Shop</router-link
              >
            </li>
            <li>
              <router-link class="link" to="/about" @click="closeMobileNav"
                >About</router-link
              >
            </li>
          </ul>
        </transition>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      mobile: false,
      mobileNav: false,
      windowWidth: null,
    };
  },
  watch: {
    mobileNav(newValue) {
      if (newValue) {
        document.addEventListener("click", this.handleClickOutside);
      } else {
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  mounted() {
    // No scroll event listener needed now
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreen);
    document.removeEventListener("click", this.handleClickOutside); // Ensure cleanup
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    closeMobileNav() {
      // New method to close nav
      this.mobileNav = false;
    },
    handleClickOutside(event) {
      // Check if the click occurred outside the mobile navigation menu AND outside the hamburger icon
      const mobileNavMenu = this.$refs.mobileNavMenu;
      // Access the actual DOM element for Font Awesome component
      const hamburgerIcon = this.$refs.hamburgerIcon ? this.$refs.hamburgerIcon.$el : null; 

      if (
        mobileNavMenu &&
        !mobileNavMenu.contains(event.target) &&
        hamburgerIcon && // Ensure hamburgerIcon exists
        !hamburgerIcon.contains(event.target)
      ) {
        this.closeMobileNav();
      }
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
      } else {
        this.mobile = false;
        this.mobileNav = false; // Reset mobile nav state when switching to desktop
      }
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: white;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.06);
  color: rgb(17, 17, 17);

  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    width: 90%;
    transition: 0.5s ease all;
    margin: 0 auto;

    @media (min-width: 1140px) {
      max-width: 1140px;
    }

    ul {
      list-style: none;
    }

    .link {
      font-weight: 500;
      color: rgb(17, 17, 17);
      text-decoration: none;
    }

    li {
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }

    .link {
      font-size: 14px;
      transition: 0.5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;

      &:hover {
        color: rgb(7, 133, 55);
        border-color: rgb(17, 17, 17);
      }
    }

    .branding {
      display: flex;
      align-items: center;

      img {
        width: 50px;
        border-radius: 50%;
        transition: all 0.5s ease;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;

      .hamburger-icon {
        cursor: pointer;
        font-size: 24px;
        transition: 0.8s ease all;
        color: black;
      }
    }

    .icon-active {
      transform: rotate(180deg);
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100%;
      top: 0;
      left: 0;
      background-color: white;

      padding-top: 60px;
      padding-left: 30px;

      li {
        margin-left: 0;
        .link {
          color: rgb(17, 17, 17);
        }
      }
    }
    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: all 1s ease;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
      transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
      transform: translateX(0);
    }
  }
}
</style>