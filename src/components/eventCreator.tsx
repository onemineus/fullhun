"use client";
import React from "react";
import type { DatePickerProps } from "antd";
import { DatePicker, Space, Input } from "antd";

const EventCreator = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div>
      <div className="flex flex-col space-y-4">
        <DatePicker onChange={onChange} />
        <Input placeholder="event name" />
      </div>
    </div>
  );
};

export default EventCreator;
