import {
  FunctionComponent,
  useEffect,
  useState,
  useContext,
  memo,
} from "react";
import {
  Facet as HeadlessFacet,
  buildFacet,
  FacetValue,
} from "@coveo/headless";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import "./Facet.css";
import {
  Collapse,
  Divider,
  ListItem,
  ListItemText,
  Typography,
  capitalize,
} from "@mui/material";
import EngineContext from "../../../common/engineContext";
import { FacetContext } from "./FacetContext";
import styled from "styled-components";
import { chevronDown } from "react-icons-kit/feather/chevronDown";
import { chevronUp } from "react-icons-kit/feather/chevronUp";
import { Icon } from "react-icons-kit";
import { red } from "@mui/material/colors";

interface FacetProps {
  title: string | undefined;
  field: string;
}

interface FacetRendererProps extends FacetProps {
  controller: HeadlessFacet;
}

const FacetRenderer: FunctionComponent<FacetRendererProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);
  const [collapse, setCollapse] = useState(true);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const toggleSelect = (value: FacetValue) => {
    controller.toggleSelect(value);
  };

  const showMore = () => {
    controller.showMoreValues();
  };

  const showLess = () => {
    controller.showLessValues();
  };
  return (
        <>
          {state.values.length > 0 ? (
            <Wrapper>
              <Box mb={0} mr={3} p={1}>
                <Box
                  pb={1}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" component="h6">
                    {props.title}
                  </Typography>
                  <div
                    onClick={() => setCollapse(!collapse)}
                    style={{ cursor: "pointer" }}
                  >
                    {!collapse ? (
                      <Icon icon={chevronDown} size={20} />
                    ) : (
                      <Icon icon={chevronUp} size={20} />
                    )}
                  </div>
                </Box>
                <Divider />
                <Collapse in={collapse}>
                  <List dense>
                    {state.values.map((value: FacetValue) => {
                      const labelId = `checkbox-list-label-${value}`;

                      return (
                        <ListItem
                          style={{ padding: 0 }}
                          key={value.value}
                          role={undefined}
                          button
                          onClick={() => toggleSelect(value)}
                        >
                          <Checkbox
                            size="small"
                            edge="start"
                            checked={controller.isValueSelected(value)}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                            sx={{color: red[500], '&.Mui-checked': {color: red[500]}}}
                          />
                          <ListItemText
                            className="truncate inline"
                            primary={`${value.value}`}
                            secondary={`(${value.numberOfResults})`}
                            sx={{textTransform:"capitalize"}}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                  {state.canShowLessValues && (
                    <Button size="small" onClick={() => showLess()}>
                      Show Less
                    </Button>
                  )}
                  {state.canShowMoreValues && (
                    <Button size="small" onClick={() => showMore()}>
                      Show More
                    </Button>
                  )}
                </Collapse>
              </Box>
            </Wrapper>
          ) : null}
        </>
  );
};

const Facet: FunctionComponent<FacetProps> = (props) => {
  const { facetController } = useContext(FacetContext)!;
  const engine = useContext(EngineContext)!;
  let controller: HeadlessFacet = facetController[props.field]
    ? facetController[props.field]
    : buildFacet(engine, {
        options: {
          numberOfValues: 5,
          field: props.field,
        },
      });

  return (
    <FacetRenderer
      {...props}
      controller={controller}
    />
  );
};

export default memo(Facet);

const Wrapper = styled.div`
  border: 1px #e5e8e8 solid;
  padding: 24px 16px;
  margin-bottom: 20px;
  font-family: inherit;
`;
