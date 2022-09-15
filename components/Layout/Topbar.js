import { Icon } from "@iconify/react";
import { logout } from "apis/auth";
import { useRouter } from "next/router";
import { useAuth } from "providers/AuthProvider";
import { toast } from "react-toastify";
import store from "store";

export default function Topbar({ buttonAction, isOpen }) {
  const router = useRouter();
  const { setUser, setToken } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await logout();

      store.remove("token");
      store.remove("user");
      setUser(null);
      setToken(null);
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="topbar px-2 shadow d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <img className="logo" src="/img/logo.png" />
        <div className="px-4"></div>

        <Icon
          className="text-teal fs-1 cursor-pointer"
          onClick={buttonAction}
          icon="prime:bars"
        />
      </div>
      <div className="d-flex align-items-center">
        {/* <Icon className="text-secondary fs-1" icon="bxs:user-circle" /> */}
        {/* <Icon
          className="text-red fs-5 mx-2 cursor-pointer"
          icon="clarity:envelope-outline-badged"
        /> */}
        <Icon
          className="text-secondary fs-5 mx-2 cursor-pointer"
          icon="clarity:envelope-line"
        />
        {/* <Icon className="text-red fs-5 mx-2 cursor-pointer" icon="carbon:notification-new" /> */}
        <Icon
          className="text-secondary fs-5 mx-2 cursor-pointer"
          icon="carbon:notification"
        />
        <Icon
          onClick={handleLogout}
          className="text-secondary fs-5 mx-2 cursor-pointer"
          icon="ic:round-logout"
        />
      </div>
    </div>
  );
}
