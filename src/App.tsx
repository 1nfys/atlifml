import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import TabBar from "./components/TabBar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

const DocsPage = lazy(() => import("./pages/DocsPage"));

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <TabBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/docs" element={<Navigate to="/docs/welcome" replace />} />
        <Route
          path="/docs/:slug"
          element={
            <Suspense fallback={<main className="landing"><p className="dim">loading documentation…</p></main>}>
              <DocsPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
