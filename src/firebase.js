
import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_PROJECT_ID}.appspot.com`
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

    isAuthorized() {
        const user = this.auth.currentUser;
        return user !== null;
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.auth.signOut();
    }

    add(bookData) {
        return this.get().set({
            list: bookData
        });
    }

    userId() {
        return this.auth.currentUser.uid;
    }

    get() {
        return this.db.ref('/data/' + this.userId());
    }

    init() {
        var newPostKey = this.db.ref().child('data').push().key;
        console.log()
    }

    init1() {
        const userId = this.auth.currentUser.uid;
        return this.db.ref('/data/' + userId).set({
             list: []
        });
    }
}

export default new Firebase;







