<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
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
            <input v-model="passWord" type="password" class="input is-primary is-rounded is-hovered" />
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
import { Component, Vue } from 'nuxt-property-decorator'
import { passwordStrength } from '../lib/ultil'

@Component
export default class LogIn extends Vue {
  email: string = ''
  passWord: string = ''
  passErrors: boolean = false
  emailError: boolean = false
  $router: any
  get newPasswordStrength(): string {
    return passwordStrength(this.passWord);
  }
  onNewPasswordBlur() {
    if (this.newPasswordStrength !== 'weak') {
      this.passErrors = false;
    } else {
      this.passErrors = true;
    }
  }
  signInHandle() {
    if(this.email !== '' && this.passWord !== '') {
      this.$router.push({ path: '/users/1' });
    }
  }
  validateEmail() {
    this.emailError = !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email));
  }
}
</script>

<style>
.title {
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

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.login-form {
  padding-top: 15px;
}
</style>
