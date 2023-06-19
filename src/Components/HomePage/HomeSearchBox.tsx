import {FunctionComponent, useEffect, useState, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  SearchBox as HeadlessSearchBox,
  StandaloneSearchBoxOptions,
  buildStandaloneSearchBox
} from '@coveo/headless';
import EngineContext from '../../common/engineContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Icon } from "react-icons-kit";
import { chevronRight } from "react-icons-kit/feather/chevronRight";


interface SearchBoxProps {
  controller: HeadlessSearchBox;
  toggleSearchBox : ()=>void;
}

const SearchBoxRenderer: FunctionComponent<SearchBoxProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);
  let navigate = useNavigate();

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

 const onPressSearchButton = ()=>{
      navigate('/search');
      props.toggleSearchBox();
      controller.submit();
 }


  return (
    <Container >
    <Autocomplete
      inputValue={state.value}
      onInputChange={(_, newInputValue) => {
        controller.updateText(newInputValue);
      }}
      onChange={() => {
          if (controller.state.value !== '')
          {
            props.toggleSearchBox();
            controller.submit();
            navigate('/search');
          }
      }}
      options={state.suggestions.map((suggestion) => suggestion.rawValue)}
      freeSolo
      style={{width: '100%'}}
      renderInput={(params) => (
        <TextField {...params} className='home-search-box' placeholder="Search" size="small" 
        sx={{'backgroundColor':'white', "borderRadius":"0", "maxWidth":"1000px", "width": "100%", ":active": {"borderColor": "#F00000"}}} />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option, inputValue);
        const parts = parse(option, matches);
        return (
          <li {...props}>
            <div>
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
          </li>
        );
      }}
    />
    <SearchButton type='submit' variant="contained" style={{height : '43px'}} onClick={onPressSearchButton}> <Icon icon={chevronRight} size={30}/> </SearchButton>
    </Container>
  );
};

interface  SearchBoxType {
    toggleSearchBox : ()=>void
}

const SearchBox = ({toggleSearchBox}: SearchBoxType) => {
  const options: StandaloneSearchBoxOptions = {numberOfSuggestions: 8, redirectionUrl: '/search'};
  const engine = useContext(EngineContext)!;
  const controller = buildStandaloneSearchBox(engine, {options});
  controller.updateText('');
  return <SearchBoxRenderer controller={controller} toggleSearchBox = {toggleSearchBox} />;
};

export default SearchBox;


const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const SearchButton = styled(Button)`
height: 43px;
margin-left: 8px;
background-color: #F00000;
border-radius: 0;
&:hover{
  background-color: #a40000;
}
`
