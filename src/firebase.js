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

    state() {
        return this.db.ref('/users');
    }
}

export default new Firebase();







