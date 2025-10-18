import { Controller, useFormContext } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import { useState } from "react";

type Props = {
  name: string;
};

export default function FormTimePicker({ name }: Props) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TimePicker
            format="HH:mm"
            open={open}
            ampm={false}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            value={field.value ? dayjs(field.value, "HH:mm") : null}
            onChange={(newValue) => {
              field.onChange(newValue ? newValue.format("HH:mm") : "");
            }}
            slotProps={{
              textField: {
                placeholder: "00:00",
                fullWidth: true,
                size: "small",
                onFocus: () => setOpen(true),
                inputProps: {
                  // дає цифрову клавіатуру на мобільних
                  inputMode: "numeric",
                },
                InputProps: {
                  sx: {
                    "& fieldset": {
                      display: "none",
                    },

                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    padding: "18px 16px",
                    height: "52px",
                    fontSize: "16px",
                    outline: "none",

                    border: "1px solid rgba(17, 16, 28, 0.1)",
                    "&:hover": {
                      border: "1px solid #989b43",
                      boxShadow: "0 0 0 4px rgba(78,70,180,0.2)",
                    },
                    "&.Mui-focused": {
                      border: "1px solid #989b43",
                      boxShadow: "0 0 0 4px rgba(78,70,180,0.2)",
                    },
                  },
                },
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
