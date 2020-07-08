<template>
  <div class="columns flex-center section">
    <div class="column is-one-quarter">
      <Menu />
    </div>
    <div class="column">
      <div class="container flex-center has-text-centered">
        <div class="tile is-ancestor">
          <article class="tile is-child box has-text-primary">
            <p class="title has-text-primary">Change password</p>
            <p class="subtitle has-text-primary">
              Change your account password. You should keep a strong password to prevent unauthorized access to your account. Current Password
            </p>
            <div class="columns is-multiline is-centered is-mobile">
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
                    @blur="validatePassword"
                    :class="`input ${ newPasswordError ? 'is-danger' : 'is-primary'} is-hovered`"
                    type="password"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="key"  style="font-size: 22px"/>
                  </span>
                  <span class="icon is-small is-right has-text-danger" v-if="newPasswordError">
                    <font-awesome-icon icon="ban" class="danger" style="font-size: 22px"/>
                  </span>
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
              </div>
            </div>
            <button class="button is-primary" @click="submit">Change Password</button>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { passwordStrength } from '../../lib/ultil'

const user = namespace('user')
@Component
export default class ChangePassword extends Vue {
  @user.Action
  public changePassword!: (data: object) => void

  currentPassword: string = ""
  newPassword: string = ""
  confirmPassword: string = ""

  newPasswordError: boolean = false
  confirmError: boolean = false
  validatePassword(){
    this.newPasswordError = passwordStrength(this.newPassword);
  }
  validateConfirm() {
    this.confirmError = !(this.newPassword == this.confirmPassword)
  }
  submit() {
    if (!this.newPasswordError && !this.confirmError) {
      this.changePassword({currentPass: this.currentPassword, newPass:this.newPassword})
    }
  }
}
</script>
