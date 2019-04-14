import axios from '../config/axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies()

export const onRegister = (name, age, email, password) => {
     return () => {
         axios.post('/users', {
             name, age, email, password
         }).then(res => {
             console.log("Register successful");

         }).catch(e => {
             console.log(e.response.data);
         })
     }
 }

export const onLoginClick = (email, password) => {
    return async dispatch => {
        try {
            const res = await axios.post('/users/login', { email, password })
            console.log(res);

            cookie.set('masihLogin', res.data.name, { path: '/' })
            cookie.set('idLogin', res.data._id, { path: '/' })
            cookie.set('email', res.data.email, { path: '/' })
            cookie.set('age', res.data.age, { path: '/' })


            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    id: res.data._id, name: res.data.name, email: res.data.email, age: res.data.age
                }
            })

        } catch (e) {
            console.log(e);

        }
    }
}

export const keepLogin = (name, id, email, age) => {
    if(name === undefined && id === undefined && email === undefined && age === undefined){
        return{
            type: 'KEEP_LOGIN',
            payload: {
                id: '',
                name: '',
                email:'',
                age: ''
            }
        } 
    }return{
        type: 'KEEP_LOGIN',
        payload: {
            id, 
            name,
            email,
            age
        }
    }
}

export const onLogoutUser = (name, id) => {
    cookie.remove('masihLogin')
    cookie.remove('idLogin')
    cookie.remove('email')
    cookie.remove('age')
    return {type: 'LOGOUT_USER'}
}
