import { useContext, useState } from "react";
import { MailContext } from "../context/MailContext";
import MailListing from "../components/MailListing";
import inboxlogo from "../assets/inbox.svg";

export default function Inbox() {
  const [filters, setFilters] = useState([]);

  const { mails, markAllAsRead, unreadMailCount, markAllAsUnread } =
    useContext(MailContext);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    checked
      ? setFilters([...filters, value])
      : setFilters(filters.filter((type) => type !== value));
  };

  const mailsAfterFiltering =
    filters.length > 0
      ? mails.filter((mail) =>
          filters.every((checkboxType) => mail[checkboxType])
        )
      : mails;

  return (
    <div className="mail-initial-page">
      {mails.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <img width="40%" src={inboxlogo} alt="inbox-empty" />
          <h3>Inbox is empty, no conversations to show</h3>
        </div>
      ) : (
        <>
          <fieldset>
            <legend>Filters</legend>
            <label>
              <input
                onChange={handleFilterChange}
                value="unread"
                type="checkbox"
                name="filters"
              />
              Show Unread Mails
            </label>
            <label>
              <input
                onChange={handleFilterChange}
                value="isStarred"
                type="checkbox"
                name="filters"
                id=""
              />
              Show Starred Mails
            </label>
          </fieldset>
          <h3>Unread Mails: {unreadMailCount}</h3>
          {unreadMailCount ? (
            <button className="single-mail-btn" onClick={() => markAllAsRead()}>
              Mark All as Read
            </button>
          ) : (
            <button
              className="single-mail-btn"
              onClick={() => markAllAsUnread()}
            >
              Mark All as Unread
            </button>
          )}

          {mailsAfterFiltering.map((mail) => (
            <MailListing key={mail.mId} {...mail} />
          ))}
        </>
      )}
    </div>
  );
}
