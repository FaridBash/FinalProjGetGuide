import { useEffect, useRef, useState } from "react";
import "./AskForm.css";

export default function AskForm() {
  const [messageObj, setMessageObj] = useState({});
  useEffect(() => {
    console.log("MEssage obj:", messageObj);
  }, [messageObj]);
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPhoneRef = useRef(null);
  const inputMessageRef = useRef(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const myObj = {};
    myObj.name = inputNameRef.current.value;
    myObj.email = inputEmailRef.current.value;
    myObj.phone = inputPhoneRef.current.value;
    myObj.message = inputMessageRef.current.value;
    myObj.aswered = false;
    setMessageObj(myObj);

    inputNameRef.current.value=''
    inputEmailRef.current.value=''
    inputPhoneRef.current.value='';
    inputMessageRef.current.value='';
  };

  return (
    <div id="askForm-container">
      <h3 id="contact-us">Contact Us</h3>
      <form action="" onSubmit={formSubmitHandler} id="ask-form">
        <input
          type="text"
          id="name-form"
          className="askform-input"
          placeholder="Name"
          ref={inputNameRef}
        />
        <input
          type="email"
          id="email-form"
          className="askform-input"
          placeholder="Email"
          ref={inputEmailRef}
        />
        <input
          type="number"
          id="phone-form"
          className="askform-input"
          placeholder="Phone"
          ref={inputPhoneRef}
        />
        <textarea
          id="message"
          name="message-form"
          rows="10"
          cols="20"
          placeholder="Message"
          ref={inputMessageRef}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
