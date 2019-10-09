import React from "react";
import { useTheme } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

const ListView = props => {
  const getColor = (text) => {
    if (text === "1st") {
      return "#d4af37"
    }
    if (text === "2nd") {
      return "#c0c0c0"
    }
    if (text === "3rd") {
      return "#cd7f32"
    }
    if (text === "4th") {
      return "black"
    }
    if (text === "5th") {
      return "black"
    }
    else {
      return "white"
    }
  }
  return (
    <Box>
      <List
        style={{
          backgroundColor: "#19a33c",
          paddingTop: 0,
          paddingBottom: 0
        }}
        aria-label="main mailbox folders"
      >
        <ListItem >
          {props.columns.map((col, i1) => (
            <ListItemText key={i1} style={{ color: getColor(col.label), fontWeight: "bold" }}>
              {col.label}
            </ListItemText>
          ))}
        </ListItem>
        {props.items.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <Divider />
              <ListItem style={{ backgroundColor: "white" }}>
                {props.columns.map((col, i2) => (
                  <ListItemText style={{ flex: 1 }} key={i2}>
                    {item[col.key]}
                  </ListItemText>
                ))}
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>
      <Divider />
    </Box>
  );
};

export default ListView;
