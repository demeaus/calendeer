import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateEvent } from "../services/apiEvents";

// Fetches and syncs list of events. Refreshes when user changes.
export function useCreateEvent() {
    const queryClient = useQueryClient();

    const { isLoading, mutate: createEvent, error } = useMutation({
        mutationFn: createUpdateEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: "events",
            });
        },
        onError: (err) => console.log(err.message)
    });
    return { isLoading, createEvent, error }
}