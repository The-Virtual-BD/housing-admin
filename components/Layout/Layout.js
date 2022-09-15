import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import Login from "pages";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import Topbar from "./Topbar";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <Icon icon="clarity:dashboard-solid" />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <Icon icon="bxs:user" />,
  },
  {
    path: "/managers",
    name: "Managers",
    icon: <Icon icon="bxs:user-detail" />,
  },
  {
    path: "/approvers",
    name: "Approvers",
    icon: <Icon icon="bxs:user-check" />,
  },
  {
    path: "/executives",
    name: "Executives",
    icon: <Icon icon="bxs:user-voice" />,
  },
  {
    path: "/staff",
    name: "Staff",
    icon: <Icon icon="bxs:user-voice" />,
  },
  {
    path: "/applications",
    name: "Applications",
    icon: <Icon icon="eos-icons:application" />,
  },
  {
    path: "/subdivisions",
    name: "Subdivisions",
    icon: <Icon icon="carbon:carbon-for-ibm-product" />,
  },
  {
    path: "/housing-models",
    name: "Housing Models",
    icon: <Icon icon="tabler:box-model-2" />,
  },
  {
    path: "/supports",
    name: "Supports",
    icon: <Icon icon="bx:support" />,
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <Icon icon="bi:envelope-fill" />,
  },
  // {
  //   path: "/dropdown",
  //   name: "Dropdown",
  //   icon: <Icon icon="bi:gear-fill" />,
  //   subRoutes: [
  //     {
  //       path: "/item-1",
  //       name: "Item 1 ",
  //       icon: <Icon icon="ant-design:bars-outlined" />,
  //     },
  //     {
  //       path: "/item-2",
  //       name: "Item 2 ",
  //       icon: <Icon icon="ant-design:bars-outlined" />,
  //     },
  //     {
  //       path: "/item-3",
  //       name: "Item 3 ",
  //       icon: <Icon icon="ant-design:bars-outlined" />,
  //     },
  //   ],
  // },
];

const SideBar = ({ children }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      {router.pathname == "/" ? (
        <Login />
      ) : (
        <>
          <Topbar isOpen={isOpen} buttonAction={toggleSidebar} />
          <div className="d-flex">
            <motion.div
              animate={{
                width: isOpen ? "200px" : "45px",

                transition: {
                  duration: 0.5,
                  type: "spring",
                  damping: 10,
                },
              }}
              className="sidebar"
            >
              <section className="routes">
                {routes.map((route, index) => {
                  if (route.subRoutes) {
                    return (
                      <SidebarMenu
                        setIsOpen={setIsOpen}
                        route={route}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                      />
                    );
                  }

                  return (
                    <Link href={route.path} key={index}>
                      <a
                        className={`link ${
                          router.pathname == route.path ? "active" : ""
                        }`}
                      >
                        <div className="icon">{route.icon}</div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              variants={showAnimation}
                              initial="hidden"
                              animate="show"
                              exit="hidden"
                              className="link_text"
                            >
                              {route.name}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </a>
                    </Link>
                  );
                })}
              </section>
            </motion.div>
            <main className="p-3 vw-100">{children}</main>
          </div>
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
            crossOrigin="anonymous"
          />
        </>
      )}
    </>
  );
};

export default SideBar;
