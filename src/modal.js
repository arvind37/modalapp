import { useEffect, useRef, useState } from "react";

const Modal = ({ show, setShow }) => {
  const [username, setUsername] = useState("");
  const formRef = useRef(null);
  const modalRef = useRef(null);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");

  function isValidEmail(mail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(mail);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert(`Invalid email. Please check your email address.`);
    }

    if (number.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }

    if (new Date().getTime() - new Date(date).getTime() < 0) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    }

    setUsername("");
    setEmail("");
    setNumber("");
    setDate("");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="frm__section" ref={formRef}></div>

      <div className="modal" ref={modalRef}>
        <div className="modal-content">
          <form className="form__ctrl" onSubmit={handleSubmit}>
            <h1>Fill Details</h1>
            <div className="frm__inbox">
              <label htmlFor="Username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="frm__inbox">
              <label htmlFor="Email">Email Address:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="frm__inbox">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="frm__inbox">
              <label htmlFor="date">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

function XModal() {
  const [show, setShow] = useState(false);

  return (
    <div className="main__div">
      <div className="center__div">
        <h1>Users Details Modal</h1>
        <button className="btn" onClick={() => setShow(!show)}>
          Open Form
        </button>
      </div>
      {show && <Modal show={show} setShow={setShow} />}
    </div>
  );
}

export default XModal;
