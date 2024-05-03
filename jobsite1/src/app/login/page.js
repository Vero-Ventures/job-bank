/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3MctgCJLfxK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-[420px] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue.</p>
        </div>
        <Card className="p-4">
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="m@example.com" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" required type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </CardFooter>
        </Card>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?
          <Link className="font-medium underline underline-offset-4" href="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}