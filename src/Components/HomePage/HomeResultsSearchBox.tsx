import { FunctionComponent, useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import {
  SearchBox as HeadlessSearchBox,
  StandaloneSearchBoxOptions,
  buildResultList,
  ResultList,
  buildSearchBox,
  loadSearchActions,
  loadSearchAnalyticsActions,
  loadQueryActions,
  Result,
} from "@coveo/headless";
import EngineContext from "../../common/engineContext";
import { useNavigate } from "react-router-dom";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import styled from "styled-components";
import { ClickAwayListener } from "@mui/material";
import { Theme } from "../../theme";
import Button from '@mui/material/Button';
import { Icon } from "react-icons-kit";
import { arrowLeft } from "react-icons-kit/feather/arrowLeft";

interface HomeResultsSearchBoxProps {
  searchBoxController: HeadlessSearchBox;
  toggleSearchBox: () => void;
}

const HomeResultsSearchBoxRenderer: FunctionComponent<
  HomeResultsSearchBoxProps
> = (props) => {
  const { searchBoxController } = props;
  const engine = useContext(EngineContext)!;
  const [state, setState] = useState(searchBoxController.state);
  const [searchTerm, setSearchTerm] = useState("");
  const [openPopper, setOpenPopper] = useState(false);

  let navigate = useNavigate();

  useEffect(
    () =>
      searchBoxController.subscribe(() => setState(searchBoxController.state)),
    [searchBoxController]
  );

  useEffect(() => {
    const unsub = setTimeout(async () => {
      const queryAction = loadQueryActions(engine);
      await engine.dispatch(
        queryAction.updateQuery({
          q: searchTerm,
          enableQuerySyntax: true,
        })
      );

      const analyticsAction = loadSearchAnalyticsActions(engine);
      const searchAction = loadSearchActions(engine);
      const searchSubmitAction = searchAction.executeSearch(
        analyticsAction.logSearchboxSubmit()
      );
      await engine.dispatch(searchSubmitAction);

      /* searchBoxController.submit() */
    }, 500);

    return () => clearTimeout(unsub);
  }, [searchTerm]);

  const onPressSearchButton = ()=>{
    navigate('/search');
    props.toggleSearchBox();
    searchBoxController.submit();
}

  return (
    <Container>
    <MainWrapper>
      <ClickAwayListener onClickAway={() => setOpenPopper(false)}>
        <>
          <TextField
            autoComplete="off"
            value={searchTerm}
            onChange={(event) => {
              const newInputValue = event.target.value;
              searchBoxController.updateText(newInputValue);
              setSearchTerm(newInputValue);
            }}
            onFocus={() => {
              setOpenPopper(true);
            }}
            onBlur={() => {
              setOpenPopper(false);
            }}
            className="home-search-box"
            placeholder="Search"
            size="small"
            onKeyDown={(e) => {
              if (
                e.code === "Enter" &&
                searchBoxController.state.value !== ""
              ) {
                props.toggleSearchBox();
                searchBoxController.submit();
                navigate("/search");
              }
            }}
          />
          <PopperStyledComponent
            hidden={!openPopper}
            style={{
              width: "140%",
            }}
          >
            <PopperMainWrapper>
              <PopperQSContainer>
                {state.suggestions.map((suggestion) => {
                  const matches = match(suggestion.rawValue, searchTerm);
                  const parts = parse(suggestion.rawValue, matches);
                  return (
                      <PopperQSListItem key = {suggestion.rawValue}>
                        <div
                          onMouseDown={(event) => {
                            event.stopPropagation();
                            searchBoxController.updateText(suggestion.rawValue);
                            setSearchTerm(suggestion.rawValue);
                            props.toggleSearchBox();
                            searchBoxController.submit();
                            navigate("/search");
                          }}
                        >
                          {parts.map((part, index) => (
                            <span
                              key={index}
                              style={{
                                fontWeight: part.highlight ? 400 : 300,
                              }}
                            >
                              {part.text}
                            </span>
                          ))}
                        </div>
                      </PopperQSListItem>
                  );
                })}
              </PopperQSContainer>
              <PopperResultsContainer>
                <PopperTitle>Featured Results</PopperTitle>
                <ResultContainer>
                  {engine.state.search.results.slice(0, 5).map((result, index) => {
                    return (
                      <PopperResultItem
                        key = {result.uniqueId}
                        onMouseDown={() => {
                          window.open(result.clickUri, "_blank");
                        }}
                      >
                        <PopperResultTitle
                          href={result.clickUri}
                          onMouseDown={() => {
                            window.open(result.clickUri, "_blank");
                          }}
                        >
                          {result.title}
                        </PopperResultTitle>
                        <PopperResultDescription>
                          {result.excerpt}
                        </PopperResultDescription>
                      </PopperResultItem>
                    );
                  })}
                  <PopperSeeMore onMouseDown={(event)=>{
                    event.stopPropagation();
                    props.toggleSearchBox();
                    searchBoxController.submit();
                    navigate("/search");
                  }}>See More Results</PopperSeeMore>
                </ResultContainer>
              </PopperResultsContainer>
              <PopperAdContainer>
                <PopperAdImage src="https://docs.citrix.com/assets/images/image-5.png" />
              </PopperAdContainer>
            </PopperMainWrapper>
          </PopperStyledComponent>
        </>
      </ClickAwayListener>
    </MainWrapper>
    <SearchButton type='submit' variant="contained" style={{height : '43px', marginLeft: '10px'}} onClick={onPressSearchButton}> {'<'} </SearchButton>

    </Container>
  );
};

interface SearchBoxType {
  toggleSearchBox: () => void;
}

const HomeResultsSearchBox = ({ toggleSearchBox }: SearchBoxType) => {

  const options: StandaloneSearchBoxOptions = {
    numberOfSuggestions: 8,
    redirectionUrl: "/search",
  };
  const engine = useContext(EngineContext)!;
  const searchBoxController = buildSearchBox(engine, { options });
  searchBoxController.updateText('');

  return (
    <HomeResultsSearchBoxRenderer
      searchBoxController={searchBoxController}
      toggleSearchBox={toggleSearchBox}
    />
  );
};

export default HomeResultsSearchBox;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
  z-index: 8;
  position: relative;
  width: 100%;
  
`;

const PopperStyledComponent = styled.div`
  background: white;

  border-radius: 6px;
  box-shadow: 0px 7px 13px -2px rgba(0, 0, 0, 0.45);
  /* padding: 10px; */
  position: relative;
`;

const PopperMainWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const PopperQSContainer = styled.div`
  flex: 2;
  margin: 10px 0px;
`;
const PopperResultsContainer = styled.div`
  flex: 3;
  border-left: 2px ${Theme.primaryText} solid;
  padding-bottom: 20px;
`;
const ResultContainer = styled.div`
  /*  padding: 0 15px; */
`;

const PopperQSListItem = styled.li`
  list-style: none;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
  }
  &.active {
    background-color: #e9e9e9;
  }
`;

const PopperResultTitle = styled.a`
  color: ${Theme.primaryText};
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const PopperResultDescription = styled.p`
  color: ${Theme.excerpt};
  font-size: 12px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const PopperTitle = styled.h3`
  color: ${Theme.primaryText};
  font-size: 16px;
  margin-bottom: 5px;
  margin-top: 10px;
  margin-left: 5px;
`;

const PopperAdContainer = styled.div`
  flex: 2;
  background: url("https://docs.citrix.com/assets/images/image-5.png") no-repeat;
  background: ${Theme.background};
`;

const PopperAdImage = styled.img`
  width: 100%;
`;

const PopperResultItem = styled.li`
  padding: 5px 15px;
  list-style: none;
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
  }
  &.active {
    background-color: #e9e9e9;
  }

  &:hover ${PopperResultTitle} {
    text-decoration: underline;
  }
`;


const PopperSeeMore = styled.span`
  font-size: 16px;
  font-family: inherit;
  display: flex;
  font-weight: 400;
  opacity: 0.8;
  justify-content: center;
  margin-top: 20px;
  transition: 0.1s ease-in-out all;
  cursor: pointer;
  &:hover{
    opacity: 1;
  }

  

`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const SearchButton = styled(Button)`
height: 43px;
border: 10px solid red;
`
