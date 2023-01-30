import React, { useMemo } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../asset/Images/woman-shopping-online.json"

const Animation = () => {

  return (

        <div className="">
          <Lottie
            className="mt-[5px] w-full sm:w-[500px] sm:h-[500px]"
            loop
            animationData={lottieJson}
            play
          />
        </div>
  );
};

export default Animation;
