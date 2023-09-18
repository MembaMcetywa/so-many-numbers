import { useState } from "react";
import "./index.css";
export type PhoneNumber = {
  // extractedPhoneNumber: string;
  isValid: boolean;
  isPhoneNumberPossible: boolean;
  phoneNumberType?: string;
  phoneNumberIsValid?: boolean;
  phoneNumberIsPossible?: boolean;
  phoneNumber?: string;
  phoneNumberCountryCode?: string;
};
type PhoneNumbersProps = {
  generatedPhoneNumbers: PhoneNumber[];
};

const GeneratedPhoneNumbers: React.FC<PhoneNumbersProps> = ({
  generatedPhoneNumbers,
}) => {
  console.log("generated stuff:", generatedPhoneNumbers);
  const validPhoneNumbers = generatedPhoneNumbers
    .filter((phoneNumberObject) => phoneNumberObject.phoneNumberIsValid)
    .map((phoneNumberObject) => phoneNumberObject.phoneNumber);

  console.log("valid", validPhoneNumbers);
  return (
    <div className="generated-numbers">
      <h2>Generated Phone Numbers</h2>
      <ul className="generated-numbers-list">
        {validPhoneNumbers.map((phoneNumber, index) => (
          <li className="generated-numbers-list-item" key={index}>
            {phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeneratedPhoneNumbers;
