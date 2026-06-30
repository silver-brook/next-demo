import UserProfile from "@/app/demo/page";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

describe("UserProfile 子组件真实测试", () => {
  test("render", async () => {
    const screen = await render(<UserProfile userId="1001" />);

    expect(screen.getByText("parent")).toBeInTheDocument();
    expect(screen.getByText("1001")).toBeInTheDocument();

    // 如果 DemoUserCard 会显示 "User Card"
    expect(screen.getByText("User Card")).toBeInTheDocument();
  });
});

