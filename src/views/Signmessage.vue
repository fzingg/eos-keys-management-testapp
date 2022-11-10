
<script lang="ts">

import { Form, Field, ErrorMessage } from 'vee-validate';

import { 
  get_Public_EncPrivate_KeysPair_fromStorage,  
  generateMessageSignature
   } from '@/mixins/crypto-utils';



export default {
  beforeMount() {
    this.updateGeneratedKeysPairList();
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data: () => ({
      
      encryptedMessageSignature: "The signature of the encrypted message will be displayed here",
      
      valid: true,
      inputmessage: '',
      inputmessageRules: [
        (v: any) => !!v || 'A message to be encrypted is required',
        (v: any) => (v && v.length <= 200) || 'Message must be less than 200 characters',
      ],
      pincode: '',
      pincodeRules: [
        (v: any) => !!v || 'A pin code is required',
        (v: any) => (v && v.length <= 10) || 'Pin code must be less than 10 characters',
      ],
      select: null,
      generatedpublickeys: [
        { publickey: 'key1', encryptedprivatekey: 'encryptedPrivateKey1' },
        { publickey: 'key2', encryptedprivatekey: 'encryptedPrivateKey2' },
        { publickey: 'key3', encryptedprivatekey: 'encryptedPrivateKey3' },
        { publickey: 'key4', encryptedprivatekey: 'encryptedPrivateKey4' },
        { publickey: 'key5', encryptedprivatekey: 'encryptedPrivateKey5' },
      ],
      
      
    }),

  methods: {

    async validate () {
        let form: any = this.$refs.form
        const { valid } = await form.validate()

        if (valid) {
          this.displaySignature(this.inputmessage, this.select, this.pincode)
         }
      },

    reset () {
      let form: any = this.$refs.form
      form.reset()
    },

    async displaySignature(inputmessage: string, encPrivateKey: string, pincode: string) {
      if (encPrivateKey != null) {
        this.encryptedMessageSignature = generateMessageSignature(inputmessage, encPrivateKey, pincode)
      } else {
        this.encryptedMessageSignature = "Private key selection problem occured."
      }
    },
    
    updateGeneratedKeysPairList() {
      const keysPairHash = get_Public_EncPrivate_KeysPair_fromStorage();
      for(let i=0; i<keysPairHash.length; i++) {
        this.generatedpublickeys[i]['publickey'] = keysPairHash[i]['publickey'] || "";
        this.generatedpublickeys[i]['encryptedprivatekey'] = keysPairHash[i]['encryptedprivatekey'] || "";
      }
    },
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
      label="Input message to be signed"
      required
    ></v-text-field>

    <v-select
      selectid="keys-pair-select"
      v-model="select"
      :items="generatedpublickeys"
      item-title="publickey"
      item-value="encryptedprivatekey"
      :rules="[v => !!v || 'Item is required']"
      label="Select a pubic key for signing message with corresponding Private key"
      required
    ></v-select>

    <v-text-field
      v-model="pincode"
      :counter="10"
      :rules="pincodeRules"
      label="Pin code for private key decryption"
      required
    ></v-text-field>

    <v-btn
      data-buttonid="encrypt-message"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Encrypt message
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>

    <div class="signature-title"><h2>Message signature :</h2></div>
    <div id="messageencrypted-signature">{{ encryptedMessageSignature }}</div>

    
  </v-form>


</template>




<style>

.signature-title{
  margin-top: 2em;
}

#messageencrypted-signature {
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

