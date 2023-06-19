import {FunctionComponent, useEffect, useState, useContext} from 'react';
import {
  buildQuerySummary,
  QuerySummary as HeadlessQuerySummary,
} from '@coveo/headless';
import {Box, Divider} from '@mui/material';
import EngineContext from '../../common/engineContext';

interface QuerySummaryProps {
  controller: HeadlessQuerySummary;
}

const QuerySummaryRenderer: FunctionComponent<QuerySummaryProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const renderNoResults = () => {
    return <Box mt={5}>No results</Box>;
  };

  const renderText = (input: string) => {
    return (
      <Box component="span">
        {input}
      </Box>
    );
  };

  const renderRange = () => {
    return renderText(` ${state.firstResult}-${state.lastResult}`);
  };

  const renderTotal = () => {
    return <Box component="span"> of {renderText(state.total.toString())}</Box>;
  };

  const renderQuery = () => {
    if (state.hasQuery) {
      return <Box component="span"> for {renderText(state.query)}</Box>;
    }
  };

  const renderDuration = () => {
    return ` in ${state.durationInSeconds} seconds`;
  };

  const renderHasResults = () => {
    return (
      <Box>
        <Box fontWeight="300">
          Results{renderRange()}
          {renderTotal()}
          {renderQuery()}
          {renderDuration()}
        </Box>
        <Divider />
      </Box>
    );
  };

  return !state.hasResults && state.firstSearchExecuted ? renderNoResults() : renderHasResults();
};

const QuerySummary = () => {
  const engine = useContext(EngineContext)!;
  const controller = buildQuerySummary(engine);
  return <QuerySummaryRenderer controller={controller} />;
};

export default QuerySummary;
