import React from "react";
import ProfileModal from "../../Profile/ProfileModal/ProfileModal";
import Slider from "../../../Slider/Slider";
import Banner from "../Banner/Banner";
import RecommendedTopics from "../Card/RecommendedTopics";
import Contact from "../Contact/Contact";
import QSN from "../QSN/QSN";

const Home = () => {
  return (
    <div>
      <ProfileModal></ProfileModal>
      <Banner></Banner>
      <RecommendedTopics></RecommendedTopics>
      <Slider></Slider>
      <QSN></QSN>
      <Contact></Contact>
    </div>
  );
};

export default Home;
