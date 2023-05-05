import { useNavigate } from "react-router-dom";

import errorlogo from "../../assets/error.svg";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="mail-initial-page">
      <div style={{ textAlign: "center" }}>
        <img width="40%" src={errorlogo} alt="inbox-empty" />
        <br />
        <button className="single-mail-btn" onClick={() => navigate("/")}>
          Go To Inbox
        </button>
      </div>
    </div>
  );
}
