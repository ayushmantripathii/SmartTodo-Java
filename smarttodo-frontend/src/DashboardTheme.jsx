import { ThemeProvider, createTheme } from "@mui/material/styles";

const dashboardTheme = createTheme({
  shadows: Array(25).fill("none"),
});

export default function DashboardTheme({ children }) {
  return <ThemeProvider theme={dashboardTheme}>{children}</ThemeProvider>;
}
