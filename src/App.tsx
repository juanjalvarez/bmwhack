import React from "react";
import { CarItemObject, carList } from "./dataConverter";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const PHOTO_HEIGHT = 100;

function App() {
  return (
    <div
      className="ag-theme-alpine"
      style={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <ReactDataGrid
        style={{ width: window.innerWidth, height: window.innerHeight }}
        rowHeight={PHOTO_HEIGHT}
        dataSource={carList.filter((car) => {
          return (
            [
              // car.bodyStyle === "Coupe",
              car.orderStatus === "1",
              Boolean(car.imgURL),
            ].indexOf(false) === -1
          );
        })}
        defaultGroupBy={["bodyStyle"]}
        columns={[
          {
            name: "modelYear",
            header: <span>Year</span>,
          },
          {
            name: "bodyStyle",
            header: <span>Body</span>,
          },
          {
            name: "price",
            header: <span>Price</span>,
            type: "number",
            render: (a: { data: CarItemObject }) => {
              return (
                <h2>
                  <b>{usdFormatter.format(a.data.price)}</b>
                </h2>
              );
            },
          },
          {
            name: "location",
            header: <span>Location</span>,
          },
          {
            name: "link",
            header: <span>Link</span>,
            render: (a: { data: CarItemObject }) => {
              if (!a.data.link) {
                return <span>No URL</span>;
              }
              return (
                <a href={a.data.link} target="_blank" rel="noreferrer">
                  link
                </a>
              );
            },
          },
          {
            name: "imgURL",
            header: <span>Photo</span>,
            flex: 1,
            render: (a: { data: CarItemObject }) => {
              return (
                <img
                  alt={a.data.vin}
                  src={a.data.imgURL}
                  style={{
                    height: PHOTO_HEIGHT,
                  }}
                />
              );
            },
          },
        ]}
      />
    </div>
  );
}

export default App;
