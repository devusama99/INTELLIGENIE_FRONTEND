import { Route } from "react-router-dom";
import PaymentSubscriptionTemplate from "./PaymentSubscriptionTemplate";
import PaymentDetails from "./PaymentDetails";
import SubscriptionPackage from "./SubscriptionPackage";
import BillingDetails from "./BillingDetails";
import Invoices from "./Invoices";
import ScrollToTop from "./ScrollToTop";

function MainSubscription() {
  return (
    <PaymentSubscriptionTemplate>
      <ScrollToTop>
        <Route path={"/subscription"} exact component={SubscriptionPackage} />
        <Route
          path={"/subscription/paymentDetails"}
          exact
          component={PaymentDetails}
        />
        <Route
          path={"/subscription/billing"}
          exact
          component={BillingDetails}
        />
        <Route path={"/subscription/invoices"} exact component={Invoices} />
      </ScrollToTop>
    </PaymentSubscriptionTemplate>
  );
}
export default MainSubscription;
