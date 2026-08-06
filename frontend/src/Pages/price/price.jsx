import React from "react";
import PriceBreadCrumb from "../../Components/PriceBreadCrumb/priceBreadCrumb";
import Focused from "../../Components/Focused/Focused";
import Movement from "../../Components/Movement/Movement";
import Indulge from "../../Components/Indulge/Indulge";

const Price = () => {
  return (
    <div>
      <PriceBreadCrumb />
      <Focused/>
      <Movement/>
      <Indulge/>
    </div>
  );
};

export default Price;