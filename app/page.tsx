import { SignIN } from "@/components/sign-up";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { db } from "@/db";
import { demo, demoSelectSchema } from "@/db/schema";
import { CheckCircle2Icon, InfoIcon } from "lucide-react"
export default async function Home() {
  // const demoData: typeof demo.$inferInsert = {
  //   name: 'John',
  //   age: 30,
  //   email: 'john@example.com',
  // };
  // await db.insert(demo).values(demoData);
  // console.log('New user created!')
  let demos: typeof demo.$inferSelect[] = [];
  let error: string | null = null;
  try {
    const rows = await db.select({ id: demo.id, name: demo.name }).from(demo).limit(1);
    const parsed1: { id: number; name: string; age: number } = demoSelectSchema.parse(rows[0]); // 错误：`age` 在上面的查询中未返回

    demos = await db.select().from(demo);
    const parsed2: { id: number; name: string; age: number } = demoSelectSchema.parse(demos[0]);
    console.log(parsed1, parsed2)
  } catch (e) {
    error = (e as Error).message
  }
  return (
    <div>
      {
        demos.map((itme, key) => {
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
            {error}
          </AlertDescription>
        </Alert>
      </div>
    </div>

  );
}
