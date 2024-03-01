import { useForm } from "react-hook-form";
import { FormRow } from "../ui/FormRow";
import Form from "../ui/Form";
import { useState } from "react";
import CreateInviteesList from "./CreateInviteesList";
import Button from "../ui/Button";
import { useCreateEvent } from "../hooks/useCreateEvent";
import { useAuth } from "../context/AuthContext";

// NOTE: hidden inputs are hidden using css instead of input type due to react-hook-form bug

// TODO: Handle the datetime inputs displaying in UTC
function EventForm({ event = {} }) {
  const { user: currentUser } = useAuth();

  const [invitees, setInvitees] = useState(event?.invitees || []);
  let defaultValues = {};

  // Identify if form is being used to edit an existing event or create a new one
  let isEditing = false;
  if (event.eventName) isEditing = true;

  // Formats datetime string into format datetime-locale can read as a default value
  if (isEditing) {
    const datetime_start_str = event.datetime_start.slice(0, -4);
    const datetime_end_str = event.datetime_end.slice(0, -4);

    // Set and format existing event data to populate form with default values
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

  const { isLoading, createEvent, error } = useCreateEvent();

  function onSubmit(eventData) {
    // If no changes to event data, no need to submit form
    if (eventData === defaultValues) return;

    const eventDataPlus = { ...eventData, invitees: invitees };
    createEvent(eventDataPlus);
  }

  return (
    <div>
      <Form id="event-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center text-lg font-bold">
          {event?.eventName ? "Edit " : "Add "}Event
        </h1>
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
        {/* TODO: Fix host_email not being sent when creating a new event*/}
        <FormRow label="Host Email" error={errors?.host_email?.message}>
          <input
            id="host_email"
            type="email"
            disabled={true}
            value={currentUser.email}
            {...register("host_email")}
            className="input"
          />
        </FormRow>
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
        <input
          className="hidden"
          type="number"
          value={currentUser.id}
          {...register("host")}
        />
        <input
          className="hidden"
          value={isEditing ? event.id : -1}
          {...register("id")}
        />
      </Form>
      <CreateInviteesList invitees={invitees} setInvitees={setInvitees} />
      <div className="flex justify-between">
        <Button form="event-form" type="primary">
          Save
        </Button>
        <Button type="secondary">Delete</Button>
      </div>
    </div>
  );
}

export default EventForm;
