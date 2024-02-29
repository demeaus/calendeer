import Chip from "../ui/Chip";

/**
 * Allows user to add invitees
 *
 * @returns
 */
function CreateInviteesList({ invitees, setInvitees }) {
  // Delete invitee from invitee list when representative chip is clicked
  function handleClick(id) {
    setInvitees((invitees) => invitees.filter((invitee) => invitee !== id));
  }

  return (
    <div className="input">
      {invitees.map((invitee) => (
        <Chip key={invitee} email={invitee} onClick={handleClick} />
      ))}
    </div>
  );
}

export default CreateInviteesList;
