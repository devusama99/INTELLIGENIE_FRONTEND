import { Route } from "react-router-dom";
import PaymentDetails from "./PaymentDetails";
import SubscriptionPackage from "./SubscriptionPackage";
import BillingDetails from "./BillingDetails";
import Invoices from "./Invoices";
import FeedbackHelpTemplate from "./FeedbackHelpTemplate";
import RatingFeedback from "./RatingFeedback";
import SystemGuide from "./SystemGuide";
import FAQsShareApp from "./FAQsShareApp";
import Complaint from "./Complaint";
import Query from "./Query";

function MainFeedbackHelpCenter() {
  return (
    <FeedbackHelpTemplate>
      <Route path={"/feedbackHelpCenter"} exact component={RatingFeedback} />
      <Route
        path={"/feedbackHelpCenter/systemGuide"}
        exact
        component={SystemGuide}
      />
      <Route
        path={"/feedbackHelpCenter/FAQsShareApp"}
        exact
        component={FAQsShareApp}
      />
      <Route
        path={"/feedbackHelpCenter/complaint"}
        exact
        component={Complaint}
      />
      <Route path={"/feedbackHelpCenter/query"} exact component={Query} />
    </FeedbackHelpTemplate>
  );
}
export default MainFeedbackHelpCenter;
