import { useState } from "react";
import Button from "../ui/Button";
import Chip from "../ui/Chip";
import { FormRow } from "../ui/FormRow";
import ChipList from "./ChipList";

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
    </div>
  );
}

export default CreateInviteesList;
