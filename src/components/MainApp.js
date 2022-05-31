import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import AppTemplate from "./AppTemplate";
import BlogOutline from "./BlogOutline";
import BlogTitle from "./BlogTitle";
import BlogKeywords from "./BlogKeywords";
import AIBlog from "./AIBlog";
import SEOAnalyzer from "./SEOAnalyzer";
import SEOBlog from "./SEOBlog";
import PlagiarismChecker from "./PlagiarismChecker";
import ImageCrawler from "./ImageCrawler";
import ImageEditor from "./ImageEditor";
import Rephraser from "./Rephraser";

function MainApp() {
  return (
    <AppTemplate>
      <Route path="/app/blogTitle" exact component={BlogTitle} />
      <Route path={"/app/blogOutline"} exact component={BlogOutline} />
      <Route path="/app/blogKeywords" exact component={BlogKeywords} />
      <Route path="/app/aiBlog" exact component={AIBlog} />
      <Route path="/app/seoAnalyzer" exact component={SEOAnalyzer} />
      <Route path="/app/seoBlog" exact component={SEOBlog} />
      <Route
        path="/app/plagiarismChecker"
        exact
        component={PlagiarismChecker}
      />
      <Route
        path="/app/rephraser"
        exact
        component={Rephraser}
      />
      <Route path="/app/imageCrawler" exact component={ImageCrawler} />
      <Route path="/app/imageEditor" exact component={ImageEditor} />
    </AppTemplate>
  );
}

export default MainApp;
