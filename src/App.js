/* eslint-disable no-undef */
import { useEffect } from "react";
import "./App.css";

function App() {
  let faceioInstance = null;

  useEffect(() => {
    //cach khoi tao nhan mot thu vien thong qua cdn cua reactjs
    const faceIoScript = document.createElement("script");
    faceIoScript.src = "//cdn.faceio.net/fio.js";
    faceIoScript.async = true;
    faceIoScript.onload = () => faceIoScriptLoaded();
    document.body.appendChild(faceIoScript);

    //clean-up useEffect, xoa het faceIoScript di khi comp bi unMount
    return () => {
      document.body.removeChild(faceIoScript);
    };
  }, []);

  const faceIoScriptLoaded = () => {
    console.log(faceIO);
    if (faceIO && !faceioInstance) {
      //ham nay can public_key khi tao app tren faceio
      faceioInstance = new faceIO("fioaa8fa");
    }
  };

  //dang ki guong mat moi vao he thong
  const faceRegistration = async () => {
    try {
      const userInfo = await faceioInstance.enroll({
        locale: "auto",
        payload: {
          email: "ngocphucdo2601@gmail.com",
          userId: "170795-id-trungquandev",
          username: "phucdn2601",
          website: "https://trungquandev.com",
        },
      });
      console.log(userInfo);
      console.log("Unique Facial ID: ", userInfo.facialId);
      console.log("Enrollment Date: ", userInfo.timestamp);
      console.log("Gender: ", userInfo.details.gender);
      console.log("Age Approximation: ", userInfo.details.age);
    } catch (errorCode) {
      console.log(errorCode);
      handleError(errorCode);
    }
  };

  //xac thuc mot khuon mat da  co trong he thong
  const faceSignIn = async () => {
    try {
      console.log(faceioInstance);
      const userData = await faceioInstance.authenticate({
        locale: "auto",
      });
      console.log(userData);
    } catch (errorCode) {
      console.log(errorCode);
      handleError(errorCode);
    }
  };

  const handleError = (errCode) => {
    switch (errCode) {
      case fioErrCode.PERMISSION_REFUSED:
        console.log("Access to the Camera stream was denied by the end user");
        break;
      case fioErrCode.NO_FACES_DETECTED:
        console.log(
          "No faces were detected during the enroll or authentication process"
        );
        break;
      case fioErrCode.UNRECOGNIZED_FACE:
        console.log("Unrecognized face on this application's Facial Index");
        break;
      case fioErrCode.MANY_FACES:
        console.log("Two or more faces were detected during the scan process");
        break;
      case fioErrCode.PAD_ATTACK:
        console.log(
          "Presentation (Spoof) Attack (PAD) detected during the scan process"
        );
        break;
      case fioErrCode.FACE_MISMATCH:
        console.log(
          "Calculated Facial Vectors of the user being enrolled do not matches"
        );
        break;
      case fioErrCode.WRONG_PIN_CODE:
        console.log("Wrong PIN code supplied by the user being authenticated");
        break;
      case fioErrCode.PROCESSING_ERR:
        console.log("Server side error");
        break;
      case fioErrCode.UNAUTHORIZED:
        console.log(
          "Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information"
        );
        break;
      case fioErrCode.TERMS_NOT_ACCEPTED:
        console.log(
          "Terms & Conditions set out by FACEIO/host application rejected by the end user"
        );
        break;
      case fioErrCode.UI_NOT_READY:
        console.log(
          "The FACEIO Widget code could not be (or is being) injected onto the client DOM"
        );
        break;
      case fioErrCode.SESSION_EXPIRED:
        console.log(
          "Client session expired. The first promise was already fulfilled but the host application failed to act accordingly"
        );
        break;
      case fioErrCode.TIMEOUT:
        console.log(
          "Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)"
        );
        break;
      case fioErrCode.TOO_MANY_REQUESTS:
        console.log(
          "Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications"
        );
        break;
      case fioErrCode.EMPTY_ORIGIN:
        console.log(
          "Origin or Referer HTTP request header is empty or missing"
        );
        break;
      case fioErrCode.FORBIDDDEN_ORIGIN:
        console.log("Domain origin is forbidden from instantiating fio.js");
        break;
      case fioErrCode.FORBIDDDEN_COUNTRY:
        console.log(
          "Country ISO-3166-1 Code is forbidden from instantiating fio.js"
        );
        break;
      case fioErrCode.SESSION_IN_PROGRESS:
        console.log(
          "Another authentication or enrollment session is in progress"
        );
        break;
      case fioErrCode.NETWORK_IO:
      default:
        console.log(
          "Error while establishing network connection with the target FACEIO processing node"
        );
        break;
    }
  };

  return (
    <div className="face-authentication-by-trungquandev flex fdc jcfc aic">
      <h1>Learn Face Authentication using ReactJS & FaceIO</h1>
      <button className="action face-registration" onClick={faceRegistration}>
        Face Registration
      </button>
      <button className="action face-sign-in" onClick={faceSignIn}>
        Face Sign In
      </button>

      <div className="trungquandev-author">
        <div className="flex aic gap-10 mb-7 refer-link">
          <img
            className="icon basis-10"
            alt="trungquandev"
            src="https://trungquandev.com/wp-content/uploads/2022/09/trungquandev-link-icon-94-94.png"
          />
          <span className="basis-20">FaceIO:</span>
          <div className="basis-70">
            <a
              href="https://faceio.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://faceio.net
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
