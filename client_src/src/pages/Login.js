import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			"email": '',
			"password": '',
			accessToken: '',
		}
	}

  componentWillMount = () => {
    this.setState({ accessToken: cookie.load('access_token')})
  }	

  handleInputChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }	

  handleSubmit = (e) => {
		e.preventDefault()
	 	const url = "http://localhost:3000/api/Admins/login";
	 	const payload={
	 		"email": this.state.email,
	 		"password": this.state.password
	 	}
	 axios.post(url, payload)
	 	.then(res => {
			 console.log('got res: ', res)

			 if(res.status === 200){
 				console.log("Login successfull") 
 				this.onLogin(res.data.id)
 				return}

 			 if(res.status === 204) {
 			 	console.log("Username password do not match")
 				alert("username password do not match")
 				return}

			 	console.log("Username does not exists")
				alert("Username does not exist")
 	 })
 	 .catch(function (error) {
 		 console.log(error)
 	 })
 }

 onLogin = (accessToken) => {
  this.setState({ accessToken })
  cookie.save('access_token', accessToken, { path: '/' })
}


	render(){
		return (
		<div className="mui-container light">
			<h1>Login</h1>
			<small>Well... go ahead and login then.</small>
		
			<form className="mui-form">
			  <legend></legend>
			  <div className="mui-textfield">
			    <input name="email"
			    			 type="text" 
			    			 placeholder="email"
			    			 onChange={this.handleInputChange} />
			  </div>
			  <div className="mui-textfield">
			    <input name="password"
			    			 type="password" 
			    			 placeholder="password"
			    			 onChange={this.handleInputChange} />
			  </div>
			  <button type="submit" 
			  				className="mui-btn mui-btn--raised"
			  				onClick={this.handleSubmit}
			  >Submit</button>
		  </form>
		</div>)
	}
}

