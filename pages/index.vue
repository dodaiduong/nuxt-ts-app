<template>
  <div class="container flex-center has-text-centered">
    <div>
      <Logo />
      <h1 class="app-title">
        nuxt-ts-app
      </h1>
      <div class="login-form">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              v-model="email"
              @blur="validateEmail"
              :class="`input ${ emailError ? 'is-danger' : 'is-primary'} is-rounded is-hovered`" 
            />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="user"  style="font-size: 22px"/>
            </span>
            <span class="icon is-small is-right has-text-danger" v-if="emailError">
              <font-awesome-icon icon="ban" class="danger" style="font-size: 22px"/>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="password" type="password" class="input is-primary is-rounded is-hovered" />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="lock"  style="font-size: 22px"/>
            </span>
          </p>
        </div>
        <button class="button is-primary" @click="signInHandle">Log In</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'

const user = namespace('user')
@Component
export default class LogIn extends Vue {
  @user.Action
  public signIn!: (data: object) => void

  email: string = ''
  password: string = ''
  emailError: boolean = false
  $router: any
  
  signInHandle() {
    this.signIn({ email: this.email, password: this.password })
    this.$router.push({ path: '/user' });
  }
  validateEmail() {
    this.emailError = !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email));
  }
}
</script>

<style>
.app-title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.login-form {
  padding-top: 15px;
}
</style>
