import { useForm } from "react-hook-form";
import { FormRow } from "../ui/FormRow";
import Form from "../ui/Form";

function CreateEventForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

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
    </Form>
  );
}

export default CreateEventForm;
