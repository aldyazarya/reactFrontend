const init = {
    id: "",
    name: "",
    age: "",
    email: ""
  };
  
  export default (state = init, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
          ...state,
          id: action.payload.id,
          name: action.payload.name,
          age: action.payload.age,
          email: action.payload.email
        };
      case "KEEP_LOGIN":
        return {
          ...state,
          id: action.payload.id,
          name: action.payload.name,
          age: action.payload.age,
          email: action.payload.email
        };
      case "EDIT_SUCCESS":
        return {
          ...state,
          id: action.payload.id,
          name: action.payload.name,
          age: action.payload.age,
          email: action.payload.email
        };
      case "LOGOUT":
        return state = init
  
      default:
        return state;
    }
  };