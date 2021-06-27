import React from "react";
import { useLoading, Grid } from "@agney/react-loading";

export default function App() {
  const { containerProps, indicatorEl } = useLoading({
    indicator: <Grid width="100" style={{ color: "green", margin: "AUTO" }} />,
    loaderProps: {
      valueText: "Please Wait we are trying to Cast",
    },
  });
  return <section {...containerProps}>{indicatorEl}</section>;
}
