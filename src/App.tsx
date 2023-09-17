import { useState } from "react";
import axios from "axios";
import countriesData from "./countryData.json";
import "./App.css";
import Welcome from "./components/Welcome/index";
import Form from "./components/Form/index";
import GeneratedPhoneNumbers from "./components/GeneratedPhoneNumbers/index";

type Country = {
  name: string;
  dial_code: string;
  code: string;
};

type PhoneNumber = {
  extractedPhoneNumber: string;
  isValid: boolean;
  isPhoneNumberPossible: boolean;
};

const App = () => {
  const [countryCode, setCountryCode] = useState<string>("");
  const [countryCodeError, setCountryCodeError] = useState<string>("");
  const [quantityError, setQuantityError] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [generatedPhoneNumbers, setGeneratedPhoneNumbers] = useState<
    PhoneNumber[]
  >([]);

  const countries: Country[] = countriesData;

  const randommerEndpoint = import.meta.env
    .VITE_RANDOMMER_GENERATE_ENDPOINT_BASE;

  const randommerAPIKey = import.meta.env.VITE_RANDOMMER_API_KEY;
  const validationEndpoint = import.meta.env
    .VITE_VALIDATE_PHONE_NUMBERS_ENDPOINT;

  const handleCountryCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const trimmedValue = e.target.value.trim();
    setCountryCode(trimmedValue);
    if (trimmedValue === "") {
      setCountryCodeError("");
      return;
    }
    const isMatchingDialCode = countries.some((country) => {
      return country.code === trimmedValue;
    });

    if (isMatchingDialCode) {
      setCountryCodeError("");
    } else {
      setCountryCodeError("Invalid country code");
    }
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const quantityValue = e.target.value.trim();
    const parsedQuantityValue = parseInt(e.target.value.trim());
    setQuantity(parsedQuantityValue);
    if (
      parsedQuantityValue <= 0 ||
      parsedQuantityValue > 1000 ||
      quantityValue.trim() === ""
    ) {
      setQuantityError("Quantity must be between 1 and 1000");
    } else {
      setQuantityError("");
    }
  };

  const generatePhoneNumbers = async () => {
    if (countryCode.trim() === "") {
      setCountryCodeError("Country code is required");
      return;
    } else if (quantity == null || quantity == 0) {
      setQuantityError("Quantity is required");
      return;
    } else {
      setCountryCodeError("");
      setQuantityError("");
    }
    if (quantity <= 0 || quantity > 1000) {
      setQuantityError("Quantity must be between 1 and 1000");
      return;
    } else {
      setQuantityError("");
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

  return (
    <div className="app">
      <div className="input">
        <Welcome />
        <Form
          countryCode={countryCode}
          onCountryCodeChange={handleCountryCodeChange}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onGenerateClick={generatePhoneNumbers}
          countryCodeError={countryCodeError}
          quantityError={quantityError}
        />
      </div>
      <div className="output">
        <GeneratedPhoneNumbers generatedPhoneNumbers={generatedPhoneNumbers} />
      </div>
    </div>
  );
};

export default App;
