import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { initializeHeadlessEngine } from "./common/Engine";
import { SearchEngine } from "@coveo/headless";
import HomePage from "./Components/HomePage/HomePage";
import NavBar from "./Components/HomePage/NavBar";
import Header from "./Components/HomePage/Header";
import { EngineProvider } from "./common/engineContext";
import SearchPage from "./Components/SearchPage/SearchPage";
import Footer from "./Components/HomePage/Footer";
import FacetControllerProvider from "./Components/SearchPage/Facet/FacetContext";
import QuickViewModal from "./Components/SearchPage/QuickViewModal";
import QuickViewModalProvider from "./Components/SearchPage/QuickViewModalContext";
import CustomContextProvider, { settingContextFromEngineFirstTime } from "./Components/CustomContext/CustomContextContext";
import { AtomicSearchInterface } from "@coveo/atomic-react";
import { Theme } from "./theme";

export default function App() {
  const [engine, setEngine] = React.useState<SearchEngine | null>(null);

  useEffect(() => {
    initializeHeadlessEngine().then((engine) => {
      settingContextFromEngineFirstTime(engine)
      setEngine(engine);
    }); 
  }, []);


    

  return (
    <>
      {engine ? (
        <EngineProvider value={engine}>
          <AtomicSearchInterface engine = {engine} >
            <style>
              {myStyles}
            </style>
          <FacetControllerProvider>
            <QuickViewModalProvider>
              <CustomContextProvider>
                <Router>
                  <NavBar />
                  <Header />
                  <QuickViewModal />
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Navigate
                          to={isEnvValid() === true ? "/home" : "/error"}
                          replace
                        />
                      }
                    />
                    <Route path="/home" element={<HomePage />} />
                    <Route
                      path="/search"
                      element={<SearchPage engine={engine} />}
                    />
                    <Route
                      path="/search/:filter"
                      element={<SearchPage engine={engine} />}
                    />
                    {/* <Route path="/salesforcekb/:sfid" element={<SFKBArticle/>} /> */}
                    <Route path="/error" element={<Error />} />
                  </Routes>
                  <Footer />
                </Router>
              </CustomContextProvider>
            </QuickViewModalProvider>
          </FacetControllerProvider>
          </AtomicSearchInterface>
        </EngineProvider>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

const isEnvValid = () => {
  const variables = [
    "REACT_APP_PLATFORM_URL",
    "REACT_APP_ORGANIZATION_ID",
    "REACT_APP_API_KEY",
    "REACT_APP_USER_EMAIL",
    "REACT_APP_SERVER_PORT",
  ];
  const reducer = (previousValue: boolean, currentValue: string) =>
    previousValue && Boolean(process.env[currentValue]);
  return variables.reduce(reducer, true);
};

const Error = () => {
  return (
    <Box height="100vh" display="flex" align-items="center">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={9} sm={11}>
          <div className="container">
            <Typography variant="h4" color="error">
              Invalid Environment variables
            </Typography>
            <Typography variant="body1">
              You should have a valid <code>.env</code> file at the root of this
              project. You can use <code>.env.example</code> as starting point
              and make sure to replace all placeholder variables
              <code>&#60;...&#62;</code> by the proper information for your
              organization.
            </Typography>
            <p>
              Refer to the project <b>README</b> file for more information.
            </p>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};


const myStyles = `
:root {
  --atomic-font-family: inherit;
  --atomic-primary : ${Theme.selection};
  --atomic-on-background : ${Theme.primaryText};
 }



`