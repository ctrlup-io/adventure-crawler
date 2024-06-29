import { TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { Link, matchPath, useLocation } from "react-router-dom";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export default function NavigationTab() {
  const routeMatch = useRouteMatch([
    "/scores",
    "/logs",
    "/adventures",
    "/backpack",
    "/shop",
  ]);
  const currentTab = routeMatch?.pattern?.path || "/logs";
  return (
    <TabContext value={currentTab}>
      <TabList
        aria-label="Menu de navigation principale"
        sx={{
          "& .MuiTabs-flexContainer": {
            justifyContent: "center",
          },
        }}
      >
        <Tab label="Scores" value="/scores" to="/scores" component={Link} />
        <Tab label="Carnet de bord" value="/logs" to="/logs" component={Link} />
        <Tab
          label="Aventures"
          value="/adventures"
          to="/adventures"
          component={Link}
        />
        <Tab
          label="Sac à dos"
          value="/backpack"
          to="/backpack"
          component={Link}
        />
        <Tab label="Magasin" value="/shop" to="/shop" component={Link} />
      </TabList>
    </TabContext>
  );
}
