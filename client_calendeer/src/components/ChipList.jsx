import Chip from "../ui/Chip";

/**
 * Lists chips representing event invitees
 */
// TODO: wrap email addresses
function ChipList({ invitees, setInvitees, canEdit }) {
  // Delete invitee from invitee list when representative chip is clicked
  function handleChipClick(id) {
    setInvitees((invitees) => invitees.filter((invitee) => invitee !== id));
  }

  return (
    <div className="flex justify-end gap-1">
      {invitees.map((invitee) => (
        <Chip
          key={invitee}
          email={invitee}
          onClick={canEdit ? handleChipClick : null}
        />
      ))}
    </div>
  );
}

export default ChipList;
