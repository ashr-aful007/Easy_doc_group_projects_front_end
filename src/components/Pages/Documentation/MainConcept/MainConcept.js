import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../Loader/Loader";
import Code from "../Code";

const MainConcept = () => {
  const [mainConcept, setMainConcept] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/main-concept/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setMainConcept(data);
      });
  }, [id]);

  if (loading) {
    return Loader;
  }
  console.log(mainConcept);
  const {
    title,
    first,
    firstYellow,
    second,
    secondYellow,
    third,
    thirdHeader,
    thirdBlack,
    forth,
    forthBlack,
    forthHeader,
    fifth,
    fifthYellow,
    fifthBlack,
    fifthHeader,
    sixth,
    sixthBlack,
    sixthYellow,
    seventhHeader,
    seventhBlack,
    eight,
    eightBlack,
    nineth,
    ninethHeader,
    ninethBlack,
    tenth,
    tenthHeader,
    tenthBlack,
    eleventh,
    eleventhYellow,
    eleventhBlack,
    twelve,
    twelveBlack,
    twelveHeader,
    thirteen,
    thirteenBlack,
    fourteen,
    fourteenBlack,
    fourteenHeader,
    fourteenNumber,
    fifteen,
    fifteenBlack,
    fifteenNumber,
    sixteen,
    sixteenBlack,
    seventeen,
    seventeenBlack,
    seventeenYellow,
    eighteen,
    eighteenBlack,
    nineteen,
    twenty,
    twentyBlack,
    twentyOne,
    twentyOneBlack,
    twentyTwo,
    twentyTwoHeader,
    twentyThree,
    twentyFour,
    twentyFive,
  } = mainConcept;
  const firsts = first?.split("   ");
  const seventhBlacks = seventhBlack?.split("   ");
  const threeBlacks = seventhBlack?.split("   ");
  return (
    <div className="py-8">
      <p className="text-6xl text-base-content">{title}</p>
      <p>{first && firsts.map((firstPara) => <div className="py-5">{firstPara}</div>)}</p>
      <div className="mockup-code">
        {seventhBlack &&
          seventhBlacks.map((code, i) => <Code code={code} key={i}></Code>)}
      </div>
    </div>
  );
};

export default MainConcept;