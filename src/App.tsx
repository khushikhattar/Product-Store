import { Sidebar } from "./components/Sidebar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { MainContent } from "./components/MainContent";
import { TopSellers } from "./components/TopSellers";
import { PopularBlogs } from "./components/PopularBlogs";
import { ProductPage } from "./components/ProductPage";

function App() {
  return (
    <>
      {/* Wrap everything inside Router so we can use routes */}
      <Router>
        <div className="flex h-screen">
          {/* Sidebar always visible on the left */}
          <Sidebar />

          {/* Main area shows the content for current route */}
          <div className="rounded w-full flex justify-between flex-wrap">
            <Routes>
              {/* Default route (/) will show the product list */}
              <Route path="/" element={<MainContent />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
            <div>
              <TopSellers />
              <PopularBlogs />
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
