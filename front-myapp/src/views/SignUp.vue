<template>
    <v-container>
        <v-row>
            <v-col>
                <h2 class="text-center text-primary fw-bold">
                    Registro
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
                @submit.prevent="createUser"
                lazy-validation
                ref="form"
                >
                    <v-row justify="center">
                        <v-col cols="12" sm="9" md="6">
                            <v-text-field
                            v-model="user.name"
                            :rules="[
                                v => !!v || 'Nombre requerido',
                            ]"
                            label="Nombre"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="12" sm="9" md="6">
                            <v-text-field
                            v-model="user.email"
                            :rules="[
                                v => !!v || 'Email requerido',
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
                                v => !!v || 'Contraseña requerida',
                                v => (v && v.length >= 6) || 'Tiene que ser mayor igual a 6 carácteres',
                            ]"
                            label="Contraseña"
                            @click:append="show = !show"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="12" sm="9" md="6">
                            <v-text-field
                            v-model="psw2"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            name="input-10-1"
                            :rules="[
                                v => !!v || 'Contraseña requerida',
                            ]"
                            label="Repita la contraseña"
                            @click:append="show2 = !show2"
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
export default {
    data() {
        return {
            show: false,
            show2: false,
            message:{ text: "", color: "success", visible: false},
            
            user: {
                name: '',
                email: '',
                password: '',
            },
            psw2: '',
            error:{
                'User validation failed: email: Error, expected email to be unique': 'El usuario ya existe'
            }
        }
    },
    computed: {

    },
    methods: {
        createUser: async function(){
            if(this.$refs.form.validate()){
                if(this.user.password === this.psw2){
                    try {
                        const res = await this.axios.post('/new-user', this.user)
                        console.log(res.data)
                    } catch (error) {
                        console.log(error.response.data.error.message)
                        this.showAlert(this.error[error.response.data.error.message],'error')
                    }
                }else{
                    this.showAlert('Contraseñas diferentes', 'error')
                }
            }
        },
        showAlert: function(text, color){
            this.message.text = text
            this.message.color = color
            this.message.visible = true
            setTimeout(()=>{
                this.message.visible = false
            }, 2500)
        }
    }
}
</script>