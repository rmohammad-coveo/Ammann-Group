import React, {
  useContext,
} from "react";
import { ListItem, Box, Typography } from "@mui/material";
import {
  Result,
  buildInteractiveResult,
  SearchEngine,
} from "@coveo/headless";
import EngineContext from "../common/engineContext";
import styled from "styled-components";
import { Theme } from "../theme";

export function filterProtocol(uri: string) {
  // Filters out dangerous URIs that can create XSS attacks such as `javascript:`.
  const isAbsolute = /^(https?|ftp|file|mailto|tel):/i.test(uri);
  const isRelative = /^(\/|\.\/|\.\.\/)/.test(uri);

  return isAbsolute || isRelative ? uri : "";
}

interface FieldValueInterface {
  value: string;
  caption: string;
}

function ListItemLink(
  engine: SearchEngine,
  result: Result,
  source?: string,
  setResult?: (x: Result) => void
) {
  const interactiveResult = buildInteractiveResult(engine, {
    options: { result },
  });
  return (
    <a
      href={filterProtocol(result.clickUri)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => interactiveResult.select()}
      onContextMenu={() => interactiveResult.select()}
      onMouseDown={() => interactiveResult.select()}
      onMouseUp={() => interactiveResult.select()}
      onTouchStart={() => interactiveResult.beginDelayedSelect()}
      onTouchEnd={() => interactiveResult.cancelPendingSelect()}
    >
      {result.title}
    </a>
  );
}


const PeopleResultTemplate: React.FC<{ result: any; imageField: string }> = ({
  result,
  imageField,
}) => {
  const engine = useContext(EngineContext)!;
  const date = new Date(Number(result.raw.date));
  return (
    <>
      <ListItem disableGutters key={result.uniqueId}>
        <Box my={1} width={'100%'}>
        <BadgeWrapper>
          {result.isRecommendation && (
            <RecommendationBadge>Recommended</RecommendationBadge>
          )}
          {result.isTopResult && (
            <RecommendationBadge>Featured</RecommendationBadge>
          )}
          </BadgeWrapper>
          <MainWrapper>
            {result.raw[imageField] && (
              <ImageWrapper>
                <IconImage
                  src={result.raw[imageField]}
                  alt={`${result.title} image`}
                />
              </ImageWrapper>
            )}
            <TextWrapper>
              <TitltAndDateWrapper>
                <Title>{ListItemLink(engine, result)} </Title>
                {result.raw.date && (
                  <DateWrapper>
                    {date.getDate() +
                      "/" +
                      (date.getMonth() + 1) +
                      "/" +
                      date.getFullYear()}
                  </DateWrapper>
                )}
              </TitltAndDateWrapper>
              {result.excerpt && (
                <Box pb={1}>
                  <Excerpt>{result.excerpt}</Excerpt>
                </Box>
              )}
            </TextWrapper>
          </MainWrapper>
        </Box>
      </ListItem>
      <div
        style={{
          width: "100%",
          height: "2px",
          background: "#E5E8E8",
        }}
      />
    </>
  );
};

export default PeopleResultTemplate;

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 10px 0px;
`;

const ImageWrapper = styled.div`
  padding: 10px;
  padding-left: 0px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconImage = styled.img`
  width: 100%;
  border-radius: 12px;
`;

const TextWrapper = styled.div`
  margin-left: 20px;
  flex: 4;
  /* height: 120px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin-top: 10px;
  font-family: inherit;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 20px;

  & a {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-weight: 400;
    text-decoration: none;
    color: ${Theme.resultLink};
  }

  & a:hover {
    text-decoration: underline;
  }
  @media (max-width: 480px) {
   font-size: 18px;
   & a {
    display: -webkit-box;
    -webkit-line-clamp: 2;
   }
  }
`;

const Excerpt = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 16px;
  color: ${Theme.excerpt};
  font-family: inherit;
  font-weight: 300px;
  @media (max-width: 480px) {
   font-size: 12px;
}
`;

const RecommendationBadge = styled.div`
  background: #f6f7f9;
  width: 100px;
  height: 20px;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${Theme.excerpt};
`;

const TitltAndDateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateWrapper = styled.p`
  font-size: 16px;
  color: ${Theme.excerpt};
  font-family: inherit;
  font-weight: 300px;
  width: 150px;
  display: flex;
  justify-content: flex-end;
  padding-left: 20px;
  @media (max-width: 480px) {
   font-size: 12px;
}
`;
const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 210px;
  justify-content: space-between;

`