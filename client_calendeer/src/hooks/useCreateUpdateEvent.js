import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateEvent as createUpdateEventApi } from "../services/apiEvents";

// Creates and updates events; syncs UI with remote server state
export function useCreateUpdateEvent() {
    const queryClient = useQueryClient();

    const { isLoading, mutate: createUpdateEvent, error } = useMutation({
        mutationFn: ({ eventData, user_id }) => createUpdateEventApi(eventData, user_id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["events"],
            });
        },
        onError: (err) => console.err(err.message)
    });

    return { isLoading, createUpdateEvent, error }
}