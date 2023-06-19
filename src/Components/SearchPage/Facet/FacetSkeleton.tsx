import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const SkeletonFacet : React.FC = () => {
    return (
      <MainWrapper>
        <div style={{ padding: "30px 20px" }}>
          <Skeleton count={1} style={{ marginBottom: "20px", height: "40px" }} />
          <Skeleton count={2} style={{ margin: "10px 0px" }} />
        </div>
      </MainWrapper>
    );
  };


  const MainWrapper = styled.div`
  /* width: 100%; */
  border-radius: 16px;
  border: 1px solid #e5e8e8;
  overflow: hidden;
  margin: 10px 10px 10px 10px;
  background: white;
  margin-bottom: 20px;
`;


export default SkeletonFacet;