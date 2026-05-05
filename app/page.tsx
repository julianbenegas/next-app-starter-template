import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <button className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition-colors">
        Button
      </button>
    </div>
  );
}
