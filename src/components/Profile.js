import React, { Component } from 'react'
import {Button} from 'reactstrap';
import {connect} from 'react-redux'

import axios from '../config/axios'

import Cookies from 'universal-cookie';


const cookie = new Cookies()


class Profile extends Component {
    state = {
        users: []
    }
    
    getName = async () => {
        try {
            const res = await axios.get(`/users/${cookie.get('idLogin')}`)
            this.setState({users: res.data})
            console.log(res);
            
        } catch (e) {
            console.log(e);  
        }
    }

    componentDidMount () {
        this.getName()
    }

    renderList = () => {
        return this.state.users.map (user => {
            return (
                <h1>{user.name}</h1>
            )
        })
    }


    avatarUpload = async (userid) => {
        const formData = new FormData()
        var imagefile = this.gambar
        formData.append('avatar', imagefile.files[0])
        try {
            await axios.post(`/users/${userid}/avatar`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            console.log("berhasil upload file");
            
        } catch (e) {
            console.log(e);
            
        }
    }

    avatarDeleted = async (userid) => {
        try {
            await axios.delete(`/users/${userid}/avatar`)
            console.log("berhasil delete");
            
        } catch (e) {
            console.log(e);
            
        }
    }

    UserDeleted = async (userid) => {
        try {
            await axios.delete(`/users/${userid}`)
            console.log("berhasil delete user");
            
            cookie.remove('masihLogin')
            cookie.remove('idLogin')
            cookie.remove('email')
            cookie.remove('age')
        } catch (e) {
            console.log(e);
        
        }
    }
    
    render() {
        if(cookie.get('idLogin')){
            return (
                <div className="container">
                    <img alt="img" src={`http://localhost:2009/users/${this.props.id}/avatar`}/>
                    <br/>
                    <br/>
                    <div className="custom-file">
                        <input type="file" id="myfile" ref={input => this.gambar = input}/>
                    </div>
                    <Button color="primary" onClick={() => this.avatarUpload(this.props.id)}>Upload</Button>
                    <Button color="danger" onClick={() => this.avatarDeleted(this.props.id)}>Delete</Button>
                    <hr/>
                    <h1>name:</h1>
                    <div>{this.renderList()}</div>
                    {/* <h1>email:</h1>
                    <h3> {this.props.email}</h3>
                    <h1>age:</h1>
                    <h3>{this.props.age}</h3>  */}
                    
                    <Button color="warning" onClick={() => this.UserDeleted(this.props.id)}>Delete User</Button>
    
                </div>
            )
        }
    }
}

const mps = state => {
    return {
      id: state.auth.id,
      name: state.auth.name,
      email: state.auth.email,
      age: state.auth.age
     
    };
  };
export default connect(mps)(Profile)
