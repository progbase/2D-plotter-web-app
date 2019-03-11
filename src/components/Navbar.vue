<template>
  <nav
    class="navbar has-shadow is-spaced is-warning"
    role="navigation"
    aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://github.com/orgs/progbase/teams/baboo-industry">
          <p class="title">Baboo Industry Team</p>
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

          <button
            v-if="!connected"
            class="button is-success"
            :class="{ 'is-loading': connecting }"
            @click="connect">
            Connect
          </button>

          <button
            v-if="connected"
            class="button is-danger"
            :class="{ 'is-loading': disconnecting }"
            @click="disconnect">
            Disconnect
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',

  data: () => ({
    connecting: false,
    disconnecting: false,
  }),

  computed: {
    connected() {
      return this.$store.state.connected;
    },
  },

  methods: {
    async connect() {
      this.connecting = true;
      console.log('Connecting to Arduino...');
      await this.$store.dispatch('connect');
      this.connecting = false;
    },

    async disconnect() {
      this.disconnecting = true;
      console.log('Disconnecting...');
      await this.$store.dispatch('disconnect');
      this.disconnecting = false;
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
