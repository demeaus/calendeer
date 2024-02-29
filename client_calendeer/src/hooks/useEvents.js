import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";
import { useAuth } from "../context/AuthContext";

/**
 * Retrieves events for a user from API
 */
async function getEvents(id) {
    // Fetches list of events based on the currently authenticated user ID
    const res = await fetch(
        `${API_URL}events/${id}`,
    );

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch events for user ID:${id}.`
        );
    }

    const data = await res.json();
    return data;
}

// Fetches and syncs list of events. Refreshes when user changes.
export function useEvents() {
    const { user: currentUser } = useAuth();

    const { isLoading, data: events, error } = useQuery({ queryKey: ["events", currentUser.id], queryFn: () => getEvents(currentUser.id) });
    return { isLoading, events, error }
}