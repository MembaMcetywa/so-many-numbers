import { useState } from "react";
import "./index.css";
type PhoneNumber = {
  extractedPhoneNumber: string;
  isValid: boolean;
  isPhoneNumberPossible: boolean;
};
type PhoneNumbersProps = {
  generatedPhoneNumbers: PhoneNumber[];
};

const GeneratedPhoneNumbers: React.FC<PhoneNumbersProps> = ({
  generatedPhoneNumbers,
}) => {
  const validPhoneNumbers = generatedPhoneNumbers
    .filter((phoneNumberObject) => phoneNumberObject.isValid)
    .map((phoneNumberObject) => phoneNumberObject.extractedPhoneNumber);

  return (
    validPhoneNumbers.length > 0 && (
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
    )
  );
};

export default GeneratedPhoneNumbers;
