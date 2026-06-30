import DemoUserCard from "@/components/demo-user-card";
interface userIdProps {
  userId?: string;  // 可选，如果不传则显示默认文字
}
export default function UserProfile ({userId}:userIdProps) {
  return (
    <div>
      <p>parent</p>
      <DemoUserCard></DemoUserCard>
      {userId}
    </div>
  )
}