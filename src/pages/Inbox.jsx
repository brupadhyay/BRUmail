import { useContext, useState } from "react";
import { MailContext } from "../context/MailContext";
import MailListing from "../components/MailListing";
import inboxlogo from "../assets/inbox.svg";

export default function Inbox() {
  const [filters, setFilters] = useState([]);

  const { mails, unreadMailCount } = useContext(MailContext);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    checked
      ? setFilters([...filters, value])
      : setFilters(filters.filter((type) => type !== value));
  };

  const mailsAfterFiltering =
    filters.length > 0
      ? mails.filter((mail) => filters.every((type) => mail[type]))
      : mails;

  return (
    <div className="mail-initial-page">
      {mails.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <img width="30%" src={inboxlogo} alt="inbox-empty" />
          <p>Inbox is empty, no conversations to show</p>
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
          <p>
            <b>Unread Mails: {unreadMailCount}</b>
          </p>
          {mailsAfterFiltering.map((mail) => (
            <MailListing key={mail.mId} {...mail} />
          ))}
        </>
      )}
    </div>
  );
}
