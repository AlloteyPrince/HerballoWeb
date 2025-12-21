<template>
  <header>
    <nav ref="navbar">
      <div class="branding">
        <img src="../images/ha-logo-main.jpg" alt="Herballo Logo" />
      </div>

      <ul v-show="!mobile" class="navigation">
        <li><router-link class="link" to="/">Home</router-link></li>
        <li><router-link class="link" to="/subscribe">Subscribe</router-link></li>
        <li><router-link class="link" to="/donate">Donate</router-link></li>
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
          <li><router-link class="link" to="/" @click="closeMobileNav">Home</router-link></li>
          <li><router-link class="link" to="/subscribe" @click="closeMobileNav">Subscribe</router-link></li>
          <li><router-link class="link" to="/donate" @click="closeMobileNav">Donate</router-link></li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script>
export default {
  name: "BlogNav",
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
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreen);
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    closeMobileNav() {
      this.mobileNav = false;
    },
    handleClickOutside(event) {
      const mobileNavMenu = this.$refs.mobileNavMenu;
      const hamburgerIcon = this.$refs.hamburgerIcon?.$el;

      if (
        mobileNavMenu &&
        !mobileNavMenu.contains(event.target) &&
        hamburgerIcon &&
        !hamburgerIcon.contains(event.target)
      ) {
        this.closeMobileNav();
      }
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      this.mobile = this.windowWidth <= 750;
      if (!this.mobile) this.mobileNav = false;
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
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    width: 90%;
    margin: 0 auto;

    .branding img {
      width: 45px;
      border-radius: 50%;
    }

    .navigation {
      display: flex;
      align-items: center;
    }

    ul {
      list-style: none;
      display: flex;
      gap: 16px;
    }

    li {
      padding: 10px;
      text-transform: uppercase;
    }

    .link {
      text-decoration: none;
      font-size: 14px;
      color: #111;
      font-weight: 500;
      border-bottom: 1px solid transparent;
      &:hover {
        color: #078537;
        border-color: #111;
      }
    }

    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;

      .hamburger-icon {
        font-size: 22px;
        cursor: pointer;
      }

      .icon-active {
        transform: rotate(180deg);
      }
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      width: 250px;
      height: 100%;
      background-color: white;
      padding-top: 60px;
      padding-left: 30px;
      li {
        margin-left: 0;
      }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: all 0.3s ease;
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
