<template>
  <v-container>
    <h2 class="text-center">CRUD</h2>
    <v-btn color="primary" style="width: 100%; margin: 1rem 0" @click="addUser"
      >Add User</v-btn
    >

    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="editUser(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteUser(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ formTitle }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="editedItem.name"
                label="Name"
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dialog: false,
      formTitle: 'Edit User',
      valid: false,
      editedItem: {
        id: null,
        name: '',
        email: '',
      },
      newUserName: '',
      newUserEmail: '',
    }
  },
  computed: {
    users() {
      return this.$store.state.users.users
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('users/getUsers')
    } catch (error) {
      console.error('Error fetching users in page:', error)
    }
  },
  methods: {
    editUser(item) {
      this.dialog = true
      this.formTitle = 'Edit User'
      this.editedItem = { ...item }
    },
    addUser() {
      this.dialog = true
      this.formTitle = 'Add User'
      this.editedItem = {
        id: null,
        name: '',
        email: '',
      }
    },
    async save() {
      try {
        // Add and Edit
        if (this.editedItem.id) {
          await this.$store.dispatch('users/editUser', this.editedItem)
        } else {
          const newUser = await this.$store.dispatch(
            'users/addUser',
            this.editedItem
          )
          console.log('New User Created:', newUser)
        }

        // reset
        this.dialog = false
        this.$refs.form.reset()

        // await this.$store.dispatch('users/getUsers')
      } catch (error) {
        console.error('Error saving user:', error)
      }
    },

    async deleteUser(user) {
      try {
        await this.$store.dispatch('users/deleteUser', user.id)

        console.log('User deleted', user)
      } catch (error) {
        console.error('Error deleting user', error)
      }
    },
    close() {
      this.dialog = false
      this.$refs.form.reset()
    },
  },
}
</script>
