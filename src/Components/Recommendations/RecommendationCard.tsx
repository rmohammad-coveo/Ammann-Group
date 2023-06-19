import React from "react";
import { Theme } from "../../theme";
import styled from "styled-components";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { Icon } from "react-icons-kit";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface RecommendationCardType {
  title: string;
  description: string;
  image: string;
  video?: boolean;
  clickUri: string;
  onClick: () => void;
  onContextMenu: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  source?: string;
}

const RecommendtionCard: React.FC<RecommendationCardType> = ({
  title,
  description,
  image,
  video = true,
  clickUri,
  onClick,
  onContextMenu,
  onMouseDown,
  onMouseUp,
  source = "",
}) => {
  return (
    <MainWrapper
      key={title}
      onClick={() => {
        onClick();
        window.open(clickUri, "_blank", "noopener,noreferrer");
      }}
      onContextMenu={onContextMenu}
      /* onMouseDown = {onMouseDown}
        onMouseUp = {onMouseUp} */
    >
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
      <TextWrapper>
        <Title>{title}</Title>
        <SubTitle>{description}</SubTitle>
        <ReferralLink>
          {!video ? "Explore" : "Watch now"}{" "}
          <div style={{ marginLeft: "5px", color: 'red' }}>
            <Icon icon={chevronRight} />
          </div>
        </ReferralLink>
      </TextWrapper>
    </MainWrapper>
  );
};

export const SkeletonRecommendtionCard: React.FC = () => {
  return (
    <MainWrapper>
      <Skeleton
        style={{ height: "250px", position: "relative", top: "-5px" }}
      />
      <div style={{ padding: "30px 20px" }}>
        <Skeleton count={1} style={{ marginBottom: "20px", height: "50px" }} />
        <Skeleton count={2} style={{ margin: "10px 0px" }} />
      </div>
    </MainWrapper>
  );
};

const ImageContainer = styled.div`
  overflow: hidden;
`;

const Image = styled.img`
  height: 150px;
  width: 100%;
  object-fit: cover;
  transition: 0.2s ease-in-out all;
`;
const TextWrapper = styled.div`
  display: flex;
  width: 85%;
  height: 230px;
  align-items: center;
  justify-content: space-around;
  background-color: #f2f1ec;
  padding: 10px 20px;
  flex-direction: column;
`;

const Title = styled.a`
  font-family: inherit;
  text-decoration: none;
  font-style: normal;
  align-self: flex-start;
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  color: #F00000;
  text-transform: uppercase;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SubTitle = styled.span`
  font-family: inherit;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
  color: ${Theme.primaryText};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReferralLink = styled.a`
  font-family: inherit;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  color: red;
  text-decoration: none;
  display: flex;
  align-self: flex-start;
  opacity: 0.8;
  cursor: pointer;
`;

const MainWrapper = styled.div`
  width: 250px;
  border: 1px solid #e5e8e8;
  overflow: hidden;
  margin: 20px;
  background: white;
  cursor: pointer;
  &:hover {
    border-color: #F00000;
  }

  &:hover ${Title} {
    color: #F00000;
  }

  &:hover ${Image} {
    filter: brightness(0.6);
  }

  &:hover ${ReferralLink} {
    opacity: 1;
  }
  @media (max-width: 480px) {
    width: 90vw;
  }
`;

export default RecommendtionCard;
