import React,{useContext, useEffect, useState} from 'react';
import EngineContext from '../../common/engineContext';
import { SFKBContext } from './SFKBContext';
import { useParams } from 'react-router-dom';
import { buildStaticFilter } from '@coveo/headless';



const SFKBArticleRenderer = ({engine,sfid, controller})=>{
const [state, setState] = useState({});
    
    useEffect(()=>{
       const unsub =  engine.subscribe(()=>{
            if(!engine.state.search.isLoading){
                engine.state.search.results.forEach((item)=>{
                    if(item.raw.sfid === sfid){
                        setState(item)
                    }
                })
                
            }
        })

        return ()=>{
            unsub()
            controller.toggleSingleSelect(controller.state.values[1])
        
        }
        
    },[engine,sfid])

    return <>
    {state.title && state.raw.sfanswer__c && <>
    <h1>{state.title ? state.title : null}</h1>
    <div dangerouslySetInnerHTML={{ __html: state.raw.sfanswer__c }} />
    </>}
    </>
}

const SFKBArticle = ()=>{

    const engine = useContext(EngineContext);
    const {sfid} = useParams();

    const controller = buildStaticFilter(engine,{options: {
        id : 'heello',
        values : [{
            caption : 'salesforceKB',
            expression : `@sfid==${sfid}`,
            state : 'selected'
        },{
            caption : 'initial',
            expression : ``,
            state : 'idle'
        }]
    }})
        

        useEffect(()=>{
            engine.executeFirstSearch();
        },[sfid])

    return<SFKBArticleRenderer engine = {engine} sfid={sfid} controller = {controller}/>
};


export default SFKBArticle;