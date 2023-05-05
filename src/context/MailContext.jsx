import { createContext, useReducer } from "react";
import { mails as InitialState } from "../mailDB/fetchMail";

export const MailContext = createContext();

function mailReducer(state, action) {
  switch (action.type) {
    case "mark_read":
      return state.map((mail) =>
        mail.mId === action.mId
          ? {
              ...mail,
              unread: false,
            }
          : { ...mail }
      );

    case "mark_unread":
      return state.map((mail) =>
        mail.mId === action.mId ? { ...mail, unread: true } : { ...mail }
      );

    case "star":
      return state.map((mail) =>
        mail.mId === action.mId ? { ...mail, isStarred: true } : { ...mail }
      );

    case "unstar":
      return state.map((mail) =>
        mail.mId === action.mId ? { ...mail, isStarred: false } : { ...mail }
      );

    case "delete":
      return state.filter((mail) => mail.mId !== action.mId);

    case "recover":
      return [action.recoveredMail, ...state];

    default:
      console.log("Default");
  }
}

// eslint-disable-next-line react/prop-types
export default function MailProvider({ children }) {
  const [mails, dispatch] = useReducer(mailReducer, InitialState);

  const markAsRead = (mId) => {
    dispatch({
      type: "mark_read",
      mId,
    });
  };

  const markAsUnread = (mId) => {
    dispatch({
      type: "mark_unread",
      mId,
    });
  };

  const starTheMail = (mId) => {
    dispatch({
      type: "star",
      mId,
    });
  };

  const unstarTheMail = (mId) => {
    dispatch({
      type: "unstar",
      mId,
    });
  };

  const deleteMail = (mId) => {
    dispatch({
      type: "delete",
      mId,
    });
  };

  const addToInbox = (mId) => {
    const recoveredMail = InitialState.find((mail) => mail.mId === mId);
    dispatch({
      type: "recover",
      recoveredMail,
    });
  };

  const { unreadMailCount } = mails.reduce(
    (acc, { unread }) =>
      unread ? { ...acc, unreadMailCount: acc.unreadMailCount + 1 } : acc,
    { unreadMailCount: 0 }
  );

  return (
    <MailContext.Provider
      value={{
        mails,
        markAsRead,
        markAsUnread,
        starTheMail,
        unstarTheMail,
        deleteMail,
        addToInbox,
        unreadMailCount,
      }}
    >
      {children}
    </MailContext.Provider>
  );
}
