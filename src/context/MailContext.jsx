import { createContext, useReducer } from "react";

import { mails as InitialState } from "../mailDB/fetchMail";
import { toastReducer } from "../utilities/Toaster";

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

    case "mark_all":
      return state.map((mail) => ({ ...mail, unread: action.payload }));

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
    toastReducer('success', 'Marked as Read')
  };

  const markAsUnread = (mId) => {
    dispatch({
      type: "mark_unread",
      mId,
    });
    toastReducer('success', 'Marked as Unread');
  };

  const starTheMail = (mId) => {
    dispatch({
      type: "star",
      mId,
    });
    toastReducer('success', 'Marked as Important')
  };

  const unstarTheMail = (mId) => {
    dispatch({
      type: "unstar",
      mId,
    });
    toastReducer('success', 'Marked as Unimportant');
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
    toastReducer('success', 'Added to Inbox')
  };

  const markAllAsRead = () => {
    dispatch({
      type: "mark_all",
      payload: false,
    });
    toastReducer('info', 'Marked All as Read')
  };

  const markAllAsUnread = () => {
    dispatch({
      type: "mark_all",
      payload: true,
    });
    toastReducer("info", "Marked All as Unread");
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
        markAllAsRead,
        markAllAsUnread,
        unreadMailCount,
      }}
    >
      {children}
    </MailContext.Provider>
  );
}
