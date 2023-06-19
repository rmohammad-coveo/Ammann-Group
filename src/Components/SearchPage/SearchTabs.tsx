import React, { useEffect, useContext } from "react";
import { buildTab, Tab } from "@coveo/headless";
import EngineContext from "../../common/engineContext";
import styled from "styled-components";
import { Theme } from "../../theme";
import { useNavigate } from "react-router-dom";
import { SearchPageTabConfig } from "../../config/SearchConfig";
import { SearchPageTabConfigType } from "../../config/Types/ConfigTypes";


const isRouteMatching  = (param : string, caption : string) => {
  if (!param && caption === SearchPageTabConfig[0].caption) {
    return true;
  }
  return (
    (param && caption.replace(/\s/g, "").toLowerCase() === param.toLowerCase())? true : false
  );
};


interface SearchTabType {
  item : SearchPageTabConfigType,
  controller : Tab,
  selected : boolean 
}


export const SearchTab: React.FC<SearchTabType> = ({ controller, item, selected }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (selected) {
      controller.select();
    }
  }, []);

  return (
    <TabTitle
      key={item.caption}
      onClick={() => {
        navigate(`/search/${item.caption.replace(/\s/g, "")}`);
        if (!selected) {
          controller.select();
        }
      }}
      isActive={selected}
    >
      {item.caption}
    </TabTitle>
  );
};


interface SearchTabsType {
  filterSelected : string
}

const SearchTabs : React.FC<SearchTabsType> = ({ filterSelected }) => {
  const engine = useContext(EngineContext)!;

  return (
    <Wrapper>
      {SearchPageTabConfig.map((item) => {
        const controller = buildTab(engine, {
          options: {
            id: item.caption,
            expression: item.expression,
          },
        });

        return (
          <React.Fragment key = {item.caption}>
          <SearchTab
            item={item}
            controller={controller}
            selected={isRouteMatching(filterSelected, item.caption)}
          ></SearchTab>
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: ${Theme.navbar};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  flex-wrap: wrap;
`;

const TabTitle = styled.a<{isActive : boolean }>`
  padding: 15px 20px;
  text-align: center;
  color: ${Theme.secondaryText};
  cursor: pointer;
  font-family: inherit;
  background: ${(props) => (props.isActive ? '#ff2626' : null)};
  opacity: ${(props) => (props.isActive ? 1 : 0.8)};
  transition: 0.2s ease-in-out all;
  &:hover {
    opacity: 1;
  }
`;

export default SearchTabs;
