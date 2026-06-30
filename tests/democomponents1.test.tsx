import UserProfile from "@/app/demo/page";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

vi.mock("@/components/demo-user-card", () => ({
  default: () => <div data-testid="demo-card">DemoUserCard Mock</div>,
}));

describe("UserProfile 子组件mock测试", () => {
  test("渲染 userId", async() => {
    const screen = await render(<UserProfile userId="1001" />);
    expect(screen.getByText("parent")).toBeInTheDocument();
    expect(screen.getByText("1001")).toBeInTheDocument();
    expect(screen.getByTestId("demo-card")).toBeInTheDocument();
  });

  test("没有传 userId", async() => {
    const screen = await render(<UserProfile />);
    expect(screen.getByText("parent")).toBeInTheDocument();
    expect(screen.getByTestId("demo-card")).toBeInTheDocument();
  });
});