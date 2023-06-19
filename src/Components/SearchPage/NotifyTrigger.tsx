import {useEffect, useState, FunctionComponent, useContext} from 'react';
import {buildNotifyTrigger, NotifyTrigger as HeadlessNotifyTrigger} from '@coveo/headless';
import EngineContext from '../../common/engineContext';
import styled from 'styled-components' 


interface HeadlessNotifyTriggerProps {
  controller: HeadlessNotifyTrigger;
}
 
export const NotifyTriggerRenderer: FunctionComponent<HeadlessNotifyTriggerProps> = (
  props
) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);
 
  useEffect(() => controller.subscribe(() => updateState()), []);
 
  const updateState = () => {
    setState(props.controller.state);
  };
 
  return <Container dangerouslySetInnerHTML={{ __html: state.notification }} />;
};
 


const NotifyTrigger : FunctionComponent = ()=>{

const engine = useContext(EngineContext)!;

const controller = buildNotifyTrigger(engine);

return <NotifyTriggerRenderer controller = {controller} />;

};


export default NotifyTrigger;


const Container = styled.div`
display: flex;
justify-content: center;
`
