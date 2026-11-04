import { useCurrentUser } from "../auth/authStore";
import "../style/account-extra.css";

const rows = [
  ["Username", "username"],
  ["Email", "email"],
  ["Institusi", "institution"],
  ["Kota", "city"],
];

const AccountDetails = () => {
  const user = useCurrentUser();
  if (!user) return null;

  return (
    <dl className="account-details">
      {rows.map(([label, key]) => (
        <div className="account-detail" key={key}>
          <dt>{label}</dt>
          <dd>{user[key] || "-"}</dd>
        </div>
      ))}
    </dl>
  );
};

export default AccountDetails;