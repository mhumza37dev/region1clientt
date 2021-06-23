import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function Candidate() {
  const [responsive, setResponsive] = useState("simple");
  const [tableBodyHeight, setTableBodyHeight] = useState("350px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

  const [data, setData] = useState();

  const fakeData = [
    {FullName:"Gabby George",Party: "Business Analyst", Constituency: "Minneapolis"},
    {FullName:"Jaden Collins"},
    {FullName:"Franky Rees"},
    {FullName:"Aaren Rose"},
    {FullName:"Johnny Jones"},
    {FullName:"Jimmy Johns"},
    {FullName:"Jack Jackson"},
    {FullName:"Joe Jones"},
    {FullName:"Jacky Jackson"},
    {FullName:"Jo Jo"},
    {FullName:"Donna Marie"},
  ];
  const getVoters = async () => {
    const response = await fetch("https://region1server.herokuapp.com/candidates");
    const data1 = await response.json();
    console.log(data1);
    setData(data1);
  };

  useEffect(() => {
    console.log('USE')
getVoters();
  }, []);
  // useEffect(() =>{

  // },[data])

  const columns = ["Fullname", "constituency"];

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
          {!data ? <h1>loading.......</h1> :
        <MUIDataTable
          title={"Candidate's List"}
          data={data}
          columns={columns}
          options={options}
        />
    }
      </div>
    </React.Fragment>
  );
}
