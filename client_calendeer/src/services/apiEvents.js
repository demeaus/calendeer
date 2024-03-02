import { API_URL } from "../utils/constants";

/**
 * Retrieves events for a user from API
 */
export async function getEvents(user_id) {
    // Fetches list of events based on the currently authenticated user ID
    const res = await fetch(`${API_URL}${user_id}/events/`, {
        method: 'GET',
    });

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch events.`
        );
    }

    const data = await res.json();
    return data;
}

/**
 * Updates or create event if event does not exist
 */
export async function createUpdateEvent(event, user_id) {
    console.log("api: ", event)
    console.log("user_id: ", user_id)

    const res = await fetch(`${API_URL}${user_id}/events/`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    }
    );

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to update or create an event.`
        );
    }

    const data = await res.json();
    return data;
}

/**
 * Deletes event or removes user from event
 */
export async function deleteEvent(event_id, user_id) {
    // Fetches list of events based on the currently authenticated user event_ID
    const res = await fetch(`${API_URL}${user_id}/events/${event_id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to delete an event.`
        );
    }

    const data = await res.json();
    return data;
}