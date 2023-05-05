import { useContext } from "react";
import { TrashContext } from "../context/TrashContext";
import MailListing from "../components/MailListing";
import trashlogo from "../assets/trash.svg";

export default function Trash() {
  const { trash } = useContext(TrashContext);

  return (
    <div className="mail-initial-page">
      {trash.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <img width="30%" src={trashlogo} alt="inbox-empty" />
          <p>Trash is empty, no conversations to show</p>
        </div>
      ) : (
        trash.map((mail) => <MailListing key={mail.mId} {...mail} trash />)
      )}
    </div>
  );
}
