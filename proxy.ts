import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
export async function proxy(request: NextRequest) {
  // // matcher 无法动态添加，只能写固定函数，需要动态判断用下面方法
  // const { pathname } = request.nextUrl
  // // 动态读取环境变量，自由判断
  // const dashboardPath:string = process.env.DASHBOARD_PAGE!
  // // 只在目标路由执行鉴权逻辑
  // if (pathname.startsWith(dashboardPath)) {
  //     // 你的登录校验逻辑
  // }
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    return NextResponse.redirect(new URL(process.env.LOGIN_PAGE!, request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard"], // Specify the routes the middleware applies to
};