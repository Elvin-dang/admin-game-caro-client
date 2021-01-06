import { BehaviorSubject } from 'rxjs';

import config from '../Helpers/Config.json';
import  handleResponse  from '../Helpers/Handle_Reponse';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "email":email, "password":password })
    };
    
    //return fetch(`${config.apiTestLocal}` +"api/admin/signin", requestOptions)
    return fetch(`${config.apiHosting}` +"api/admin/signin", requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

export default authenticationService;