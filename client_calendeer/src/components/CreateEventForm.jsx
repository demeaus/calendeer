import { useForm } from "react-hook-form";
import { FormRow } from "../ui/FormRow";
import Form from "../ui/Form";
import { useState } from "react";
import CreateInviteesList from "./CreateInviteesList";

function CreateEventForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const [invitees, setInvitees] = useState([
    "a@g.com",
    "b@g.com",
    "cfdsfdsafdasaffdsadf@g.com",
  ]);

  return (
    <Form>
      <FormRow label="Event Name" error={errors?.eventName?.message}>
        <input
          id="eventName"
          type="text"
          {...register("eventName")}
          className="input"
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <input
          id="description"
          type="text"
          {...register("description")}
          className="input"
        />
      </FormRow>
      {/* TODO: Host should be disabled; use logged in user */}

      {/* TODO: Validate datetimes: end is after start */}
      <FormRow label="Start" error={errors?.start?.message}>
        <input
          id="start"
          type="datetime"
          {...register("start")}
          className="input"
        />
      </FormRow>
      <FormRow label="End" error={errors?.end?.message}>
        <input
          id="end"
          type="datetime"
          {...register("end")}
          className="input"
        />
      </FormRow>
      {console.log(invitees)}
      <FormRow label="Invitees">
        {/* Add email addresses with validation. On submit, send array of invitees as represented by chips. */}
        <input
          id="invitees"
          type="hidden"
          value={invitees}
          {...register("invitees")}
        />
      </FormRow>
      <CreateInviteesList invitees={invitees} setInvitees={setInvitees} />
    </Form>
  );
}

export default CreateEventForm;
