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
  const [countryCodeError, setCountryCodeError] = useState<string>("");
  const [quantityError, setQuantityError] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [generatedPhoneNumbers, setGeneratedPhoneNumbers] = useState<string[]>(
    []
  );
  const countries: Country[] = countriesData;

  const randommerEndpoint = import.meta.env
    .VITE_RANDOMMER_GENERATE_ENDPOINT_BASE;

  const randommerAPIKey = import.meta.env.VITE_RANDOMMER_API_KEY;
  const validationEndpoint = import.meta.env
    .VITE_VALIDATE_PHONE_NUMBERS_ENDPOINT;

  const generatePhoneNumbers = async () => {
    // Validate input fields before making the request
    if (countryCode.trim() === "") {
      setCountryCodeError("Country code is required");
      return;
    } else {
      setCountryCodeError(""); // Clear the error if valid
    }
    if (quantity <= 0 || quantity > 1000) {
      setQuantityError("Quantity must be between 1 and 1000");
      return;
    } else {
      setQuantityError(""); // Clear the error if valid
    }
    try {
      const response = await axios.get(
        `${randommerEndpoint}CountryCode=${countryCode}&Quantity=${quantity}`,
        {
          headers: {
            "x-api-key": randommerAPIKey,
          },
        }
      );
      console.log("Generated Phone Numbers:", response.data);
      await axios
        .post(validationEndpoint, {
          phoneNumbers: response.data,
        })
        .then((response) => {
          setGeneratedPhoneNumbers(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error validating phone number:", error);
        });
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
      setCountryCodeError("Country code is required");
    } else {
      setCountryCodeError(""); // Clear the error if valid
    }
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const parsedValue = parseInt(e.target.value.trim());
    setQuantity(parsedValue);
    if (parsedValue <= 0 || parsedValue > 1000) {
      setQuantityError("Quantity must be between 1 and 1000");
    } else {
      setQuantityError(""); // Clear the error if valid
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
          value={countryCode}
          onChange={handleCountryCodeChange}
          placeholder="ZA"
        />
        {countryCodeError && (
          <div
            className="error"
            style={{ color: "#C00D0E", marginTop: "0.125rem" }}
          >
            {countryCodeError}
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
        {quantityError && (
          <div
            className="error"
            style={{
              display: "flex",
              width: "250px",
              color: "#C00D0E",
              marginTop: "0.125rem !important",
            }}
          >
            {quantityError}
          </div>
        )}
      </Box>
      <Button
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
        type="submit"
        onClick={generatePhoneNumbers}
      >
        Generate Phone Numbers
      </Button>

      {/* {generatedPhoneNumbers.length > 0 && (
        <div className="generated-numbers">
          <h2>Generated Phone Numbers:</h2>
          <ul>
            {generatedPhoneNumbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default App;
