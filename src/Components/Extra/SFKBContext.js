import React,{useState} from 'react';


export const SFKBContext = React.createContext();



const SFKBProvider = ({children})=>{

    const [result, setResult] = useState(null);

    return <SFKBContext.Provider value = {{result, setResult}}>
        {children}
    </SFKBContext.Provider>
}


export default SFKBProvider;