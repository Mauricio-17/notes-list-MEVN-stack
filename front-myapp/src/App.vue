<template>
  <v-app>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="275"
      > 
        <v-card>
            <v-container>
                <v-row justify="center">
                    <v-col>
                        <h1>
                            <span class="mr-2 text-primary">¿Desea cerrar sesión?</span>
                        </h1>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="4">
                        <v-btn
                        color="warning"
                        @click="dialog = false"
                        >
                            NO
                        </v-btn>
                    </v-col>
                    <v-col cols="4">
                        <v-btn 
                        color="primary"
                        @click="exit"
                        >
                            SI
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
      </v-dialog>

    <v-navigation-drawer
        v-if="isLogged"
        v-model="drawer"
        class="d-sm-none"
        width="210"
        color="blue lighten-3"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            active-class="deep-purple--text text--accent-6"
          >
            <v-list-item to="/">
              <v-list-item-title>
                  INICIO
              </v-list-item-title>
            </v-list-item>

            <v-list-item to="/notes">
              <v-list-item-title>
                  NOTES
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>
                <v-btn
                @click="dialog = true"
                color="blue lighten-3">
                  CERRAR SESIÓN
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <div class="d-none d-sm-block">
        <router-link to="/">
        <v-btn
        text>
          <span class="mr-2">Inicio</span>
        </v-btn>
        </router-link>

        <router-link to="/notes" v-if="isLogged">
          <v-btn
          text>
            <span class="mr-2">Notes</span>
          </v-btn>
        </router-link>
        
        <v-btn @click="dialog = true" v-if="isLogged"
        text>
          <span class="mr-2">Cerrar Sesión</span>
        </v-btn>
      </div>

      <router-link to="/login" v-if="!isLogged">
        <v-btn
        text>
          <span class="mr-2">Ingresar</span>
        </v-btn>
      </router-link>
      <router-link to="/signUp" v-if="!isLogged">
        <v-btn
        text>
          <span class="mr-2">Registrarse</span>
        </v-btn>
      </router-link>

      <v-app-bar-nav-icon 
      @click.stop="drawer = !drawer"
      class="d-sm-none"
      v-if="isLogged"
      ></v-app-bar-nav-icon>
      <!-- 
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      --->
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',

  data: () => ({
    //
    drawer: false,
    dialog: false
  }),
  computed:{
    ...mapGetters(['isLogged'])
  },
  methods:{
    ...mapActions(['logOut','readToken']),
    exit: function(){
      this.dialog = false;
      this.logOut()
    }
  },
  created(){
    this.readToken()
  }
};
</script>