<template>
  <div class="container flex-center has-text-centered">
    <div>
      <Logo />
      <h1 class="app-title">
        nuxt-ts-app
      </h1>
      <div class="login-form" v-if="!signUpFormShow">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              v-model="emailValue"
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
        <button class="button is-primary" @click="signUpHandle">Sign Up</button>
      </div>
      <div class="tile is-ancestor" v-else>
        <article class="tile is-child box has-text-primary has-text-right">
          <button class="delete"></button>
          <div class="has-text-centered section">
            <p class="title has-text-primary">Personal Info</p>
            <p class="subtitle has-text-primary">
              Manage your personal info and contact information.
            </p>
          </div>
          <div class="columns is-multiline is-centered is-mobile">
            <v-gravatar
              :email="email"
              alt="Nobody" :size="200"
              default-img="mm"
              class="radius-avatar"
            />
            <div class="column is-mobile is-full">
              Welcome {{ displayName }}
              <div class="field is-full has-addons" >
                <div class="control is-expanded">
                  <span v-if="!editNameOpen" class="input">
                    <span>{{ displayName }}</span>
                  </span>
                  <input v-else placeholder="Display name" v-model="newName" class="input is-primary is-hovered" />
                </div>
                <div class="control">
                  <button
                    class="button is-primary"
                    @click="() => editNameOpen = true"
                    v-if="!editNameOpen"
                  >
                    <font-awesome-icon icon="edit" class="danger" style="font-size: 22px"/>
                  </button>
                  <button class="button is-primary" @click="updateName" v-else>Save</button>
                </div>
              </div>
              <div class="field is-full has-addons" >
                <div class="control is-expanded">
                  <span v-if="!editEmailOpen" class="input">
                    <span>{{email}}</span>
                  </span>
                  <input v-else placeholder="Email" v-model="emailValue" class="input is-primary is-hovered" />
                </div>
                <div class="control">
                  <button
                    class="button is-primary"
                    @click="() => editEmailOpen = true"
                    v-if="!editEmailOpen"
                  >
                    <font-awesome-icon icon="edit" class="danger" style="font-size: 22px"/>
                  </button>
                  <button class="button is-primary" @click="updateEmail" v-else>Save</button>
                </div>
              </div>
            </div>
            <button
              class="button is-primary"
              @click="() => changePasswordOpen = true"
              v-if="!changePasswordOpen"
            >
              Change password
            </button>
            <div class="columns is-multiline is-centered is-mobile" v-else>
              <div class="field column has-text-left" >
                Current Password
                <p class="control has-icons-left has-icons-right is-expanded">
                  <input
                    v-model="currentPassword"
                    class="input is-primary is-hovered"
                    type="password"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="key"  style="font-size: 22px"/>
                  </span>
                </p>
                New Password
                <p class="control has-icons-left has-icons-right is-expanded">
                  <input
                    v-model="newPassword"
                    @keyup="validatePassword"
                    :class="`input ${ newPasswordError < 51 ? 'is-danger' : 'is-primary'} is-hovered`"
                    type="password"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="key"  style="font-size: 22px"/>
                  </span>
                  <span class="icon is-small is-right has-text-danger" v-if="newPasswordError < 51">
                    <font-awesome-icon icon="ban" class="danger" style="font-size: 22px"/>
                  </span>
                </p>
                <p>
                  <progress
                    :class="`progress ${newPasswordError < 51 ? 'is-danger' : 'is-primary'}`"
                    :value="newPasswordError" max="100"/>
                  </p>
                Confirm Password
                <p class="control has-icons-left has-icons-right is-expanded">
                  <input
                    v-model="confirmPassword"
                    @blur="validateConfirm"
                    :class="`input ${ confirmError ? 'is-danger' : 'is-primary'} is-hovered`"
                    type="password"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="key" style="font-size: 22px"/>
                  </span>
                  <span class="icon is-small is-right has-text-danger" v-if="confirmError">
                    <font-awesome-icon icon="ban" class="danger" style="font-size: 22px"/>
                  </span>
                </p>
                <br/>
                <p class="has-text-centered">
                  <button class="button is-primary" @click="updatePassword">Change Password</button>
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { passwordStrength } from '../lib/ultil'

const user = namespace('user')
@Component
export default class LogIn extends Vue {
  @user.Getter
  public displayName!: string
  @user.Getter
  public email!: string
  @user.Action
  public changeDisplayName!: (name: string) => void
  @user.Action
  public changeEmail!: (email: string) => void
  @user.Action
  public signIn!: (data: object) => void
  @user.Action
  public changePassword!: (data: object) => void

  emailValue: string = ''
  password: string = ''
  emailError: boolean = false
  signUpFormShow: boolean = false
  editNameOpen: boolean = false
  editEmailOpen: boolean = false
  newName: string = ''

  currentPassword: string = ""
  newPassword: string = ""
  confirmPassword: string = ""
  newPasswordError: number = 0
  confirmError: boolean = false
  changePasswordOpen: boolean = false
  $router: any
  
  signInHandle() {
    this.signIn({ email: this.email, password: this.password })
    this.$router.push({ path: '/user' });
  }
  validateEmail() {
    this.emailError = !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email));
  }
  validatePassword(){
    this.newPasswordError = passwordStrength(this.newPassword);
  }
  validateConfirm() {
    this.confirmError = !(this.newPassword == this.confirmPassword)
  }
  signUpHandle() {
    this.signUpFormShow = true
  }
  created() {
    this.newName = this.displayName
  }
  updateName() {
    this.changeDisplayName(this.newName)
    this.editNameOpen = false
  }
  updateEmail() {
    this.changeEmail(this.emailValue)
    this.editEmailOpen = false
  }
  updatePassword() {
    if (!this.newPasswordError && !this.confirmError) {
      this.changePassword({currentPass: this.currentPassword, newPass:this.newPassword})
      this.changePasswordOpen = false
    }
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
.radius-avatar {
  border-radius: 50%;
}
</style>
