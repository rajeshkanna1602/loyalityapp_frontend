import React, { useEffect, useState } from "react";
import styles from "../../src/components/Home.module.css";

const Home = (props: any) => {
  const {
    setIsLogged,
    logedUser,
    setIsOpen,
    setLoggedUser,
    setModalData,
  } = props;
  const [products, setProducts] = useState([]);
  const [lUsers, setLUsers] = useState([]);

  const logoutHandler = () => {
    setIsLogged(false);
    setModalData({
      title: "Login",
      message:
        "You have entered Username and Password are incorrect. Please Try Again!",
    });
  };

  useEffect(() => {
    if (logedUser.userName == "admin") {
      fetch("http://localhost:5000/getusers")
        .then((res) => res.json())
        .then((result) => {
          setLUsers(result);
        });
    }
  }, [logedUser]);
  const buynowHandler = (price: number) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uId: logedUser.uId, price: price }),
    };
    fetch("http://localhost:5000/setloyality", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setModalData({
          title: "BuyNow",
          message:
            "You have successfully Saved Loyality Point, Kindly Check your latest Points",
        });
        setIsOpen(true);
        setLoggedUser({
          ...logedUser,
          loyalityPoint: data.loyalityPoint,
        });
      });
  };

  const tableRows =
    lUsers.length > 0 &&
    lUsers
      .sort((a: any, b: any): any => parseInt(a.uId, 10) - parseInt(b.uId, 10))
      .map((user: any) => {
        return (
          <tr className={styles.tr}>
            <td>{user.uId}</td>
            <td>{user.userName}</td>
            <td>{user.loyalityPointUsers}</td>
          </tr>
        );
      });

  useEffect(() => {
    fetch("http://localhost:5000/getproducts")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);

  return (
    <>
      <div className={styles.home}>
        <div className={styles.header}>
          <div>Welcome {logedUser.userName}</div>
          {logedUser.userName != "admin" && (
            <div>
              Loyality Point
              <span className={styles.lpoints}>{logedUser.loyalityPoint}</span>
            </div>
          )}
          <div>
            <button className={styles.logout} onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
        {logedUser.userName != "admin" &&
          products.length > 0 &&
          products.map((pro: any) => {
            return (
              <>
                <div className={styles.productBox} key={pro.pId}>
                  <div>
                    <img
                      src={`${pro.imageUrl}`}
                      alt="mock img"
                      className={styles.image}
                    />
                  </div>
                  <div>
                    <div className={styles.descripton}>
                      Descripton
                      <span>{pro.description}</span>
                      <span className={styles.price}>
                        Price : ₹ {pro.price}
                      </span>
                    </div>
                    <div
                      className={`${styles.logout} ${styles.buynow}`}
                      onClick={(e) => buynowHandler(pro.price)}
                    >
                      Buynow
                    </div>
                  </div>
                </div>
              </>
            );
          })}

        {logedUser.userName == "admin" && lUsers.length > 0 && (
          <div className={styles.table}>
            <table className={styles.users}>
              <thead>
                <tr className={styles.th}>
                  <th>UserId</th>
                  <th>User Name</th>
                  <th>Loyality Points</th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
