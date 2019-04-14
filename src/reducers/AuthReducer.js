const init = {
    id: '',
    name: '',
    email:'',
    age: ''

}

 export default (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state, id: action.payload.id, name: action.payload.name, email: action.payload.email, age: action.payload.age}
        case 'KEEP_LOGIN':
            return {...state, id: action.payload.id, name: action.payload.name, email: action.payload.email, age: action.payload.age}
        case 'LOGOUT_USER':
            return (state=init)

         default:
            return state
    }
} 