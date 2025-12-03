import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "", // this for the confirm password
  });
  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, navigate, dispatch, message]);

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              name="name"
              placeholder="Enter your name"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              name="email"
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              name="password"
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password2"
              className="form-control"
              value={password2}
              name="password2"
              placeholder="Confirm your password"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
