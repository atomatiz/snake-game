import { Text } from "@/components/atoms/Text";
import { GameContainer } from "@/containers/GameContainer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Text variant="h1" className="mb-4">
        Snake Game
      </Text>
      <GameContainer />
    </div>
  );
}
