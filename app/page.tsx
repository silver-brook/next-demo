import { SignIN } from "@/components/sign-up";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { db } from "@/db";
import { demo } from "@/db/schema";
import { CheckCircle2Icon, InfoIcon } from "lucide-react"
export default async function Home() {
  // const demoData: typeof demo.$inferInsert = {
  //   name: 'John',
  //   age: 30,
  //   email: 'john@example.com',
  // };
  // await db.insert(demo).values(demoData);
  // console.log('New user created!')
  const users = await db.select().from(demo);
  return (
    <div>
      {
        users.map((itme,key) => {
          return <div key={key}>Getting all users from the database: {itme.name}</div>
        })
      }
      <SignIN></SignIN>
      <div className="fixed top-0 right-0 ">
        <div className="grid   w-full max-w-md items-start gap-4">
          <Alert className="">
            <CheckCircle2Icon />
            <AlertTitle>Payment successful</AlertTitle>
            <AlertDescription>
              Your payment of $29.99 has been processed. A receipt has been sent to
              your email address.
            </AlertDescription>
          </Alert>
          <Alert>
            <InfoIcon />
            <AlertTitle>New feature available</AlertTitle>
            <AlertDescription>
              We&apos;ve added dark mode support. You can enable it in your account
              settings.
            </AlertDescription>
          </Alert>
        </div>
      </div>
      <div className="grid   w-full max-w-md items-start gap-4">
        <Alert className="">
          <CheckCircle2Icon />
          <AlertTitle>Payment successful</AlertTitle>
          <AlertDescription>
              Your payment of $29.99 has been processed. A receipt has been sent to
              your email address.
          </AlertDescription>
        </Alert>
        <Alert>
          <InfoIcon />
          <AlertTitle>New feature available</AlertTitle>
          <AlertDescription>
              We&apos;ve added dark mode support. You can enable it in your account
              settings.
          </AlertDescription>
        </Alert>
      </div>
    </div>

  );
}
