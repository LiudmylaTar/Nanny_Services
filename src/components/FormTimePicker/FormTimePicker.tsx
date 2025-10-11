import { Controller, useFormContext } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

type Props = {
  name: string;
};

export default function FormTimePicker({ name }: Props) {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TimePicker
            format="00:00"
            value={field.value ? dayjs(field.value, "HH:mm") : null}
            onChange={(newValue) => {
              field.onChange(newValue ? newValue.format("HH:mm") : "");
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",

                InputProps: {
                  sx: {
                    "& fieldset": {
                      display: "none",
                    },
                    placeholder: "00:00",
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
