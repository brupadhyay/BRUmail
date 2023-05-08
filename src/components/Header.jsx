import { NavLink } from "react-router-dom";
import { MdInbox } from "react-icons/md";
import { RiSpam2Fill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { SpamContext } from "../context/SpamContext";
import { TrashContext } from "../context/TrashContext";

const getActiveStyle = ({ isActive }) => ({
  color: isActive ? "#268df0" : "#333",
  fontWeight: isActive ? "700" : "600",
  textDecoration: "none",
  borderBottom: isActive ? "4px solid #25a7f0" : "none",
  padding: "8px 12px",
  margin: "1rem 0",
});

export default function Header() {
  const { spam } = useContext(SpamContext);
  const { trash } = useContext(TrashContext);

  return (
    <div className="header">
      <NavLink style={getActiveStyle} to="/">
        <span>
          <MdInbox
            style={{
              padding: "0 8px 0 0",
            }}
          />
          Inbox
        </span>
      </NavLink>
      <NavLink style={getActiveStyle} to="/spam">
        <span>
          <RiSpam2Fill
            style={{
              padding: "0 8px 0 0",
            }}
          />
          Spam
          {spam.length > 0 && (
            <small className="mail-counter-for-pages">{spam.length}</small>
          )}
        </span>
      </NavLink>
      <NavLink style={getActiveStyle} to="/trash">
        <span>
          <FaTrashAlt
            style={{
              padding: "0 8px 0 0",
            }}
          />
          Trash
          {trash.length > 0 && (
            <small className="mail-counter-for-pages">{trash.length}</small>
          )}
        </span>
      </NavLink>
    </div>
  );
}
