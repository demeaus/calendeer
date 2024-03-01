import { API_URL } from "../utils/constants";

/**
 * Retrieves events for a user from API
 */
export async function getEvents(id) {
    // Fetches list of events based on the currently authenticated user ID
    const res = await fetch(`${API_URL}events/${id}`, {
        method: 'GET',
    }

    );

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch events for user ID:${id}.`
        );
    }

    const data = await res.json();
    return data;
}

/**
 * Updates or create event if event does not exist
 */
export async function createUpdateEvent(event) {
    console.log("api: ", event)

    const res = await fetch(`${API_URL}events/event/`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    }
    );

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to update or create an event`
        );
    }

    const data = await res.json();
    return data;
}