import { useForm } from "react-hook-form";
import { FormRow } from "../ui/FormRow";
import Form from "../ui/Form";
import { useState } from "react";
import CreateInviteesList from "./CreateInviteesList";
import Button from "../ui/Button";

// TODO: Handle the datetime inputs displaying in UTC
function CreateEventForm({ event = {} }) {
  let defaultValues = {};

  // Formats datetime string into format datetime-locale can read as a default value
  if (event.eventName) {
    console.log(event.datetime_start);
    const datetime_start_str = event.datetime_start.slice(0, -4);
    const datetime_end_str = event.datetime_end.slice(0, -4);

    defaultValues = {
      ...event,
      datetime_start: datetime_start_str,
      datetime_end: datetime_end_str,
    };
  }

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  const [invitees, setInvitees] = useState(event?.invitees || []);

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
      <FormRow label="Start" error={errors?.datetime_start?.message}>
        <input
          id="datetime_start"
          type="datetime-local"
          {...register("datetime_start")}
          className="input"
        />
      </FormRow>
      <FormRow label="End" error={errors?.datetime_end?.message}>
        <input
          id="datetime_end"
          type="datetime-local"
          {...register("datetime_end")}
          className="input"
        />
      </FormRow>
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
      <div className="flex justify-between">
        <Button type="primary">Save</Button>
        <Button type="secondary">Delete</Button>
      </div>
    </Form>
  );
}

export default CreateEventForm;
