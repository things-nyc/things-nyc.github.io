import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.tsx";
import Stories from "./pages/Stories.tsx";
import StoryDetail from "./pages/StoryDetail.tsx";
import Blog from "./pages/Blog.tsx";
import People from "./pages/People.tsx";
import Faq from "./pages/faq.tsx";
import Repos from "./pages/Repos.tsx";
import mixpanel from "mixpanel-browser";

mixpanel.init('46e26c9c3c1239c1ccab3395c3c0ef6e', {
  autocapture: true,
  record_sessions_percent: 100,
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:slug" element={<StoryDetail />} />
          <Route path="/repos" element={<Repos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/people" element={<People />} />
          <Route path="/faq" element={<Faq />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
