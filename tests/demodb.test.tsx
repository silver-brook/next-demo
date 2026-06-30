import { beforeEach, vi } from 'vitest'
import { describe, expect, test } from 'vitest'
import { dbInsert, dbSelect } from '@/lib/demo';
import { SignIN } from '@/components/sign-up';
import { render } from 'vitest-browser-react';
import Home from '@/app/page';
import UserProfile from '@/app/demo/page';


const mocks = vi.hoisted(() => ({
  selectMock: vi.fn(),
  fromMock: vi.fn(),
  insertMock: vi.fn(),
  valuesMock: vi.fn(),
}));

vi.mock("@/db", () => ({
  db: {
    select: mocks.selectMock,
    insert: mocks.insertMock,
  },
}));

describe("demo 数据库", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.selectMock.mockReturnValue({
      from: mocks.fromMock,
    });

    mocks.insertMock.mockReturnValue({
      values: mocks.valuesMock,
    });
  });
  test("dbSelect success", async () => {
    const rows = [
      {
        id: 1,
        name: "Tom",
      },
    ];

    mocks.fromMock.mockResolvedValue(rows);
    const result = await dbSelect();
    expect(result).toEqual(rows);
    expect(mocks.selectMock).toHaveBeenCalledTimes(1);
    expect(mocks.fromMock).toHaveBeenCalledTimes(1);
  });
  test("dbInsert success", async () => {
    const insertResult = {
      rowCount: 1,
    };

    mocks.valuesMock.mockResolvedValue(insertResult);
    const result = await dbInsert();
    expect(result).toEqual(insertResult);
    expect(mocks.insertMock).toHaveBeenCalledTimes(1);
    expect(mocks.valuesMock).toHaveBeenCalledWith({
      name: "John",
      age: 30,
      email: "john@example.com",
    });
  });
  test("dbInsert failed", async () => {
    mocks.valuesMock.mockRejectedValue(
      new Error("Insert failed")
    );
    await expect(dbInsert()).rejects.toThrow("Insert failed");
  });
});
