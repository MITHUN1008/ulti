import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    GitHub({
      profile(githubProfile) {
        return {
          name: githubProfile.name,
          image: githubProfile.avatar_url,
          email: githubProfile.email ? githubProfile.email : "",
        };
      },
    }),
    Google,
  ],
});
