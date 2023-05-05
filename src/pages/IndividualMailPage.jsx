import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { mails as allMailsData } from "../mailDB/fetchMail";

export default function IndividualMailPage() {
  const { mailId } = useParams();
  const navigate = useNavigate();

  const getMailDetails = (allMailsData, mailId) =>
    allMailsData.find((mail) => mail.mId === mailId);

  const mailToDisplay = getMailDetails(allMailsData, mailId);

  return (
    <div className="mail-initial-page">
      <h2>Subject: {mailToDisplay?.subject}</h2>
      <p>Body: {mailToDisplay?.content}</p>
      <button className="single-mail-btn" onClick={() => navigate("/inbox")}>
        Go To Inbox
      </button>
    </div>
  );
}
