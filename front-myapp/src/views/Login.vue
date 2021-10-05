<template>
    <v-container>
        <v-row>
            <v-col>
                <h2 class="text-center text-primary fw-bold">
                    Login
                </h2>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" sm="6" 
            v-if="message.visible">
                <v-alert
                dense
                :type="message.color"
                >
                    {{ message.text }}
                </v-alert>
            </v-col>
            <v-col cols="12">
                <v-form
                @submit.prevent="login"
                lazy-validation
                ref="form"
                >
                    <v-row justify="center">
                        <v-col cols="12" sm="9" md="6">
                            <v-text-field
                            v-model="user.email"
                            :rules="[
                                v => !!v || 'E-mail is required',
                                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                            ]"
                            label="Email"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="12" sm="9" md="6">
                            <v-text-field
                            v-model="user.password"
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            name="input-10-1"
                            :rules="[
                                v => !!v || 'Contraseña requerida'
                            ]"
                            label="Password"
                            @click:append="show = !show"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-row justify="center">
                        <v-col cols="9" sm="6">
                            <v-btn
                            class="w-100"
                            type="submit"
                            color="primary"
                            >
                            Submit
                            </v-btn>
                        </v-col>
                    </v-row>
                    
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions} from 'vuex'
export default {
    data() {
        return {
            show: false,
            message:{ text: "", color: "success", visible: false},
            user: {
                email: "",
                password: ""
            },
            error:{}
        }
    },
    methods:{
        ...mapActions(['saveUser']),
        login: async function(){
            //console.log(this.user)
            if(this.$refs.form.validate()){
                try {
                    const res = await this.axios.post('/login', this.user)
                    const token = res.data.token
                    this.saveUser(token)
                    this.$router.push({name: 'Notes'})
                } catch (error) {
                    console.log(error.response.data.message)
                    this.showAlert(error.response.data.message, 'error')
                }
            }
        },
        showAlert: function(text, color){
            this.message.text = text
            this.message.color = color
            this.message.visible = true
            setTimeout(()=>{
                this.message.visible = false
            }, 3000)
        }
    }
}
</script>
