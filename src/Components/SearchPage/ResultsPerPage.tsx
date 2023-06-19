import {FunctionComponent, useState, useContext} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import {
  buildResultsPerPage,
  ResultsPerPage as HeadlessResultsPerPage,
} from '@coveo/headless';
import EngineContext from '../../common/engineContext';
import { ResultsPerPagesConfig } from '../../config/SearchConfig';

interface ResultsPerPageProps {
  options: number[];
  controller: HeadlessResultsPerPage;
}
const ResultsPerPageRenderer: FunctionComponent<ResultsPerPageProps> = (
  props
) => {
  const {controller, options} = props;
  const [selected, setSelected] = useState(options[0])

  return (
    <FormControl component="fieldset">
      <Typography>Results per page</Typography>
      <RadioGroup
        row
        value={selected}
        onChange={(event) => {
          setSelected(Number(event.target.value))
          controller.set(Number(event.target.value));
        }}
      >
        {options.map((numberOfResults) => (
          <FormControlLabel
            key={numberOfResults}
            value={numberOfResults}
            control={<Radio />}
            label={numberOfResults}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const ResultsPerPage = () => {
  const engine = useContext(EngineContext)!;
  const options = ResultsPerPagesConfig;
  
  const controller = buildResultsPerPage(engine, {
    initialState: {numberOfResults: options[0]},
  });
  return <ResultsPerPageRenderer controller={controller} options={options} />;
};
export default ResultsPerPage;
