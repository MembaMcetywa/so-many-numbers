import { render, screen } from "@testing-library/react";
import Welcome from "../src/components/Welcome/index";

test("We can see the welcome message", () => {
  render(<Welcome />);
  const welcomeElement = screen.getByText(
    /Welcome to So Many Numbers, I lost count at 122/i
  );

  // Assert that the text is present
  expect(welcomeElement.textContent).toMatch(
    /Welcome to So Many Numbers, I lost count at 122/i
  );
});
