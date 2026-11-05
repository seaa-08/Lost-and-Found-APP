import { useCurrentUser } from "../auth/authStore";

const UserAvatar = ({ className, fallback }) => {
  const user = useCurrentUser();
  return <img className={className} src={user?.photo || fallback} alt="" />;
};

export default UserAvatar;