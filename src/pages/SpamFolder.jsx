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
          <img width="40%" src={spamlogo} alt="inbox-empty" />
          <h3>Congratulations, no conversations in spam</h3>
        </div>
      ) : (
        spam.map((mail) => <MailListing key={mail.mId} {...mail} spam />)
      )}
    </div>
  );
}
