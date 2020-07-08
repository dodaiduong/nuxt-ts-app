<template>
  <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><a>Dashboard</a></li>
    </ul>
    <p class="menu-label">
      Account
    </p>
    <ul class="menu-list">
      <li>
        <a>Manage Your Account</a>
        <ul>
          <li>
            <a
              @click="goUserPage"
              :class="`${getRouter == 'user' ? 'is-active' : ''}`"
            >
              Personal Info
            </a>
          </li>
          <li>
            <a
              @click="goChangePasswordPage"
              :class="`${getRouter == 'user-password' ? 'is-active' : ''}`"
            >
              Change Password
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Menu extends Vue {
  $router: any;
  $route: any;
  get getRouter(): string {
    return this.$route.name
  }
  goUserPage() {
    this.$router.push({ path: '/user' });
  }
  goChangePasswordPage() {
    this.$router.push({ path: '/user/password' });
  }
}
</script>
