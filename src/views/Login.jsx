import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";
import GoogleLogin from "./GoogleLogin";
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      email,
      password,
    });

    dispatch(login(data, navigate));
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold"> Login</h4>
              <hr/>
              <form onSubmit={onSubmit}>
                <div className="mb-3 pt-3">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                
                <div className="mb-3 pt-3 input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <span className="input-group-text">
                    {showPassword ? (
                      <FaEyeSlash onClick={() => setShowPassword(false)} />
                    ) : (
                      <FaEye onClick={() => setShowPassword(true)} />
                    )}
                  </span>
                </div>
                <GoogleLogin buttonText="Login with Google">
                                </GoogleLogin>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
                <div className='Google d-flex justify-content-center text-align-center mt-3'>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
