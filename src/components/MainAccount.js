import { Route } from "react-router-dom";
import AddSubUser from "./AddSubUser";
import BlogHistory from "./BlogHistory";
import ProfileDelete from "./ProfileDelete";
import ProfileTemplate from "./ProfileTemplate";
import ProfileUpdate from "./ProfileUpdate";

function MainAccount() {
  return (
    <ProfileTemplate>
      <Route path={"/account"} exact component={ProfileUpdate} />
      <Route path={"/account/delete"} exact component={ProfileDelete} />
      <Route path={"/account/subusers"} exact component={AddSubUser} />
      <Route path={"/account/blogHistory"} exact component={BlogHistory} />
    </ProfileTemplate>
  );
}

export default MainAccount;
