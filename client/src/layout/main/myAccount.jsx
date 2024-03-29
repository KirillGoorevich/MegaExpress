import React from "react";
import { Navigate } from "react-router-dom";
import { Component } from "react";
import PageHeader from "../common/pageHeader";
import { changeProfilePic, curUserInfo, getProfilePic } from "../../services/userService";
import { toast } from "react-toastify";

class MyAccount extends Component {
  state = {
    user: "",
    isMount: false,
    formData: "",
    profilePicUrl: "",
  };

  async componentDidMount() {
    try {
      const {data: user} = await curUserInfo();
      const blob = await getProfilePic(user._id);
      const defaultUserImageUrl = "data:image/png;base64,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";
      let profilePicUrl = "";
      if(!blob.data){
        profilePicUrl = defaultUserImageUrl;
      }
      else{
        profilePicUrl = "data:image/png;base64,"+blob.data;
      }
      this.setState({ user,isMount: true, profilePicUrl });
    } catch (error) {
      console.log(error.message);
    }
  }

  onChange(e){
    let files = e.target.files;
    let reader= new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload=(e)=>{
    const formData = {file: e.target.result}
    this.setState({formData})
    }
  }

  doSubmit = async () => {
    try {
      const formData = this.state.formData;
      if(!formData){
        toast.error("No file is chosen!",{
          autoClose: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      await changeProfilePic(formData);
      toast.success("Your changed your profile pic");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const loggedUser = this.props.user;
    if (!loggedUser) return <Navigate replace to="/" />;
    const user = this.state.user;

    const { isMount} = this.state;
    if (!isMount) return null;
    

    return (
        <React.Fragment>
        <PageHeader
          title={"Welcome Back, "+user.name}
          subTitle="Here you can View Your Account"
        />
        <div style={{display: "flex"}}>
          <div className="col-xl-2"></div>
          <img className="img-fluid" src={this.state.profilePicUrl} 
      alt={"profile pic"} style={{width: "250px"}}/>
          <div className="col-12 col-md-10 col-xl-7 border p-2 bg-white" style={{diplay: "inline"}}>
            
              <p>{user.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              {user.isAdmin && <p>Admin Privileges</p>}
              {user.biz && <p>Buisness Privileges</p>}
              <label htmlFor="file">Profile Picture</label><br/>
              <input type="file" name="file" onChange={(e)=>this.onChange(e)}/>
              <button className="btn btn-primary" onClick={this.doSubmit}>Change Profile Picture</button>
          </div>
        </div>
        
      </React.Fragment>
    );
  }
}

export default MyAccount;
