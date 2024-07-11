import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";

import events from "./events";
import moment from "moment";

moment.locale("en-GB");

export const MyCalendar = () => {
  const [eventsData, setEventsData] = useState(events);

  let DefDate = Date.now();

  const [startDate, setStartDate] = useState(DefDate);
  const [endDate, setEndDate] = useState(DefDate);
  const [price, setPrice] = useState([]);
  const [dataArr, setDataArr] = useState([]);

  console.log(startDate, "main startDate ");
  console.log(endDate, "main  endDate");

  const handleSelect = ({ start, end }: any) => {
    var dateArray = new Array();
    var currentDate = start;
    while (currentDate <= end) {
      dateArray.push(new Date(currentDate));
      currentDate = moment(currentDate).add(1, "days");
    }
    const arr: any = [];

    const title = window.prompt("price");

    dateArray.map((el) => {
      arr.push({ start: el, end: el, title });
    });
    setPrice([...new Set(dataArr)]);
    if (title) setEventsData([...eventsData, ...arr]);
  };

  const handleClickDelete = (e: any) => {
    const replace = eventsData.filter((x) => x !== e);
    setEventsData(replace);
  };
  const onHandleDelete = (e: any) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this file?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                handleClickDelete(e);
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };
  return (
    <div style={{ display: "flex", height: "50vh" }} className="App">
      <FullCalendar
        selectable
        plugins={[daygridPlugin]}
        // eventClick={(e: any) => {
        //   console.log({ e }, "onSelectSlot");
        //   setStartDate(e.start);
        //   setEndDate(e.end);
        //   handleSelect(e);
        // }}
        select={(e: any) => {
          console.log({ e }, "onSelectSlot");
          setStartDate(e.start);
          setEndDate(e.end);
          handleSelect(e);
        }}
        // defaultView="month"
        events={eventsData}
      />
    </div>
  );
};
