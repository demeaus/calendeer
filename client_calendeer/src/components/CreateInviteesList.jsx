import { useState } from "react";
import Button from "../ui/Button";
import Chip from "../ui/Chip";
import { FormRow } from "../ui/FormRow";

/**
 * Component to allow user to invite others to their event by adding emails
 */
// TODO: Refactor into seperate Form and List
function CreateInviteesList({ invitees, setInvitees }) {
  const [newInvitee, setNewInvitee] = useState("");

  // Add invitee to list of invitees when invite button is clicked
  function handleInvite(e) {
    e.preventDefault();

    setInvitees((invitees) => [...invitees, newInvitee]);
    setNewInvitee("");
  }

  // Delete invitee from invitee list when representative chip is clicked
  function handleChipClick(id) {
    setInvitees((invitees) => invitees.filter((invitee) => invitee !== id));
  }

  return (
    <div>
      {/* Field for user to add invitees by email address */}
      <form
        onSubmit={handleInvite}
        className="flex items-center justify-center gap-2"
      >
        <FormRow label="Invitees">
          <input
            id="invitee"
            type="email"
            className="input"
            placeholder="Type addresses to invite"
            size="30"
            onChange={(e) => setNewInvitee(e.target.value)}
            value={newInvitee}
            required
          />
        </FormRow>
        <Button type="small">Invite</Button>
      </form>
      {/* TODO: wrap email addresses */}
      <div className="my-2 flex items-center justify-between">
        {/* List of current invitees as chips */}
        <div className="flex justify-end gap-1">
          {invitees.map((invitee) => (
            <Chip key={invitee} email={invitee} onClick={handleChipClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateInviteesList;
