import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios'
class Login extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state={
      id: '',
      username: '',
      password:'',
      role:-1,
      
    }
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  onChangeUsername(e){
       this.setState({
         username: e.target.value
       })
  }
  onChangePassword(e){
      this.setState({
        password:e.target.value
      })
  }
  componentDidMount(){
      this._isMounted = true;
  }
  componentWillUnmount(){
     this._isMounted= false;
  }
  onSubmit(e){
    e.preventDefault();
    const newLogin = {
        username: this.state.username,
        password: this.state.password
    }
    
    axios.post('http://localhost:4000/textAnnotation/user/login/',newLogin)
         .then(res=>{
              if(res.data){
                       
                        this.props.onUserChange(res.data);
                        console.log(res.data.username);
                        this.props.history.push('/');
              }
              else {
                 console.log('Invalid');
                 document.getElementById('error').style.display='block';
                 this.setState({
                    username:'',
                    password:''
                 })
              }
         })
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <p  id="error" style={{color:'red',display:'none'}}>
                         Invalid username or password,please try again
                    </p>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                               placeholder="Username" 
                               autoComplete="username" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" 
                        placeholder="Password" 
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.onChangePassword}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" >Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
