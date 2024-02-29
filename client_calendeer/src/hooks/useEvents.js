import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

/**
 * For retrieving events for a user from API
 */
async function getEvents({ user = 'a@g.com' }) {
    // TODO: error handling
    const res = await fetch(
        `${API_URL}events/`,
        // TODO: use user to get events
        // `${API_URL}events/${user}`,
    );

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch events for ${user}.`
        );
    }

    const data = await res.json();
    console.log(data)
    return data;
}

export function useEvents() {
    const { isLoading, data: events, error } = useQuery({ queryKey: ["events"], queryFn: getEvents });
    return { isLoading, events, error }
}