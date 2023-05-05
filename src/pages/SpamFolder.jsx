import { useContext } from "react";
import { SpamContext } from "../context/SpamContext";
import MailListing from "../components/MailListing";
import spamlogo from "../assets/spam.svg";

export default function SpamFolder() {
  const { spam } = useContext(SpamContext);
  return (
    <div className="mail-initial-page">
      {spam.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <img width="30%" src={spamlogo} alt="inbox-empty" />
          <p>Congratulations, no conversations in spam</p>
        </div>
      ) : (
        spam.map((mail) => <MailListing key={mail.mId} {...mail} spam />)
      )}
    </div>
  );
}
