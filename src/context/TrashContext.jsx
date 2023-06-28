import { createContext, useContext, useState } from "react";
import { MailContext } from "./MailContext";
import { toastReducer } from "../utilities/Toaster";
export const TrashContext = createContext();

// eslint-disable-next-line react/prop-types
export default function TrashProvider({ children }) {
  const [trash, setTrash] = useState([]);
  const { mails, addToInbox, deleteMail } = useContext(MailContext);

  const addToTrash = (mId) => {
    const mailToDelete = mails.find(({ mId: mailId }) => mailId === mId);
    deleteMail(mId);
    setTrash([mailToDelete, ...trash]);
    toastReducer('warn', 'Deleted a Mail')
  };

  const removeFromTrash = (mId) => {
    addToInbox(mId);
    setTrash(trash.filter((mail) => mail.mId !== mId));
  };

  return (
    <TrashContext.Provider
      value={{
        trash,
        addToTrash,
        removeFromTrash,
      }}
    >
      {children}
    </TrashContext.Provider>
  );
}
