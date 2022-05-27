import "@fontsource/roboto";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ProfileDelete from "./components/ProfileDelete";
import ProfileUpdate from "./components/ProfileUpdate";
import AddSubUser from "./components/AddSubUser";
import BlogHistory from "./components/BlogHistory";
import SubscriptionPackage from "./components/SubscriptionPackage";
import BillingDetails from "./components/BillingDetails";
import Invoices from "./components/Invoices";
import PaymentDetails from "./components/PaymentDetails";
import AdminSignin from "./components/AdminSignin";
import AdminSignup from "./components/AdminSignup";
import AdminDashboard from "./components/AdminDashboard";
import BlogTitle from "./components/BlogTitle";
import BlogOutline from "./components/BlogOutline";
import BlogKeywords from "./components/BlogKeywords";
import AIBlog from "./components/AIBlog";
import SEOAnalyzer from "./components/SEOAnalyzer";
import SEOBlog from "./components/SEOBlog";
import PlagiarismChecker from "./components/PlagiarismChecker";
import MainApp from "./components/MainApp";
import MainAdmin from "./components/MainAdmin";
import MainAccount from "./components/MainAccount";
import MainSubscription from "./components/MainSubscription";
import AdminForgotPassword from "./components/AdminForgotPassword";
import MainFeedbackHelpCenter from "./components/MainFeedbackHelpCenter";
import ScrollToTop from "./components/ScrollToTop";
import ForgetPasswordAdmin from "./components/ForgetPasswordAdmin";
import ForgetPasswordTemplate from "./components/ForgetPasswordTemplate";
import ImageEditor from "./components/ImageEditor";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            {/* AppRoutes */}
            <Route path="/" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route
              path="/forgotPassword"
              exact
              component={ForgetPasswordTemplate}
            />
            <Route path={"/app"} component={MainApp} />
            <Route path="/account" component={MainAccount} />
            <Route path="/subscription" component={MainSubscription} />
            <Route
              path="/feedbackHelpCenter"
              component={MainFeedbackHelpCenter}
            />

            {/* Admin Routes */}
            <Route path="/admin" component={MainAdmin} />
            <Route path="/adminSignin" exact component={AdminSignin} />
            <Route path="/adminSignup" exact component={AdminSignup} />
            <Route
              path="/adminForgetPassword"
              exact
              component={ForgetPasswordAdmin}
            />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
