import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import cookies from "universal-cookie";
import axios from "../config/axios";
import { connect } from "react-redux";
import swal from 'sweetalert';

import { onEdit, logout } from "../actions/index";

const cookie = new cookies();

class Profile extends Component {
  state = {
    edit: true
  };

  uploadAvatar = async () => {
    const formData = new FormData();
    var imagefile = this.gambar;

    formData.append("avatar", imagefile.files[0]);
    try {
      await axios.post(`/users/${cookie.get("idLogin")}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    } catch (e) {
      console.log("upload gagal");
    }
  };

  deleteAvatar = async userId => {
    try {
      axios.delete(`/users/${userId}/avatar`, {
        avatar: null
      });
    } catch (e) {
      console.log(e);
    }
  };

  profile = () => {
    const { name, age, id, email } = this.props.user;
    if (this.state.edit) {
      return (
        <div>
          <h3 class=" pl-0">{`Name: ${name}`}</h3>
          <h3 class=" pl-0">{`Age: ${age}`}</h3>
          <h3 class=" pl-0">{`Email: ${email}`}</h3>
          <div class=" px-0">
            <div class="d-flex ">
              <Button
                onClick={() => {
                  this.setState({ edit: !this.state.edit });
                }}
                color="outline-warning"
                className="mr-3"
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  this.deleteProfile(this.props.user.id);
                }}
                color="outline-danger"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.name = input;
            }}
            defaultValue={name}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="number"
            class="form-control"
            ref={input => {
              this.age = input;
            }}
            defaultValue={age}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.email = input;
            }}
            defaultValue={email}
          />
        </li>
        <li class="list-group-item px-0">
          <div class="d-flex justify-content-center">
            <Button
              onClick={() => {
                this.saveProfile(id);
              }}
              color="outline-primary"
            >
              save
            </Button>
          </div>
        </li>
      </div>
    );
  };

  deleteProfile = async userId => {
    try {
        const willDelete = await axios.delete(`/users/${userId}/delete`);
        
        if(willDelete) {
            swal("User Deleted!", "You clicked the button!", "success");
        }
        setTimeout(() => {
            this.props.logout();
        }, 2000);

    } catch (e) {
      console.log(e);
    }
  };

  saveProfile = async userId => {
    const name = this.name.value;
    const age = this.age.value;
    const email = this.email.value;
    this.props.onEdit(name, age, userId, email);
    this.setState({ edit: !this.state.edit });
  };

  render() {
    if (cookie.get("idLogin")) {
      return (
        <div className="container mt-5">
          <div >
            <img src={`http://localhost:2009/users/${cookie.get("idLogin")}/avatar`}
              
              alt="..."
            />

            <div >
              <div className="custom-file">
                <input
                  type="file"
                  id="myfile"
                  ref={input => (this.gambar = input)}
                />
              </div>
              <div class="d-flex">
              
                <Button color="primary" onClick={() => this.uploadAvatar()} className="mr-3">
                  Upload
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    this.deleteAvatar(this.props.user.id);
                  }}
                >
                  Delete
                </Button>
              </div>

              <ul class="list-group list-group-flush mt-3">{this.profile()}</ul>
            </div>
          </div>
        </div>
      );
    }

    return <Redirect to="login" />;
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(
  mapStateToProps,
  { onEdit, logout }
)(Profile);