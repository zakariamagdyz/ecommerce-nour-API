import React from "react";

import Slider from "../components/Slider";
import Categories from "../containers/Categories";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";

const Home: React.FC = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
