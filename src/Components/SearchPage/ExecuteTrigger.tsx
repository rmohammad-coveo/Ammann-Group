import {
    buildExecuteTrigger,
    SearchEngine,
    ExecuteTriggerParams,
  } from '@coveo/headless';
import { useContext } from 'react';
import EngineContext from '../../common/engineContext';
   

  export function bindExecuteTrigger(engine: SearchEngine) {

    
    const controller = buildExecuteTrigger(engine);
    
   
    const executeFunction = () => {
      const {functionName, params} = controller.state;
   
      if (functionName === 'functionNameHere') {
        log(params);

      }
    };
   
    const log = (params: ExecuteTriggerParams) => {
      console.log('Function is called here',params)
    };
   
    const unsubscribe = controller.subscribe(() => executeFunction());
    return unsubscribe;
  }


  const ExecuteTrigger: React.FC = ()=>{

    const engine = useContext(EngineContext)!;
    bindExecuteTrigger(engine);

    return null
  }


  export default ExecuteTrigger;