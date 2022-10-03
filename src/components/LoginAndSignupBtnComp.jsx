/* eslint-disable no-undef */
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginAndSignupBtnComp = () => {
  const navigate = useNavigate();

  let faceio;
  useEffect(() => {
    faceio = new faceIO("fioaa8fa");
  }, []);

  const handleSignUp = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "example@gmail.com",
          pin: "12345",
        },
      });

      console.log(` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogIn = async () => {
    try {
      // let response = await faceio.authenticate({
      //   locale: "auto",
      // });

      // console.log(` Unique Facial ID: ${response.facialId}
      //     PayLoad: ${response.payload}
      //     `);

      faceio
        .authenticate({
          locale: "auto", // Default user locale
        })
        .then((userData) => {
          console.log("Success, user identified");
          // Grab the facial ID linked to this particular user which will be same
          // for each of his successful future authentication. FACEIO recommend
          // that your rely on this Facial ID if you plan to uniquely identify
          // all enrolled users on your backend for example.
          const faceId = userData.facialId;
          console.log("Linked facial Id: " + userData.facialId);
          // Grab the arbitrary data you have already linked (if any) to this particular user
          // during his enrollment via the payload parameter of the enroll() method.
          console.log("Payload: " + JSON.stringify(userData.payload));

          if (faceId !== "") {
            localStorage.setItem("facialId", faceId);
            navigate(`/home`);
          }
          // {"whoami": 123456, "email": "john.doe@example.com"} set via enroll()
        })
        .catch((errCode) => {
          // handle authentication failure. Visit:
          // https://faceio.net/integration-guide#error-codes
          // for the list of all possible error codes
          console.log(errCode);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section>
        <h1>Face Authentication by FaceIO</h1>
        <button onClick={handleSignUp}>Sign-up</button>
        <button onClick={handleLogIn}>Log-in</button>
      </section>
    </>
  );
};

export default LoginAndSignupBtnComp;
