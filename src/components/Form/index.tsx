import React from "react";
import { TextInput, Button, Box } from "@mantine/core";
import "./index.css";

type FormProps = {
  countryCode: string;
  onCountryCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
  onQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerateClick: () => void;
  countryCodeError: string;
  quantityError: string;
};

const Form: React.FC<FormProps> = ({
  countryCode,
  onCountryCodeChange,
  quantity,
  onQuantityChange,
  onGenerateClick,
  countryCodeError,
  quantityError,
}) => {
  return (
    <div className="form">
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
          onChange={onCountryCodeChange}
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
          onChange={onQuantityChange}
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
        onClick={onGenerateClick}
      >
        Generate Phone Numbers
      </Button>
    </div>
  );
};

export default Form;
