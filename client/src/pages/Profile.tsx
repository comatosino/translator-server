import { useAppSelector } from "../store/hooks";
import { Translator, Auth } from ".";

const Profile = () => {
  const userProfile = useAppSelector((state) => state.user.profile);
  return userProfile ? <Translator user={userProfile} /> : <Auth />;
};

export default Profile;
