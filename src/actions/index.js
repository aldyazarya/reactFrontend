import axios from '../config/axios';
import cookies from 'universal-cookie';

const cookie = new cookies()


export const onRegister = (name, age, email,password) => {
    return dispatch => {
        axios.post('/users', {
            name, age, email, password
        }). then (res => {
            console.log("Register Success");
        }).catch (e => {
            console.log(e);
            
        })
    }
}

//untuk penggunaan axios.get
// export const onLogin = (email, password) => {
//     return dispatch => {
//         axios.get('/users', {
//             params: {
//             email, password
//             }
//         }). then (res => {
//             if (res.data.length === 0) {
//                 return console.log("Login Failed");
                
//             }
//             console.log("Login Success");
//             console.log(res.data);
            
//         }). catch ( e => {
//             console.log(e);
            
//         })
//     }
// }

//untuk penggunaan axios.post
export const onLogin = (email, password) => {
    return async dispatch => {
        try {
            const res = await axios.post('/users/login', {email, password})
            console.log(res);
            
            cookie.set('masihLogin', res.data.name, {path:'/'})
            cookie.set('idLogin', res.data._id, {path:'/'})

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    id: res.data._id , name: res.data.name
                }
            })
            
        } catch (e) {
            console.log(e);
            
        }
    }
}

