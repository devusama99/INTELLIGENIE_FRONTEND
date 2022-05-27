import { Route } from "react-router-dom";
import AdminTemplate from "./AdminTemplate";
import AdminDashboard from "./AdminDashboard";
import AdminUserManagement from "./AdminUserManagement";
import AdminFeedbackManagement from "./AdminFeedbackManagement";
import AdminComplaintManagement from "./AdminComplaintManagement";
import AdminFaqsManagement from "./AdminFaqsManagement";
import AdminAccount from "./AdminAccount";
import AdminChangelogManagement from "./AdminChangelogManegement";
import AdminVideosManagement from "./AdminVideosManagement";
import AdminQueryManagement from "./AdminQueryManagement";
import AdminSubscriptionManagement from "./AdminSubscriptionManagement";

function MainAdmin() {
  return (
    <AdminTemplate>
      <Route path={"/admin"} exact component={AdminDashboard} />
      <Route
        path={"/admin/userManagement"}
        exact
        component={AdminUserManagement}
      />
      <Route
        path={"/admin/feedbackManagement"}
        exact
        component={AdminFeedbackManagement}
      />
      <Route
        path={"/admin/complaintManagement"}
        exact
        component={AdminComplaintManagement}
      />
      <Route
        path={"/admin/queryManagement"}
        exact
        component={AdminQueryManagement}
      />
      <Route
        path={"/admin/faqsManagement"}
        exact
        component={AdminFaqsManagement}
      />
      <Route
        path={"/admin/changelogManagement"}
        exact
        component={AdminChangelogManagement}
      />
      <Route
        path={"/admin/videosManagement"}
        exact
        component={AdminVideosManagement}
      />
      <Route
        path={"/admin/subscriptionManagement"}
        exact
        component={AdminSubscriptionManagement}
      />
      <Route path={"/admin/account"} exact component={AdminAccount} />
    </AdminTemplate>
  );
}

export default MainAdmin;
