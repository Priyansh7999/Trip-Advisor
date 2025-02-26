import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

const BasicDatePicker = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label || "Select Date"}
        value={value}  // Pass the value prop to DatePicker
        onChange={(newValue) => onChange(newValue)}  // Ensure the onChange updates the parent state
        renderInput={(params) => (
          <TextField {...params} fullWidth variant="outlined" />
        )}
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
