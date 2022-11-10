
<script lang="ts">

import { Form, Field, ErrorMessage } from 'vee-validate';

import { 
  recoverPublickey
   } from '@/mixins/crypto-utils';



export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data: () => ({
      valid: true,
      inputmessage: '',
      inputmessageRules: [
        (v: any) => !!v || 'A input message is required',
        (v: any) => (v && v.length <= 200) || 'Message must be less than 200 characters',
      ],
      inputsignature: '',
      inputsignatureRules: [
        (v: any) => !!v || 'An input signature is required'
      ],
      recoveredpublickey: ''
    }),

  methods: {

    async validate () {
        let form: any = this.$refs.form
        const { valid } = await form.validate()

        if (valid) {
          this.recover(this.inputsignature, this.inputmessage)
        }
      },

    reset () {
      let form: any = this.$refs.form
      form.reset()
    },
    
    async recover(inputsignature: string, inputmessage: string) {
      try {
        const eccMigrationKPub = recoverPublickey(inputsignature, inputmessage);
        this.recoveredpublickey = eccMigrationKPub;
      } catch (error) {
        this.recoveredpublickey = "Signature checksum doesn't match "
      }
    }
  }
}
</script>


<template>
  

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="inputmessage"
      :counter="200"
      :rules="inputmessageRules"
      label="Paste message previously encrypted"
      required
    ></v-text-field>

    
    <v-text-field
      v-model="inputsignature"
      :rules="inputsignatureRules"
      label="Paste signature of the corresponding message"
      required
    ></v-text-field>

    <v-btn
      data-buttonid="recover-publickey"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Recover public key
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>

    <div class="signature-title"><h2>Recovered Public Key :</h2></div>
    <div id="recovered-publickey">{{ recoveredpublickey }}</div>

    
  </v-form>


</template>




<style>

.signature-title{
  margin-top: 2em;
}

#recovered-publickey {
  background-color: rgb(215, 202, 228);
  border: 1px solid #cccccc;
  border-radius: 4px;
  margin: 1em 0;
  padding: 2em 2em;
  font-size: 14px;
}

.container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background-color: rgb(133, 118, 148);
  }

@media (min-width: 1024px) {
  .container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background-color: blueviolet;
  }
}
</style>

