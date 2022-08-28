import React, { useEffect } from "react";
import styles from "../../src/components/Login.module.css";

const Login = ({ setIsOpen, setIsLogged, setLoggedUser }: any) => {
  const [user, setUser] = React.useState({});

  const handleChange = (event: any) => {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.name]: value,
    });
  };

  const submitHandler = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:5000/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        !data.status && setIsOpen(true);
        if (data.status) {
          setLoggedUser(data);
          setIsLogged(true);
        }
      });
  };
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((result) => {})
      .catch((err) => {
        console.log("error ", err);
      });
  }, []);

  return (
    <>
      <div className={styles.login}>
        <div>
          <label htmlFor="uname">User Name</label>
          <input
            type="text"
            id="uname"
            name="userName"
            placeholder="Username.."
            className={styles.input}
            onChange={handleChange}
          />
          <label htmlFor="pword">Password</label>
          <input
            type="password"
            id="pword"
            name="password"
            placeholder="password"
            className={styles.input}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="Submit"
            className={styles.submit}
            onClick={submitHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
