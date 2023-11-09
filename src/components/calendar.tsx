"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { storage } from "@/db/db";
import { EventImpl } from "@fullcalendar/core/internal";
import { useHMSActions, useHMSStore, selectPeers } from "@100mslive/react-sdk";
import { triggerHms } from "@/utils/hms";

const Calendar = () => {
  const hmsActions = useHMSActions();
  const [isClicked, setIsClicked] = useState(false);
  const [eventData, setEventData] = useState<EventImpl | null>(null);

  useEffect(() => {
    window.onunload = () => {
      // closing the stream
      hmsActions.leave();
    };
  }, [hmsActions]);

  return (
    <div className="w-full h-full">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={storage}
        eventClick={(info) => {
          console.log(info.event);
          setEventData(info.event);
          setIsClicked(!isClicked);
        }}
        // editable={true}
        eventContent={RenderEventContent}
        selectable={true}
        // dayMaxEvents={true} // alternatively, use the `events` setting to fetch from a feed
      />
      {isClicked ? (
        <div
          onClick={(e) => {
            setIsClicked(false);
          }}
          className="fixed top-0 left-0 h-screen w-screen z-10 flex justify-center items-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-zinc-700 items-center justify-center h-40 w-48 flex flex-col"
          >
            {eventData?.title}
            <button
            className="bg-zinc-950 rounded-xl px-3 py-1"
              onClick={(e) => {
                if (eventData) {
                  triggerHms(hmsActions, eventData);
                  setIsClicked(false);
                }
              }}
            >
              join now
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Calendar;
function RenderEventContent(eventInfo: any) {
  return (
    <div className="bg">
      <i>{eventInfo.event?.title}</i>
    </div>
  );
}
