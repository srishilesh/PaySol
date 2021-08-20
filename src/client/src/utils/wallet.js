import * as solanaWeb3 from '@solana/web3.js';
import * as bip32 from 'bip32'


  export async function generateMnemonicAndSeed() {
    const bip39 = await import("bip39");
    const mnemonic = bip39.generateMnemonic(256);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return { mnemonic, seed: Buffer.from(seed).toString("hex") };
  }


  export async function mnemonicToSeed(mnemonic) {
    const bip39 = await import("bip39");
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error("Invalid seed words");
    }
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return Buffer.from(seed).toString("hex");
  }
  
 export  const getAddressFromSeed =(seed) =>
 {
    var pk= bip32.fromSeed(Buffer.from(seed, 'hex')).derivePath("m/44'/501'/0'/0'").privateKey
    var address= solanaWeb3.Keypair.fromSeed(pk)
    return address
 }

  export  const getAccountInfo = async (pubKey)=>
  {
     
    var con = new solanaWeb3.Connection("https://api.devnet.solana.com/")
     var info = await  con.getBalance(pubKey)
    console.log(info)
    return info
  }


  export const Transaction = async ( from1 , to , amount , address)=>
  {
    var connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
    // Construct a `Keypair` from secret key
    var from =solanaWeb3.Keypair.fromSecretKey(address);
    // Generate a new random public key
   
    // Add transfer instruction to transaction
    var transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: amount * solanaWeb3.LAMPORTS_PER_SOL ,
        })
    );
    // Sign transaction, broadcast, and confirm
    var signature = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    );
    console.log("SIGNATURE", signature);
    console.log("SUCCESS");
    return signature
  }
