import Box from "@mui/material/Box";
import Facet from "./Facet";
import { useParams } from "react-router-dom";
import { FacetConfig, SearchPageTabConfig } from "../../../config/SearchConfig";
import React from "react";

const FacetList = () => {
  const { filter } = useParams();

  return (
    <Box>
      <Box px={1} pb={1} mt={4}>
        {/*         <Typography variant="overline">Refined By</Typography> */}
        {SearchPageTabConfig.length > 0 && SearchPageTabConfig !== undefined ? (
          <>
            {SearchPageTabConfig.map((item, index) => {
              if (
                (item.facetToInclude &&
                  filter?.toLowerCase() ===
                    item.caption.replace(/\s/g, "").toLowerCase()) ||
                (index === 0 && filter === undefined && item.facetToInclude)
              ) {
                return (
                  <React.Fragment key={item.caption}>
                    {item.facetToInclude.map((item) => {
                      return (
                        <React.Fragment key={item}>
                          <Facet
                            field={item}
                            title={FacetConfig.find((x) => x.field === item)?.title}
                          />
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                );
              }
            })}
          </>
        ) : (
          <>
            {FacetConfig.map((item) => {
              return (
                <React.Fragment key={item.field}>
                  <Facet field={item.field} title={item.title} />
                </React.Fragment>
              );
            })}
          </>
        )}
      </Box>
    </Box>
  );
};

export default FacetList;
