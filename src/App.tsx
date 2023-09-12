import { TextInput, Button, Box } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import countriesData from "./countryData.json";
import "./App.css";

type Country = {
  name: string;
  dial_code: string;
  code: string;
};

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const countries: Country[] = countriesData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const trimmedValue = e.target.value.trim();
    setValue(trimmedValue);
    console.log(trimmedValue);
    const isMatchingDialCode = countries.some((country) => {
      return country.dial_code === trimmedValue;
    });

    console.log(isMatchingDialCode);

    if (isMatchingDialCode) {
      setError("");
    } else {
      setError("Invalid country code");
    }
  };

  return (
    <div className="app">
      <Box
        maw={500}
        mx="auto"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "10rem",
          height: "auto",
        }}
      >
        <TextInput
          label="Country Code"
          size="sm"
          value={value}
          onChange={handleChange}
          placeholder="+27"
        />
        {error && (
          <div
            className="error"
            style={{ color: "#C00D0E", marginTop: "0.125rem" }}
          >
            {error}
          </div>
        )}
        <TextInput label="Quantity" size="sm" type="number" placeholder="20" />
      </Box>
      <Button
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
        size="sm"
        type="submit"
      >
        Generate Phone Numbers
      </Button>
    </div>
  );
};

export default App;
