import { Chat } from "../../components/PitchToGrant/Chat";
import { AppLayout } from "../../components/layout/AppLayout";

function PitchToGrant() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <Chat />
      </div>
    </AppLayout>
  );
}

export default PitchToGrant;
