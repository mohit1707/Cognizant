import react, { useState } from 'react';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  var validate = async function (event) {
    event.preventDefault();
    const body = {};
    console.log(event);
    body["email"] = event.target[0].value;
    body["password"] = event.target[1].value;
    setEmail(event.target[0].value);
    setPassword(event.target[1].value);
    setSubmit(true);
    if (body.email == "" || body.password == "") {
      return;
    }

    try {
      let res = await fetch("http://localhost:52682/api/Auth",
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
      )
      console.log(res.status)
      if (res.status == 400) {
        alert("login failed")
      } else {
        let response = await res.json();
        console.log('body :>> ', response);
        props.login(response);
        alert("login success")
      }

    } catch (e) {
      console.log("Error", e);
      alert("login failed")
    }
  }

  return <>
    <h1>Let's get started by login</h1>
    <small className="form-text text-danger">Fields marked with * are mandatory</small>
    <form onSubmit={validate}>
      <div className="form-group">
        <label>Email address<span className="text-danger">*</span></label>
        <input style={{ borderColor: submit && email == "" ? "red" : "grey" }} name="email" type="email" className="form-control" aria-describedby="emailHelp" />
        {submit && email == "" ?
          <small className="form-text text-danger" >Please enter email address</small> : ""
        }
        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label>Password<span className="text-danger">*</span></label>
        <input style={{ borderColor: submit && password == "" ? "red" : "grey" }} name="password" type="password" className="form-control" />
        {submit && password == "" ?
          <small className="form-text text-danger" >Please enter password</small> : ""
        }
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </>
}

export default Login;