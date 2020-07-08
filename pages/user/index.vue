<template>
  <div class="columns flex-center section">
    <div class="column is-one-quarter">
      <Menu />
    </div>
    <div class="column">
      <div class="container flex-center has-text-centered">
        <div class="tile is-ancestor">
          <article class="tile is-child box has-text-primary	">
              <p class="title has-text-primary">Personal Info</p>
              <p class="subtitle has-text-primary">
                Manage your personal info and contact information.
              </p>
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
                    <span v-if="!editOpen" class="input">
                      Display name:
                      <span class="column has-text-right">{{ displayName }}</span>
                    </span>
                    <input v-else v-model="newName" class="input is-primary is-hovered" />
                  </div>
                  <div class="control">
                    <button class="button is-primary" @click="editHandle" v-if="!editOpen">
                      <font-awesome-icon icon="edit" class="danger" style="font-size: 22px"/>
                    </button>
                    <button class="button is-primary" @click="updateName" v-else>Save</button>
                  </div>
                </div>
                <div class="columns is-mobile">
                  <div class="column has-text-left">
                    Email
                  </div>
                  <div class="column has-text-right">
                    {{email}}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'

const user = namespace('user')
@Component
export default class User extends Vue {
  @user.Getter
  public displayName!: string
  @user.Getter
  public email!: string
  @user.Action
  public changeDisplayName!: (name: string) => void

  editOpen: boolean = false
  newName: string = ''
  created() {
    this.newName = this.displayName
  }
  updateName() {
    this.changeDisplayName(this.newName)
    this.editOpen = false
  }
  editHandle() {
    this.editOpen = !this.editOpen
  }
}
</script>

<style lang="scss">
.radius-avatar {
  border-radius: 50%;
}

</style>
