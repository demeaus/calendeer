import { useForm } from "react-hook-form";
import { FormRow } from "../ui/FormRow";
import Form from "../ui/Form";
import { useState } from "react";
import CreateInviteesList from "./CreateInviteesList";
import Button from "../ui/Button";
import { useCreateUpdateEvent } from "../hooks/useCreateUpdateEvent";
import { useAuth } from "../context/AuthContext";
import { useDeleteEvent } from "../hooks/useDeleteEvent";

// NOTE: hidden inputs are hidden using css instead of input type due to react-hook-form bug

// TODO: Handle the datetime inputs displaying in UTC
function EventForm({ event = {} }) {
  const { user: currentUser } = useAuth();

  const [invitees, setInvitees] = useState(event?.invitees || []);
  let defaultValues = {};
  let canEdit = false;
  let eventExists = false;

  // Identify if form is being used to edit an existing event or create a new one
  if (event.eventName) {
    eventExists = true;
  }

  // Identify user's permissions for the editing or adding an event
  if (!eventExists || currentUser.id === event.host) {
    canEdit = true;
  }

  if (eventExists) {
    // Formats datetime string into format datetime-locale can read as a default value
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

  const { isLoading, createUpdateEvent, error } = useCreateUpdateEvent();
  const { isDeleting, deleteEvent } = useDeleteEvent();

  function onSubmit(eventData) {
    // If no changes to event data, no need to submit form
    if (eventData === defaultValues) return;

    const eventDataPlus = { ...eventData, invitees: invitees };
    createUpdateEvent({ eventData: eventDataPlus, user_id: currentUser.id });
  }

  function handleDelete(e) {
    e.preventDefault();

    if (!event.id) return;
    deleteEvent({ event_id: event.id, user_id: currentUser.id });
  }

  return (
    <div>
      <Form id="event-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center text-lg font-bold">
          {eventExists ? (canEdit ? "Edit " : "View ") : "Add "}Event
        </h1>
        <FormRow label="Event Name" error={errors?.eventName?.message}>
          <input
            id="eventName"
            type="text"
            {...register("eventName")}
            className="input"
            disabled={!canEdit}
          />
        </FormRow>
        <FormRow label="Description" error={errors?.description?.message}>
          <input
            id="description"
            type="text"
            {...register("description")}
            className="input"
            disabled={!canEdit}
          />
        </FormRow>
        {/* TODO: Fix host_email not being sent when creating a new event*/}
        <FormRow label="Host Email" error={errors?.host_email?.message}>
          <input
            id="host_email"
            type="email"
            disabled={true}
            value={event.host_email || currentUser.email}
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
            disabled={!canEdit}
          />
        </FormRow>
        <FormRow label="End" error={errors?.datetime_end?.message}>
          <input
            id="datetime_end"
            type="datetime-local"
            {...register("datetime_end")}
            className="input"
            disabled={!canEdit}
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
          value={eventExists ? event.id : -1}
          {...register("id")}
        />
      </Form>
      {/* TODO: separate form from list */}
      {canEdit && (
        <CreateInviteesList invitees={invitees} setInvitees={setInvitees} />
      )}

      <div className="flex justify-between">
        {canEdit && (
          <Button form="event-form" type="primary">
            Save
          </Button>
        )}
        {eventExists && (
          <Button onClick={handleDelete} type="secondary">
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}

export default EventForm;
