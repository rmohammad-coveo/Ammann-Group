import {FunctionComponent, useEffect, useState, useContext} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  buildSearchBox,
  SearchBox as HeadlessSearchBox,
  SearchBoxOptions,
} from '@coveo/headless';
import EngineContext from '../../common/engineContext';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { Icon } from "react-icons-kit";
import { chevronRight } from "react-icons-kit/feather/chevronRight";


interface SearchBoxProps {
  controller: HeadlessSearchBox;
}

const SearchBoxRenderer: FunctionComponent<SearchBoxProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const onPressSearchButton = ()=>{
    controller.submit();
  }


  return (
    <Container>
    <Autocomplete
      inputValue={state.value}
      onInputChange={(_, newInputValue) => {
        controller.updateText(newInputValue);
      }}
      onChange={() => {
        controller.submit();
      }}
      options={state.suggestions.map((suggestion) => suggestion.rawValue)}
      freeSolo
      style={{width: '100%', background: 'white'}}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search" size="small" className='search-box'
        sx={{'backgroundColor':'white', "borderRadius":"0", "maxWidth":"1000px", "width": "100%", ":active": {"borderColor": "#F00000"}}}/>
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
    <SearchButton type='submit' variant="contained" style={{height : '43px', marginLeft: '10px'}} onClick={onPressSearchButton}><Icon icon={chevronRight} size={30} /></SearchButton>
    </Container>
  );
};

const SearchBox = () => {
  const options: SearchBoxOptions = {numberOfSuggestions: 8};
  const engine = useContext(EngineContext)!;
  const controller = buildSearchBox(engine, {options});

// This is added to fix a bug which does not allow to see query suggestion on first click.  
  if(controller.state.value === ""){
    controller.updateText('');
  }
  
  return <SearchBoxRenderer controller={controller} />;
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
