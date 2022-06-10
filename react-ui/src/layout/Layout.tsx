import { Fragment } from "react";
import NavigationBar from "./Navbar";

const Layout = (props: any) => {
  return (
    <Fragment>
      <NavigationBar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
