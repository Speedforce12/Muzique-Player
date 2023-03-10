import nextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";


// create a new token 
async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
      spotifyApi.setRefreshToken(token.refreshToken);
      
      const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
      console.log("REFRESH TOKEN IS:", refreshedToken)

      return {
          ...token,
          accessToken: refreshedToken.access_token,
          accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // expire in an hour
          refreshToken: refreshedToken.refresh_token ?? token.refreshToken,

      }
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "REFRESH_ACCESS_TOKEN_ERROR",
    };
  }
}

export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],

  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
      async jwt({ token, account, user }) {
          
        //   initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      // return previous token for unexpired session

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      //   Access token expires, so return a new token
      console.log("Access token expires, REFRESHING TOKEN");
      return await refreshAccessToken(token);
      },
      
      async session({ session, token }) {
          session.user.accessToken = token.accessToken
          session.user.refreshToken = token.refreshToken
          session.user.username = token.username

          return session;
      }
  },
};
export default nextAuth(authOptions);
