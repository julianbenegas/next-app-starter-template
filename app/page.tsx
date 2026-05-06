import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <Card className="w-96 border border-black">
        <CardHeader>
          <CardTitle>Project Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="italic">Put stuff here...</p>
        </CardContent>
      </Card>
      <Button className="bg-blue-600 text-white hover:bg-blue-700">
        Button
      </Button>
    </div>
  );
}
