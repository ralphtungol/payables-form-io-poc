import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useLocation } from "react-router-dom";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { faBooks } from "@fortawesome/pro-solid-svg-icons";
import { VerticalNavigation, NavigationLink } from "kubra-ux-forge";
import {
  StyledContentBodyDiv,
  StyledLayoutContainerDiv,
  StyledNavigationDiv,
} from "./styled-components/styled-layout";
import { routes } from "routing/routing";

export const Layout = () => {
  const location = useLocation();

  return (
    <StyledLayoutContainerDiv>
      <StyledNavigationDiv>
        <VerticalNavigation showDashboardButton={false}>
          <NavigationLink
            icon={<FontAwesomeIcon icon={faGlobeAmericas} />}
            label="Welcome"
            component={Link}
            to={routes.welcome}
            selected={location.pathname.startsWith(routes.welcome)}
          />
          <NavigationLink
            icon={<FontAwesomeIcon icon={faBooks} />}
            label="Learn more"
            component={Link}
            to={routes.learnMore}
            selected={location.pathname.startsWith(routes.learnMore)}
          />
        </VerticalNavigation>
      </StyledNavigationDiv>
      <StyledContentBodyDiv>
        <Outlet />
      </StyledContentBodyDiv>
    </StyledLayoutContainerDiv>
  );
};
