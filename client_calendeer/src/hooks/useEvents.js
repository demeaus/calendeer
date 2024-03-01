import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getEvents } from "../services/apiEvents";

// Fetches and syncs list of events. Refreshes when user changes.
export function useEvents() {
    const { user: currentUser } = useAuth();

    const { isLoading, data: events, error } = useQuery({ queryKey: ["events"], queryFn: () => getEvents(currentUser.id) });
    return { isLoading, events, error }
}