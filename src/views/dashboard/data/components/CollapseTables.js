import { useState } from "react";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Card } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import Grid from "@mui/material/Grid";

/**
 * 列表集合组件，每张列表都可以折叠
 * @param names 表名
 * @param contents 表格
 * @returns {JSX.Element}
 * @constructor
 */
export default function CollapseTables(names, contents) {
  const len = Math.min(names.length, contents.length);
  const [opens, setOpens] = useState(Array(len).fill(false));

  const handleClick = (index) => {
    let newOpens = opens.map((v, i) => i == index ? !opens[i] : opens[i]);
    setOpens(newOpens);
  };

  const getItem = (index, name, content) => {
    return (
      <Card key={index}>
        <ListItemButton onClick={() => handleClick(index)}>
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText primary={name} />
          {opens[index] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={opens[index]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              {content}
            </ListItemButton>
          </List>
        </Collapse>
      </Card>
    );
  };

  return (
    <Grid container justifyContent="center" sx={{ height: "100%" }}>
      <Grid item xs={12} lg={8}>
        <List
          // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          sx={{ width: "95%" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              病人详情信息
            </ListSubheader>
          }>
          {opens.map((value, index) => getItem(index, names[index], contents[index]))}
        </List>
      </Grid>
    </Grid>
  );
}