import { useState } from "react";
import Button from "../ui/Button";
import Chip from "../ui/Chip";

/**
 * Allows user to invite others to their event by adding emails
 */
// TODO: Refactor as a FormRow
function CreateInviteesList({ invitees, setInvitees }) {
  const [newInvitee, setNewInvitee] = useState("");

  // Add invitee to list of invitees
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
      {/* TODO: wrap email addresses */}
      <div className="my-2 flex items-center justify-between">
        <p>Invitees </p>
        <div className="flex justify-end gap-1">
          {invitees.map((invitee) => (
            <Chip key={invitee} email={invitee} onClick={handleChipClick} />
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          className="input"
          placeholder="Type addresses to invite"
          onChange={(e) => setNewInvitee(e.target.value)}
          value={newInvitee}
        />
        <Button type="small" onClick={handleInvite}>
          Invite
        </Button>
      </div>
    </div>
  );
}

export default CreateInviteesList;
