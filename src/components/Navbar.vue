<template>
  <div id="nav">
    <nav class="navbar is-warning">
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="https://github.com/orgs/progbase/teams/baboo-industry">
          <h1>
            Baboo Industry team
          </h1>
        </a>
      </div>

      <div
        class="navbar-menu">
        <div class="navbar-start">
          <router-link
            class="navbar-item"
            to="/">
            Home
          </router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-success" @click="connect">
                  <span class="icon">
                    <i class="fas fa-ok" />
                  </span>
                  <span>Connect</span>
                </a>
              </p>

              <p class="control">
                <a class="button is-danger" @click="disconnect">
                  <span class="icon">
                    <i class="fas fa-close" />
                  </span>
                  <span>Disconnect</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
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


<style lang="postcss">

</style>
