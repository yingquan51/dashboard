import IdCell from "../components/IdCell";
import DefaultCell from "../components/DefaultCell";

const getIdCell = ({ value }) => <IdCell id={value ? value.toString() : ""} />;

const getDefaultCell = ({ value }) => <DefaultCell value={value ? value.toString() : ""} />;

const getColumnCells = (columns) => {
  const res = [];
  columns.forEach((v, i) => {
    res[i] = {
      Header: v,
      accessor: "",
      Cell: i == 0 ? getIdCell : getDefaultCell,
    }
  })
  return res;
}

export {
  getIdCell,
  getDefaultCell,
  getColumnCells
};