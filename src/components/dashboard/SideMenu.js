import { useState } from "react";
import Sidenav from 'examples/Sidenav'
import { useSoftUIController, setMiniSidenav } from "context";
// Images
import brand from "assets/images/logo-ct.png";
import routes from "routes";
export default function SideMenu() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };
  return (
    <Sidenav
      color={sidenavColor}
      brand={brand}
      brandName="&nbsp;&nbsp;&nbsp;Dashboard"
      routes={routes}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
  />
  )
}
