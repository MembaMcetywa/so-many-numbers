import React from "react";
import { Modal, Group, Button } from "@mantine/core";
import { PhoneNumber } from "../GeneratedPhoneNumbers/index";
import { useDisclosure } from "@mantine/hooks";

type ModalProps = {
  opened: boolean;
  onClose: () => void;
  quantity: number;
  validationResults: PhoneNumber[];
};

const calculatePercentage = (quantity: number, results: PhoneNumber[]) => {
  const validResults = results.filter((result) => result.phoneNumberIsValid);
  const validCount = validResults.length;
  return ((validCount / quantity) * 100).toFixed(2); // Calculate percentage with 2 decimal places
};

const MyModal: React.FC<ModalProps> = ({ quantity, validationResults }) => {
  const percentage = calculatePercentage(quantity, validationResults);
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="md"
        title="Returned Validation Results"
        centered
        sx={{
          display: "flex",
          alignSelf: "center",
          justifySelf: "center",
          width: "100vw",
        }}
      >
        Out of the {quantity} numbers generated, {percentage}% were found to be
        valid for the country.
      </Modal>
      <Group position="center">
        <Button onClick={open}> Open Stats Modal</Button>
      </Group>
    </>
  );
};

export default MyModal;
