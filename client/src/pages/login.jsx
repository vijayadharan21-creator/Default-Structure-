import { useState } from "react";
import {api} from '../services/api.js';
import {setToken} from '../services/token.js'
import {useNavigate} from 'react-router-dom';


function AuthPage() {
      const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Remove error when user starts correcting the field
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const validate = () => {
    const newErrors = {};

    // Name validation - only during registration
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one number";
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    // Confirm password - only during registration
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword =
          "Please confirm your password";
      } else if (
        formData.password !== formData.confirmPassword
      ) {
        newErrors.confirmPassword =
          "Passwords do not match";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) {
      return;
    }
try{
    if (isLogin) {
      const res=await api.post("/login",{
       
        email:formData.email,
        password:formData.password
      });
      console.log(res.data);
      const data=res.data;
      setToken(data.data.token);
      console.log(data.data.token)
     
    } else {
      const res=await api.post("/register",{
        name:formData.name,
        email:formData.email,
        password:formData.password
      });
      console.log(res.data);
      const data= res.data;
      setToken(data.data.token);
      console.log(data.data.token)
       
    }
  }catch(e){
    setErrors({
    server: e.response?.data?.message || "Something went wrong"
  });
  }
}

  const switchMode = () => {
    setIsLogin(!isLogin);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

    setErrors({});
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        {!isLogin && (
          <div>
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

           {errors.server && (
  <p style={{ color: "red", margin: "10px 0" }}>{errors.server}</p>
)}

          </div>
        )}

        {/* Email */}
        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          {errors.email && (
            <p>{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          {errors.password && (
            <p>{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        {!isLogin && (
          <div>
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />

            {errors.confirmPassword && (
              <p>{errors.confirmPassword}</p>
            )}
          </div>
        )}

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>

      </form>

      <p>
        {isLogin
          ? "Don't have an account?"
          : "Already have an account?"}

        <button
          type="button"
          onClick={switchMode}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;

