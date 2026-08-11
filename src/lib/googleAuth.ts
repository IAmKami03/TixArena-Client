// Must exactly match an "Authorized redirect URI" configured on the Google
// Cloud OAuth 2.0 Client, and must be identical between the request that
// starts the redirect flow and the request that exchanges the resulting code.
export const GOOGLE_REDIRECT_URI = `${window.location.origin}/auth/google/callback`;
