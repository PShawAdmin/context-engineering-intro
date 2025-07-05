import 'server-only';

interface CalendlyUser {
  resource: {
    uri: string;
    name: string;
    slug: string;
    email: string;
    scheduling_url: string;
    timezone: string;
    avatar_url: string | null;
    current_organization: string;
  };
}

interface CalendlyEventType {
  resource: {
    uri: string;
    name: string;
    active: boolean;
    booking_method: string;
    slug: string;
    scheduling_url: string;
    duration: number;
    kind: string;
    color: string;
  };
}

interface CalendlyEventTypesResponse {
  collection: CalendlyEventType[];
  pagination: {
    count: number;
    next_page: string | null;
    previous_page: string | null;
    next_page_token: string | null;
    previous_page_token: string | null;
  };
}

class CalendlyError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'CalendlyError';
  }
}

/**
 * Fetches the current user's scheduling URL from Calendly API
 * This function should only be called server-side
 */
export async function getSchedulingUrl(): Promise<string> {
  const token = process.env.CALENDLY_ACCESS_TOKEN;
  
  if (!token) {
    console.error('Calendly access token not configured');
    throw new CalendlyError('Calendly integration not configured');
  }

  try {
    // Fetch current user information
    const response = await fetch('https://api.calendly.com/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      // Cache the response for 1 hour to reduce API calls
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error(`Calendly API error: ${response.status} ${response.statusText}`);
      throw new CalendlyError('Failed to fetch scheduling information', response.status);
    }

    const data: CalendlyUser = await response.json();
    
    if (!data.resource?.scheduling_url) {
      throw new CalendlyError('Scheduling URL not found in response');
    }

    return data.resource.scheduling_url;
  } catch (error) {
    // Don't expose detailed error messages to the client
    if (error instanceof CalendlyError) {
      throw error;
    }
    
    console.error('Unexpected error fetching Calendly data:', error);
    throw new CalendlyError('Unable to load scheduling information');
  }
}

/**
 * Fetches all active event types for the current user
 * This can be used to display specific event types if needed
 */
export async function getEventTypes(): Promise<CalendlyEventType[]> {
  const token = process.env.CALENDLY_ACCESS_TOKEN;
  
  if (!token) {
    throw new CalendlyError('Calendly integration not configured');
  }

  try {
    // First get the current user to get their URI
    const userResponse = await fetch('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userResponse.ok) {
      throw new CalendlyError('Failed to fetch user information', userResponse.status);
    }

    const userData: CalendlyUser = await userResponse.json();
    const userUri = userData.resource.uri;

    // Then fetch event types for this user
    const eventTypesResponse = await fetch(`https://api.calendly.com/event_types?user=${userUri}&active=true`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });

    if (!eventTypesResponse.ok) {
      throw new CalendlyError('Failed to fetch event types', eventTypesResponse.status);
    }

    const eventTypesData: CalendlyEventTypesResponse = await eventTypesResponse.json();
    
    return eventTypesData.collection;
  } catch (error) {
    if (error instanceof CalendlyError) {
      throw error;
    }
    
    console.error('Unexpected error fetching event types:', error);
    throw new CalendlyError('Unable to load event types');
  }
}

/**
 * Gets a specific event type by slug
 */
export async function getEventTypeBySlug(slug: string): Promise<CalendlyEventType | null> {
  try {
    const eventTypes = await getEventTypes();
    return eventTypes.find(et => et.resource.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching event type by slug:', error);
    return null;
  }
}