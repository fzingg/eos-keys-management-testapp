
<script lang="ts">

import { Form, Field, ErrorMessage } from 'vee-validate';


import { encryptData, 
  get_Public_EncPrivate_KeysPair_fromStorage, 
  saveDatatoStorage, 
  getDatafromStorage,
  generateUniqueKeysPair,
  generateKeysPairWithEncryption } from '@/mixins/crypto-utils';



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
      defaultNbKeys: 5,
      valid: true,
      pincode: '',
      pincodeRules: [
        (v: any) => !!v || 'A pin code is required',
        (v: any) => (v && v.length <= 10) || 'Pin code must be less than 10 characters',
      ],
      
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
          this.afterFormSubmitGenerateKeysPair(this.pincode);
        }
      },
    reset () {
      let form: any = this.$refs.form
      form.reset()
    },
    
    async afterFormSubmitGenerateKeysPair(pincode: string) {
      await generateKeysPairWithEncryption(this.defaultNbKeys, pincode);
      this.updateGeneratedKeysPairList();
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
  
  <div class="main-container">

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="pincode"
        :counter="10"
        :rules="pincodeRules"
        label="Pincode for encryption"
        required
      ></v-text-field>

    
      <v-btn
        data-buttonid="generatekeyspair"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Generate 5 new keys pair
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>

      
    </v-form>


    <v-card class="mx-auto pa-2" max-width="800">
      <v-list>
        <v-list-subheader>Generated public keys</v-list-subheader>

        <v-list-item
          v-for="(item, i) in generatedpublickeys"
          :key="i"
          :value="item"
          active-color="primary"
          rounded="xl"
        >
          <template v-slot:prepend>
            <v-icon color="orange-darken-2">mdi-key</v-icon>
          </template>

          <v-list-item-title v-text="item['publickey']"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>

  </div>

</template>




<style>

.main-container {
    margin-top: 3em;
  }


</style>

