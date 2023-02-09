// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBRf8lnDbDytYgXbw3_8gn17UsDRxEWty4",
    authDomain: "qpack-9c1f6.firebaseapp.com",
    databaseURL: "https://qpack-9c1f6-default-rtdb.firebaseio.com",
    projectId: "qpack-9c1f6",
    storageBucket: "qpack-9c1f6.appspot.com",
    messagingSenderId: "712118888330",
    appId: "1:712118888330:web:d718fb93c08fd0e4cbca73",
    measurementId: "G-HD8KDMR1QT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase();
let id = ''
let idRec = ''
const db = getDatabase();
const go_12 = document.getElementById('goShow')
let btn_go = document.getElementById('go')
let email = document.getElementById('email')
let pass = document.getElementById('pass')
let name = document.getElementById('name')
let test = document.getElementById('test')
let google = document.getElementById('google')
let sDiv = document.getElementById('showId')
let sText = document.getElementById('showText')
let sBtn = document.getElementById('goShow')
let admin = document.getElementById('admin')
btn_go.addEventListener('click' , ()=>{
    console.log("click")
    createUserWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            if(user){
                let uid = user.uid;
                let idRec = uid[1] + uid[2] + uid[3] + uid[4]
                const postListRef = ref(db, 'user/' + idRec);
                const newPostRef = (postListRef);
                set(newPostRef, {
                    mail:email.value,
                    name:name.value,
                    password:pass.value,
                    type:'email , password'
                    // ...
                });


                sText.textContent ='your id is {' + idRec + '} this will be used all across the website and to access your account'
                sDiv.style.display=''


            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
})

google.addEventListener('click' , ()=>{
    console.log('click google')
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            if(user){
                let uid = user.uid;
                idRec = uid[1] + uid[2] + uid[3] + uid[4]
                console.log(user)
                const postListRef = ref(db, 'user/' + idRec);
                const newPostRef = (postListRef);
                set(newPostRef, {
                    mail:user.email,
                    name:user.displayName,
                    type:'google'
                    // ...
                });
                sText.textContent ='your id is {' + idRec + '} this will be used all across the website and to access your account'
                sDiv.style.display=''



            }

            // ...
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });

})
sBtn.addEventListener('click' , ()=>{

    window.location.href='http://localhost:63342/Qpack/modules/images/games.html?_ijt=qh3po5biel2mcd44srsmumt81u&_ij_reload=RELOAD_ON_SAVE'

})