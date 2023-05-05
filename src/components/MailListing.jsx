import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaRegStar, FaStar, FaTrashAlt } from "react-icons/fa";

import { MailContext } from "../context/MailContext";
import { TrashContext } from "../context/TrashContext";
import { SpamContext } from "../context/SpamContext";

/* eslint-disable react/prop-types */
export default function MailListing({
  mId,
  unread,
  isStarred,
  subject,
  content,
  spam,
  trash,
}) {
  const { markAsRead, markAsUnread, starTheMail, unstarTheMail } =
    useContext(MailContext);

  const { addToTrash, removeFromTrash } = useContext(TrashContext);
  const { addToSpam, removeFromSpam } = useContext(SpamContext);

  const displayButtonOrHide = {
    display: (spam || trash) && "none",
  };

  return (
    <div className="mail-listing">
      <h3>
        Subject: {subject}
        {isStarred ? (
          <button
            className="utils-btn"
            style={displayButtonOrHide}
            onClick={() => unstarTheMail(mId)}
          >
            <span className="star">
              <FaStar />
            </span>
          </button>
        ) : (
          <button
            className="utils-btn"
            style={displayButtonOrHide}
            onClick={() => starTheMail(mId)}
          >
            <span className="unstar">
              <FaRegStar />
            </span>
          </button>
        )}
      </h3>

      <p>{content}</p>
      <NavLink
        style={{ textDecoration: "none", marginBottom: "1rem" }}
        to={`/${mId}`}
      >
        <span className="details-url">View Detail</span>
      </NavLink>

      <span className="utils-btn">
        <button style={displayButtonOrHide} onClick={() => addToTrash(mId)}>
          <span className="delete-btn">
            <FaTrashAlt />
          </span>
        </button>
        {unread ? (
          <button style={displayButtonOrHide} onClick={() => markAsRead(mId)}>
            Mark as read
          </button>
        ) : (
          <button style={displayButtonOrHide} onClick={() => markAsUnread(mId)}>
            Mark as unread
          </button>
        )}

        <button style={displayButtonOrHide} onClick={() => addToSpam(mId)}>
          Report spam
        </button>
        {spam && (
          <button onClick={() => removeFromSpam(mId)}>Mark as safe</button>
        )}
        {trash && (
          <button onClick={() => removeFromTrash(mId)}>Move to inbox</button>
        )}
      </span>
    </div>
  );
}
