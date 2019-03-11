<template>
  <nav
    class="navbar has-shadow is-spaced is-warning"
    role="navigation"
    aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://github.com/orgs/progbase/teams/baboo-industry">
          <p class="title">Baboo</p>
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link to="/" class="navbar-item">
            Home
          </router-link>

          <router-link to="/real-time-drawing" class="navbar-item">
            Drawing
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',

  methods: {
    connect() {
      console.log('Connecting to Arduino...');
    },

    disconnect() {
      console.log('Disconnecting...');
    },
  },
};
</script>


<style lang="stylus">
.navbar {
  /*height: 60px;*/
  /*background-color: #ac58cc !important;*/
}
</style>
