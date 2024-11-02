import { SideBar } from "../components/SideBar";
import { Chat } from "../components/PitchToGrant/Chat";
import { ThemeProvider } from "../components/ui/theme-provider";

function PitchToGrant() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex h-screen bg-white">
        <SideBar />
        <Chat />
      </div>
    </ThemeProvider>
  );
}

export default PitchToGrant;
