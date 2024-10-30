import { SideBar } from "../components/PitchToGrant/SideBar";
import { Chat } from "../components/PitchToGrant/Chat";
import { ThemeProvider } from "../components/ui/theme-provider";

function PitchToGrant() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex h-screen bg-gradient-to-br from-purple-50 to-orange-50 dark:from-purple-950 dark:to-orange-950">
        <SideBar />
        <Chat />
      </div>
    </ThemeProvider>
  );
}

export default PitchToGrant;
