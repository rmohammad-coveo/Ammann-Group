import React, { useContext, useEffect, useState } from "react";
import usePersistedState from "../../customHooks/usePersistedState";
import { InitialData, KEY_NAME_CONTEXT_DATA, KEY_NAME_PROFILE_SELECTED } from "./InitialData";
import EngineContext from "../../common/engineContext";
import { buildContext } from "@coveo/headless";


export const settingContextFromEngineFirstTime = (engine) => {
  const controller = buildContext(engine);
  const SavedContextData =  JSON.parse(window.localStorage.getItem(KEY_NAME_CONTEXT_DATA));
  const SavedProfileSelected = JSON.parse(window.localStorage.getItem(KEY_NAME_PROFILE_SELECTED));
  const ContextData = SavedContextData !== null? SavedContextData : InitialData
  const profileSelected =  SavedProfileSelected !== null? SavedProfileSelected : InitialData[0].name


  const filterdProfile = ContextData.filter(
    (item) => item.name === profileSelected
  );

  const filterdContext = filterdProfile[0].context;

  let ContextSetObject = {};

  filterdContext.forEach((item) => {
    if (item.active && item.keyName && item.keyValue) {
      ContextSetObject[item.keyName] = item.keyValue.includes(',')? item.keyValue.split(',') : item.keyValue;
    }
  });
  controller.set(ContextSetObject);
};


export const CustomContextContext = React.createContext();

const CustomContextProvider = ({ children }) => {
  const [profileSelected, setProfiledSelected] = usePersistedState(
    KEY_NAME_PROFILE_SELECTED,
    InitialData[0].name
  );
  const [ContextData, setContextData] = usePersistedState(
    KEY_NAME_CONTEXT_DATA,
    InitialData
  );

  const engine = useContext(EngineContext);
  const controller = buildContext(engine);

  const settingContext = () => {
    const filterdProfile = ContextData.filter(
      (item) => item.name === profileSelected
    );

    const filterdContext = filterdProfile[0].context;

    let ContextSetObject = {};

    filterdContext.forEach((item) => {
      if (item.active && item.keyName && item.keyValue) {
        ContextSetObject[item.keyName] = item.keyValue.includes(',')? item.keyValue.split(',') : item.keyValue;
      }
    });
    controller.set(ContextSetObject);
  };

  const settingContextFromEngine = (engine) => {
    const controller = buildContext(engine);
    const filterdProfile = ContextData.filter(
      (item) => item.name === profileSelected
    );

    const filterdContext = filterdProfile[0].context;

    let ContextSetObject = {};

    filterdContext.forEach((item) => {
      if (item.active && item.keyName && item.keyValue) {
        ContextSetObject[item.keyName] = item.keyValue.includes(',')? item.keyValue.split(',') : item.keyValue;
      }
    });
    controller.set(ContextSetObject);
  };

  useEffect(() => {
    settingContext();
  }, [profileSelected]);

  const getProfile = () => {
    const filterdProfile = ContextData.filter(
      (item) => item.name === profileSelected
    )[0];

    return filterdProfile;
  };

  const handleSave = () => {
    settingContext();
    window.location.reload();
  };

  return (
    <CustomContextContext.Provider
      value={{
        profileSelected,
        setProfiledSelected,
        ContextData,
        setContextData,
        settingContext,
        handleSave,
        getProfile,
        settingContextFromEngine,
      }}
    >
      {children}
    </CustomContextContext.Provider>
  );
};

export default CustomContextProvider;



