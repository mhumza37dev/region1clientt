import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function Voters() {
  const [responsive, setResponsive] = useState("simple");
  const [tableBodyHeight, setTableBodyHeight] = useState("350px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

  const [data, setData] = useState();

  const getVoters = async () => {
    const response = await fetch("https://region1server.herokuapp.com/voters");
    const data1 = await response.json();
    console.log(data1);
    setData(data1);
  };

  useEffect(() => {
    getVoters();
    return () => {};
  }, []);

  const columns = ["Fullname", "constituency", "PollingStation_Id"];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
  };

  return (
    <React.Fragment>
      <div style={{ margin: "1%" }}>
        {!data ? (
          <h1>loading.......</h1>
        ) : (
          <MUIDataTable
            title={"Voter's List"}
            data={data}
            columns={columns}
            options={options}
          />
        )}
      </div>
    </React.Fragment>
  );
}
