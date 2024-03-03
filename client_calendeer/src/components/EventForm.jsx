import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormRow } from "../ui/FormRow";

import { useCreateUpdateEvent } from "../hooks/useCreateUpdateEvent";
import { useDeleteEvent } from "../hooks/useDeleteEvent";
import { useAuth } from "../context/AuthContext";
import Form from "../ui/Form";
import Button from "../ui/Button";
import CreateInviteesList from "./CreateInviteesList";
import ChipList from "./ChipList";

/**
 * Form for creating, reading, updating, and deleting events
 */
function EventForm({ event = {}, onCloseModal }) {
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
    const datetime_start_str = event.datetime_start.slice(0, -3);
    const datetime_end_str = event.datetime_end.slice(0, -3);

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

    createUpdateEvent(
      {
        eventData: { ...eventData, invitees: invitees },
        user_id: currentUser.id,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );
  }

  function onDelete(eventData) {
    if (!eventData.id) return;

    deleteEvent(
      { event_id: eventData.id, user_id: currentUser.id },
      {
        onSuccess: () => {
          console.log("here");
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <div>
      <Form id="event-form">
        <h1 className="text-center text-lg font-bold">
          {eventExists ? (canEdit ? "Edit " : "View ") : "Add "}Event
        </h1>
        <FormRow label="Event Name" error={errors?.eventName?.message}>
          <input
            id="eventName"
            type="text"
            {...register("eventName", {
              required: "This field is required.",
            })}
            className="input"
            readOnly={!canEdit}
          />
        </FormRow>
        <FormRow label="Description" error={errors?.description?.message}>
          <input
            id="description"
            type="text"
            {...register("description")}
            className="input"
            readOnly={!canEdit}
          />
        </FormRow>
        <FormRow label="Host Email">
          <input
            id="host_email"
            type="email"
            readOnly={true}
            value={event.host_email || currentUser.email}
            {...register("host_email")}
            className="input"
          />
        </FormRow>
        <FormRow label="Start" error={errors?.datetime_start?.message}>
          <input
            id="datetime_start"
            type="datetime-local"
            {...register("datetime_start", {
              required: "This field is required.",
              validate: (date_str) => {
                const now = new Date();
                const date = new Date(date_str);
                return date > now || "Start time should be in the future";
              },
            })}
            className="input"
            readOnly={!canEdit}
          />
        </FormRow>
        <FormRow label="End" error={errors?.datetime_end?.message}>
          <input
            id="datetime_end"
            type="datetime-local"
            {...register("datetime_end", {
              required: "This field is required.",
              validate: (date) => {
                return (
                  date >= getValues().datetime_start ||
                  "End time should be at or after the start time"
                );
              },
            })}
            className="input"
            readOnly={!canEdit}
          />
        </FormRow>
        <input type="hidden" value={currentUser.id} {...register("host")} />
        <input
          type="hidden"
          value={eventExists ? event.id : -1}
          {...register("id")}
        />
      </Form>
      {canEdit && (
        <CreateInviteesList invitees={invitees} setInvitees={setInvitees} />
      )}
      <ChipList
        invitees={invitees}
        setInvitees={setInvitees}
        canEdit={canEdit}
      />

      <div className="flex justify-between">
        {canEdit && (
          <Button
            form="event-form"
            onClick={handleSubmit(onSubmit)}
            type="primary"
          >
            Save
          </Button>
        )}
        {eventExists && (
          <Button
            form="event-form"
            onClick={handleSubmit(onDelete)}
            type="secondary"
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}

export default EventForm;
