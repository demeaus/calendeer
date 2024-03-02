import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent as deleteEventApi } from "../services/apiEvents";

// Deletes events or removes a User from them
//  TODO: Fix no refresh onSuccess
export function useDeleteEvent() {
    const queryClient = useQueryClient();
    const { isLoading: isDeleting, mutate: deleteEvent } = useMutation({
        mutationFn: ({ event_id, user_id }) => deleteEventApi(event_id, user_id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["events"],
            });
        },
        onError: (err) => console.err(err.message)
    });

    return { isDeleting, deleteEvent };
}
