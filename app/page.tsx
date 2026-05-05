import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <Card className="w-96 border border-black">
        <CardHeader>
          <CardTitle>Project Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="italic">Put stuff here...</p>
        </CardContent>
      </Card>
      <a
        href="#get-started"
        className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      >
        Get Started
      </a>
    </div>
  );
}
