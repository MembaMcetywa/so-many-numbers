import { TextInput, Button, Box } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import countriesData from "./countryData.json";

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
      return country.dial_code === e.target.value;
    });

    console.log(isMatchingDialCode);

    if (isMatchingDialCode) {
      setError("");
    } else {
      setError("Invalid country code");
    }
  };

  const onSubmitHandler = () => {
    console.log(selectedCountry);
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
        {error && <div className="error">{error}</div>}
      </Box>
      <Button size="md" onClick={onSubmitHandler} type="submit">
        Generate
      </Button>
    </div>
  );
};

export default App;
