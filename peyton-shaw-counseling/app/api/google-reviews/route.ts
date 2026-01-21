import { NextResponse } from 'next/server';

export const revalidate = 60 * 60; // Cache for 1 hour
export const runtime = 'nodejs';

type GooglePlacesLegacyResponse = {
  status: string;
  error_message?: string;
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    url?: string;
    reviews?: Array<{
      author_name?: string;
      rating?: number;
      relative_time_description?: string;
      text?: string;
      time?: number;
      profile_photo_url?: string;
      author_url?: string;
    }>;
  };
};

type GooglePlacesNewResponse = {
  displayName?: {
    text?: string;
  };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    rating?: number;
    text?: {
      text?: string;
    };
    relativePublishTimeDescription?: string;
    publishTime?: string;
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }>;
  error?: {
    message?: string;
    status?: string;
  };
};

type GoogleBusinessProfileReviewsResponse = {
  reviews?: Array<{
    reviewId?: string;
    reviewer?: {
      displayName?: string;
      profilePhotoUrl?: string;
      isAnonymous?: boolean;
    };
    starRating?: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE' | 'STAR_RATING_UNSPECIFIED';
    comment?: string;
    updateTime?: string;
    createTime?: string;
  }>;
  averageRating?: number;
  totalReviewCount?: number;
};

const STAR_RATING_MAP: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

const formatRelativeTime = (timestamp?: string) => {
  if (!timestamp) return '';
  const time = new Date(timestamp).getTime();
  if (Number.isNaN(time)) return '';
  const seconds = Math.floor((Date.now() - time) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? '' : 's'} ago`;
};

export async function GET() {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const placeCid = process.env.GOOGLE_PLACE_CID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const gbpAccountId = process.env.GBP_ACCOUNT_ID;
  const gbpLocationId = process.env.GBP_LOCATION_ID;
  const gbpClientId = process.env.GBP_CLIENT_ID;
  const gbpClientSecret = process.env.GBP_CLIENT_SECRET;
  const gbpRefreshToken = process.env.GBP_REFRESH_TOKEN;

  const hasGbpConfig = Boolean(
    gbpAccountId &&
      gbpLocationId &&
      gbpClientId &&
      gbpClientSecret &&
      gbpRefreshToken
  );
  const hasAnyGbpConfig = Boolean(
    gbpAccountId || gbpLocationId || gbpClientId || gbpClientSecret || gbpRefreshToken
  );

  if (!hasGbpConfig && hasAnyGbpConfig) {
    const missing = [
      !gbpAccountId && 'GBP_ACCOUNT_ID',
      !gbpLocationId && 'GBP_LOCATION_ID',
      !gbpClientId && 'GBP_CLIENT_ID',
      !gbpClientSecret && 'GBP_CLIENT_SECRET',
      !gbpRefreshToken && 'GBP_REFRESH_TOKEN',
    ]
      .filter(Boolean)
      .join(', ');

    return NextResponse.json(
      { error: 'Missing Google Business Profile configuration.', details: missing },
      { status: 500 }
    );
  }

  if (hasGbpConfig) {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: gbpClientId as string,
        client_secret: gbpClientSecret as string,
        refresh_token: gbpRefreshToken as string,
      }).toString(),
      next: { revalidate },
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      return NextResponse.json(
        {
          error: 'Google Business Profile token error.',
          status: tokenResponse.status,
          details: tokenData.error_description || tokenData.error || tokenResponse.statusText,
        },
        { status: 502 }
      );
    }

    const reviewsUrl = new URL(
      `https://mybusiness.googleapis.com/v4/accounts/${gbpAccountId}/locations/${gbpLocationId}/reviews`
    );
    reviewsUrl.searchParams.set('orderBy', 'updateTime desc');
    reviewsUrl.searchParams.set('pageSize', '10');

    const reviewsResponse = await fetch(reviewsUrl.toString(), {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      next: { revalidate },
    });

    const reviewsData = (await reviewsResponse.json()) as GoogleBusinessProfileReviewsResponse & {
      error?: { message?: string; status?: string };
    };

    if (!reviewsResponse.ok || reviewsData.error) {
      return NextResponse.json(
        {
          error: 'Google Business Profile API error.',
          status: reviewsResponse.status,
          details: reviewsData.error?.message || reviewsResponse.statusText,
        },
        { status: 502 }
      );
    }

    const reviews = (reviewsData.reviews || []).map((review) => ({
      author_name: review.reviewer?.displayName || 'Google Reviewer',
      rating: STAR_RATING_MAP[review.starRating || ''] ?? 0,
      relative_time_description: formatRelativeTime(review.updateTime || review.createTime),
      text: review.comment?.trim() || 'Shared a rating on Google.',
      time: review.updateTime
        ? Math.floor(Date.parse(review.updateTime) / 1000)
        : 0,
      profile_photo_url: review.reviewer?.profilePhotoUrl || '',
      author_url: '',
    }));

    return NextResponse.json({
      name: 'Peyton Shaw Counseling, PLLC',
      rating: reviewsData.averageRating ?? null,
      user_ratings_total: reviewsData.totalReviewCount ?? null,
      url: placeCid ? `https://maps.google.com/?cid=${placeCid}` : null,
      reviews,
      source: 'gbp',
    });
  }

  if ((!placeId && !placeCid) || !apiKey) {
    return NextResponse.json(
      { error: 'Missing Google Places configuration.' },
      { status: 500 }
    );
  }

  if (placeCid) {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('cid', placeCid);
    url.searchParams.set('fields', 'name,rating,user_ratings_total,reviews,url');
    url.searchParams.set('key', apiKey);

    const response = await fetch(url.toString(), {
      next: { revalidate },
    });

    const data = (await response.json()) as GooglePlacesLegacyResponse;

    if (!response.ok || data.status !== 'OK' || !data.result) {
      return NextResponse.json(
        {
          error: 'Google Places API error.',
          status: response.status,
          details: data.error_message || data.status || response.statusText,
        },
        { status: 502 }
      );
    }

    const reviews = (data.result.reviews || []).map((review) => ({
      author_name: review.author_name || 'Google Reviewer',
      rating: review.rating ?? 0,
      relative_time_description: review.relative_time_description || '',
      text: review.text || '',
      time: review.time || 0,
      profile_photo_url: review.profile_photo_url || '',
      author_url: review.author_url || '',
    }));

    return NextResponse.json({
      name: data.result.name || 'Peyton Shaw Counseling',
      rating: data.result.rating ?? null,
      user_ratings_total: data.result.user_ratings_total ?? null,
      url: data.result.url || null,
      reviews,
      source: 'legacy',
    });
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}`;
  const response = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews,googleMapsUri',
    },
    next: { revalidate },
  });

  let data: GooglePlacesNewResponse | null = null;
  let rawText = '';

  try {
    rawText = await response.text();
    data = rawText ? (JSON.parse(rawText) as GooglePlacesNewResponse) : null;
  } catch (error) {
    data = null;
  }

  if (!response.ok || data?.error) {
    const details = data?.error?.message || rawText || response.statusText;
    return NextResponse.json(
      {
        error: 'Google Places API error.',
        status: response.status,
        details: details?.slice(0, 1000),
      },
      { status: 502 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: 'Google Places API error.', status: response.status, details: 'Empty response.' },
      { status: 502 }
    );
  }

  const reviews = (data.reviews || [])
    .map((review) => ({
      author_name: review.authorAttribution?.displayName || 'Google Reviewer',
      rating: review.rating ?? 0,
      relative_time_description: review.relativePublishTimeDescription || '',
      text: review.text?.text || '',
      time: review.publishTime ? Math.floor(Date.parse(review.publishTime) / 1000) : 0,
      profile_photo_url: review.authorAttribution?.photoUri || '',
      author_url: review.authorAttribution?.uri || '',
    }))
    .sort((a, b) => (b.time || 0) - (a.time || 0));

  return NextResponse.json({
    name: data.displayName?.text || 'Peyton Shaw Counseling',
    rating: data.rating ?? null,
    user_ratings_total: data.userRatingCount ?? null,
    url: data.googleMapsUri || null,
    reviews,
    source: 'new',
  });
}
