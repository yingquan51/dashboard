import {useEffect, useState} from "react";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Card} from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import Grid from "@mui/material/Grid";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";

/**
 * 列表集合组件，每张列表都可以折叠
 * @param tableNames 表名
 * @param contents 表格
 * @param idx 默认展开的索引
 * @returns {JSX.Element}
 * @constructor
 */
export default function CollapseTables(name, tableNames, contents, idx) {
  const [len, setLen] = useState(tableNames.length);
  const [opens, setOpens] = useState(Array(len).fill(false));

  const handleClick = (index) => {
    let newOpens = opens.map((v, i) => i == index ? !opens[i] : opens[i]);
    setOpens(newOpens);
  };

  const getItem = (index, name, content) => {
    return (
      <Card key={index} sx={{mb: 0.5, overflow: 'visible'}}>
        <ListItemButton onClick={() => handleClick(index)}>
          <ListItemIcon>
            <TableChartIcon/>
          </ListItemIcon>
          <ListItemText primary={name}/>
          {opens[index] ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={opens[index]} timeout="auto" unmountOnExit>
          {content}
        </Collapse>
      </Card>
    );
  };

  useEffect(()=>{
    let newOpens = opens.map((v, i) => i == idx ? true : false); // 采用route方式仅打开一个表格，其他表格都关闭
    setOpens(newOpens);
  }, [idx])

  return (
    <Grid container justifyContent="center" sx={{height: "100%" }} columns={{ xs: 4, md: 8, sm:12}}>
      <Grid item xs={12} lg={8} sm={10} >
        <Grid container justifyContent="center" mt={0}>
          <SoftTypography variant="h3" fontWeight="bold" mb={2}>
            {name}
          </SoftTypography>
        </Grid>
        <List
          // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          sx={{width: "95%"}}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {opens.map((value, index) => getItem(index, tableNames[index], contents[index]))}
        </List>
      </Grid>
    </Grid>
  );
}