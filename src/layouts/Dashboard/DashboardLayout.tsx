import { Switch } from "@mui/material";
import React, { FC } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

//! Layouts are used to wrap pages with a common layout, we can change state here and it will not re-render the page because, change state do not re-render the props
const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props;
  const [theme, setTheme] = React.useState("light");

  console.log(theme);
  return (
    <div>
      Theme Switcher
      <Switch
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      {children}
    </div>
  );
};

export default DashboardLayout;
