import IdCell from "../components/IdCell";
import DefaultCell from "../components/DefaultCell";

const getIdCell = ({ value }) => <IdCell id={value ? value.toString() : ""} />;

const getDefaultCell = ({ value }) => <DefaultCell value={value ? value.toString() : ""} />;

const getColumnCells = (table) => {
  const res = [];
  const columns = table.columns, fields = table.fields;
  const len = Math.min(columns.length, fields.length);
  for (let i = 0; i < len; i++) {
    res[i] = {
      Header: columns[i],
      accessor: fields[i],
      Cell: i == 0 ? getIdCell : getDefaultCell,
    }
  }
  return res;
}

export {
  getIdCell,
  getDefaultCell,
  getColumnCells
};