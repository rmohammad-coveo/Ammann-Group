import React,{useContext, useState, useEffect} from 'react';
import {Facet as HeadlessFacet, buildFacet} from '@coveo/headless';
import { FacetConfig } from '../../../config/SearchConfig';
import EngineContext from '../../../common/engineContext';

export type FacetContextType =  {
    facetController: {[x:string] : HeadlessFacet} ,
    setFacetController : (state : {[x:string] : HeadlessFacet})=> void
}


export const FacetContext = React.createContext<FacetContextType>({
    facetController : {},
    setFacetController : ()=>{}
});

const FacetControllerProvider : React.FC = ({children})=>{

    const [facetController, setFacetController] = useState<{[x:string] : HeadlessFacet}>({})
    const engine = useContext(EngineContext)!


    useEffect(()=>{
        FacetConfig.map((item)=>{

            let controller : HeadlessFacet  = buildFacet(engine, {
                options: {
                  numberOfValues: 5,
                  field: item.field,
                  facetId: `${item.field}`
                },
              });

              const update =<T,> (prev : T): T=>{
                return {...prev, [item.field] : controller}
              }
      
              setFacetController(update);

        })

    },[]) 


    return<FacetContext.Provider value = {{facetController, setFacetController}}>
            {children}
    </FacetContext.Provider>
};

export default FacetControllerProvider