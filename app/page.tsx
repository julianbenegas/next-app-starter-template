import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 w-96">
        <Card className="w-full border border-black">
          <CardHeader>
            <CardTitle>Project Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic">Put stuff here...</p>
          </CardContent>
        </Card>
        <button
          type="button"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
