import { createContext, useContext, useState } from "react";
import { MailContext } from "./MailContext";
export const SpamContext = createContext();

// eslint-disable-next-line react/prop-types
export default function SpamProvider({ children }) {
  const [spam, setSpam] = useState([]);
  const { mails, addToInbox, deleteMail } = useContext(MailContext);

  const addToSpam = (mId) => {
    const spamMail = mails.find(({ mId: mailId }) => mailId === mId);
    deleteMail(mId);
    setSpam([spamMail, ...spam]);
  };

  const removeFromSpam = (mId) => {
    addToInbox(mId);
    setSpam(spam.filter((mail) => mail.mId !== mId));
  };

  return (
    <SpamContext.Provider
      value={{
        spam,
        addToSpam,
        removeFromSpam,
      }}
    >
      {children}
    </SpamContext.Provider>
  );
}
