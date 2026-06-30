'use client';

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
// ✅ 定义清晰的 Props 类型
interface SignINProps {
  btnName?: string;  // 可选，如果不传则显示默认文字
}

function SignIN({ btnName }: SignINProps) {
  const loginWithGitHub = async () => {
    return await authClient.signIn.social({
      /**
             * The social provider ID
             * @example "github", "google", "apple"
             */
      provider: "github",
      /**
             * A URL to redirect after the user authenticates with the provider
             * @default "/"
             */
      callbackURL: process.env.NEXT_PUBLIC_DASHBOARD_PAGE,
      /**
             * A URL to redirect if an error occurs during the sign in process
             */
      errorCallbackURL: process.env.NEXT_PUBLIC_ERROR_PAGE,
      /**
             * A URL to redirect if the user is newly registered
             */
      newUserCallbackURL: process.env.NEXT_PUBLIC_WELCOME_PAGE,
      /**
             * disable the automatic redirect to the provider. 
             * @default false
             */
      disableRedirect: false,
    });
  };
  return (
    <Button variant="outline" type="button" onClick={loginWithGitHub}>
      {btnName ?? 'Sign IN With GITHUB'}
    </Button>
  );
}

export {
  SignIN
}