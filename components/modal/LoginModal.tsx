
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useLoginStore } from "../../store/LoginStore";
import { Button } from "../ui/button";
import { useNetworkStatusStore } from "../../store/NetworkStatusStore";
import { useAuth } from "../provider/AuthProvider";

import Image from "../../src/components/ReactImage";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useState } from "react";

const LoginModal = () => {
  const { isLogin, setIsLogin } = useLoginStore();
  const { isOnline } = useNetworkStatusStore();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (provider: "google" | "github" | "email") => {
    setLoading(true);
    try {
      // Simulate login with mock data for demo purposes
      const email = provider === "google" ? "user@gmail.com" : provider === "github" ? "user@github.com" : "user@email.com";
      const name = provider === "google" ? "Google User" : provider === "github" ? "GitHub User" : "Email User";
      
      login(email, name);
      setIsLogin(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (isLogin) {
    return (
      <Dialog onOpenChange={setIsLogin} open={isLogin}>
        <DialogContent className="flex p-0 border-none md:max-w-lg lg:max-w-4xl rounded-lg">
          <div className="p-4 lg:p-6">
            <DialogTitle className="text-xl font-bold">
              Log in or sign up in seconds
            </DialogTitle>
            <p className="text-muted-foreground mt-4">
              Use your email or another service to continue with Canva
              (it&apos;s free)!
            </p>
            <div className="w-full space-y-4 mt-6">
              <Button
                className="w-full relative"
                variant={"outline"}
                onClick={() => handleLogin("google")}
                disabled={loading || !isOnline}
              >
                <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                Continue with Google
              </Button>
              <Button
                className="w-full relative"
                variant={"outline"}
                onClick={() => handleLogin("github")}
                disabled={loading || !isOnline}
              >
                <FaGithub className="size-5 absolute top-2.5 left-2.5" />
                Continue with Github
              </Button>
              <Button 
                className="w-full relative" 
                variant={"outline"}
                onClick={() => handleLogin("email")}
                disabled={loading || !isOnline}
              >
                <MdOutlineMail className="size-5 absolute top-2.5 left-2.5" />
                Continue with email
              </Button>
            </div>
          </div>
          <Image
            src="/auth_dialog_canva.jpg"
            alt="auth_dialog_canva"
            height={400}
            width={400}
            className="hidden md:flex rounded-r-md"
          />
        </DialogContent>
      </Dialog>
    );
  }
};

export default LoginModal;
