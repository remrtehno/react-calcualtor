import React from "react";
import Page from "../../common/Page/Page";
import FirstScreen from "./FirstScreen/FirstScreen";
import CalculatorBlock from "./CalculatorBlock/CalculatorBlock";
import StepsScreen from "./StepsScreen/StepsScreen";
import FormSection from "./FormSection/FormSection";
import GalleryScreen from "./GalleryScreen/GalleryScreen";
import WriteUsScreen from "./WriteUsScreen/WriteUsScreen";

const MainPage = () => {
  return(
    <Page>
      <FirstScreen/>
      <CalculatorBlock/>
      <StepsScreen/>
      <FormSection/>
      <GalleryScreen/>
      <WriteUsScreen/>
    </Page>
  )
};

export default MainPage;
