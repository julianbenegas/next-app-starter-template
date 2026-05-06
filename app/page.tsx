import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <Card className="w-96 border border-black">
          <CardHeader>
            <CardTitle>Project Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic">Put stuff here...</p>
          </CardContent>
        </Card>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
          Click me
        </button>
      </div>
    </div>
  );
}
