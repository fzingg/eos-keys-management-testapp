import { ecc as eccMigration } from 'eosjs/dist/eosjs-ecc-migration';
import CryptoJS from "crypto-js";
import AES from 'crypto-js/aes'
import ENC from 'crypto-js/enc-utf8'


/**
 * Encrypt string using AES standard
 * secret string is provided to encrypt 
 * @param data 
 * @param secret 
 * @returns encrypted data
 *
 */

export const encryptData = (data: string, secret: string) => {
  const stringifiedData = JSON.stringify(data);
  const encryptedData = AES.encrypt(stringifiedData, secret);
  return encryptedData.toString();
}



/**
 * Decrypt string using AES standard
 * secret string used for encrypted cypherdata must be provided
 * @param cypherdata 
 * @param secret 
 * @returns 
 */

export const decryptData = (cypherdata: string, secret: string) => {
  var decryptedData  = AES.decrypt(cypherdata, secret).toString(ENC);
  
  try {
    return JSON.parse(decryptedData)
  } catch (error) {
    return null
  }
}



/**
 * Save public key and encrypted private key pair to localstorage
 * @param publickey 
 * @param encryptedprivatekey 
 */

export function saveDatatoStorage(publickey: string, encryptedprivatekey: string) {
  localStorage.setItem(publickey, encryptedprivatekey);
}




/**
 * Get Encrypted Private key from localStorage associated to publickey 
 * @param publickey 
 * @returns 
 * Encrypted private key
 */

export const getDatafromStorage = (publickey: string) => {
  return localStorage.getItem(publickey) || "NoKey";
}




/**
 * Generate a random Private key and Public Key pair
 * Private key is encrypted with a secret
 * @param secret
 * @returns 
 * [publicKey, encryptedPrivatekey]
 */

export async function generateUniqueKeysPair(secret: string) {
  let privateKey = await eccMigration.randomKey(0, {secureEnv: true}); 
  const publicKey = eccMigration.privateToPublic(privateKey, 'EOS');
  const encryptedPrivatekey = encryptData(privateKey, secret);
  privateKey = ""
  return [publicKey, encryptedPrivatekey];
}

/**
 * Generates N (nbKeys) Public / Encrypted Private keys pair
 * and save to localStorage
 * @param nbKeys: number 
 * @param secret: string 
 */

export async function generateKeysPairWithEncryption(nbKeys: number, secret: string) {
  localStorage.clear();
  for (var i = 0; i < nbKeys; i++) {
    const keyPair = await generateUniqueKeysPair(secret);
    saveDatatoStorage(keyPair[0], keyPair[1])
  }
}



/**
 * Get Public Keys / Encrypted Private keys list from localStorage
 * @returns 
 * Hash strucure:
 *  [
      { publickey: 'key1', encryptedprivatekey: 'encPrivKey1' },
      { publickey: 'key2', encryptedprivatekey: 'encPrivKey2' },
      { publickey: 'key3', encryptedprivatekey: 'encPrivKey3' },
      { publickey: 'key4', encryptedprivatekey: 'encPrivKey4' },
      { publickey: 'key5', encryptedprivatekey: 'encPrivKey5' },
    ]
 */

export function get_Public_EncPrivate_KeysPair_fromStorage() {
  let keysPairHash: Array<{publickey: string | null, encryptedprivatekey: string}> = [];
  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i) || "";
    const encryptedPrivateKey = getDatafromStorage(key);
    keysPairHash.push({publickey: key, encryptedprivatekey: encryptedPrivateKey});
  }
  return keysPairHash;
}




/**
 * Sign a message given an encrypted Private key and the secret used for encrypted it
 * @param inputMessage 
 * @param encPrivateKey 
 * @param secret 
 * @returns 
 * The signature of the encrypted message
 */

export const generateMessageSignature = (inputMessage: string, encPrivateKey: string, secret: string) => {
  let decPrivateKey = decryptData(encPrivateKey, secret);
  if (decPrivateKey == null) return "! pin code is not correct !" 
  const eccMigrationSig = eccMigration.sign(inputMessage, decPrivateKey, 'utf8');
  decPrivateKey = ""
  return eccMigrationSig;
}



/**
 * Recover a Public key given a signature and the message previously signed with the associated Private key
 * @param signature 
 * @param message 
 * @returns 
 * The public key
 */

export const recoverPublickey = (signature: string, message: string) => {
  return eccMigration.recover(signature, message, 'utf8');
}