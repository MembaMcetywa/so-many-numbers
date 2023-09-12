import { useState } from "react";
import axios from "axios";
import { TextInput, Button, Box } from "@mantine/core";
import countriesData from "./countryData.json";
import "./App.css";

type Country = {
  name: string;
  dial_code: string;
  code: string;
};

const App = () => {
  const [countryCode, setCountryCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0); // State can hold a number or an empty string
  const countries: Country[] = countriesData;

  const randommerUrl = import.meta.env.REACT_APP_RANDOMMER_URL || "";
  const randommerKey = "76cb90b6c80444e19fa849244276493f";

  const generatePhoneNumbers = async () => {
    try {
      const response = await axios.get(
        `https://randommer.io/api/Phone/Generate?CountryCode=${countryCode}&Quantity=${quantity}`,
        {
          headers: {
            "x-api-key": randommerKey,
          },
        }
      );
      console.log("Generated Phone Numbers:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCountryCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const trimmedValue = e.target.value.trim();
    setCountryCode(trimmedValue);
    if (trimmedValue === "") {
      setError("");
      return;
    }
    const isMatchingDialCode = countries.some((country) => {
      return country.code === trimmedValue;
    });

    if (isMatchingDialCode) {
      setError("");
    } else {
      setError("Invalid country code");
    }
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const parsedValue = parseInt(e.target.value);
    setQuantity(parsedValue);
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
          value={countryCode}
          onChange={handleCountryCodeChange}
          placeholder="ZA"
        />
        {error && (
          <div
            className="error"
            style={{ color: "#C00D0E", marginTop: "0.125rem" }}
          >
            {error}
          </div>
        )}
        <TextInput
          value={quantity}
          onChange={handleQuantityChange}
          label="Quantity"
          size="sm"
          type="number"
          placeholder="20"
        />
      </Box>
      <Button
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
        size="sm"
        type="submit"
        onClick={generatePhoneNumbers}
      >
        Generate Phone Numbers
      </Button>
    </div>
  );
};

export default App;
