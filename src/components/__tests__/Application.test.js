import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, getByDisplayValue } from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);
describe("Application", ()=> {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"))
    
    fireEvent.click(getByText("Tuesday"))
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const {container} = render(<Application/>)
    await waitForElement(() => getByText(container,"Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels and interview and increases the spots remaining for Monday by 1", async ()=>{
    const {container, debug} = render(<Application/>);
    await waitForElement(()=> getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
    await waitForElement(()=> getByAltText(appointment, "Add"));
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an appointment and keeps spots remaining for Monday the same", async () => {
    //1. render app
    const {container} = render(<Application/>);
    //2. wait until archies appointment is displayed
    await waitForElement(()=> getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    //3. click the edit button
    fireEvent.click(getByAltText(appointment, "Edit"));
    //4. update the input field with a new name
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: {value: "Jeremy Soule"}
    });
    //5. click save
    fireEvent.click(getByText(appointment, "Save"));
    //6. confirm saving status is displayed
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    //7. wait for appointment with the new name value to be displayed
    await waitForElement(()=> getByText(appointment, "Jeremy Soule"));
    //8. check that spots remaining is still 1
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    //1. render app
    const {container} = render(<Application/>);
    //2. wait until archies appointment is displayed
    await waitForElement(()=> getByText(container, "Archie Cohen"));
    //3. click on the first empty appointment
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    //4. enter a name into the input field
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Jeremy Soule"}
    });
    //5. select the first interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //6. click on the save button
    fireEvent.click(getByText(appointment, "Save"));
    //7. check that the saving status is displayed
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    //8 check that the error message for saving is displayed
    await waitForElement(() => getByText(appointment, "Could not save your appointment, please try again."));
    expect(getByText(appointment, "Could not save your appointment, please try again.")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    //1. render app
    const {container} = render(<Application/>);
    //2. wait for archies appointment to be displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //3. select archies appointment and click delete
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    //4. check that the confirm message is displayed
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    //5. click confirm
    fireEvent.click(getByText(appointment, "Confirm"));
    //6. confirm the deleting status is shown
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
    //7. wait for the deleting error message to be displayed
    await waitForElement(()=> getByText(appointment, "Could not delete the appointment, please try again."));
    //8. check that the deleting error message is displayed
    expect(getByText(appointment, "Could not delete the appointment, please try again.")).toBeInTheDocument();
    //9. click on the x to close
    fireEvent.click(getByAltText(appointment, "Close"));
    //10. confirm that the appointment is in the show status
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});