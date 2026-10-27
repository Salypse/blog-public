import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { getPosts } from "../api/getPosts";

describe("getPosts()", () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("returns all public posts", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          posts: [
            { id: 1, header: "First published post", isPublished: true },
            { id: 2, header: "Second published post", isPublished: true },
          ],
        },
      }),
    });

    const posts = await getPosts();

    expect(posts).toHaveLength(2);
    expect(posts[0].header).toBe("First published post");
    expect(posts[1].header).toBe("Second published post");
  });

  test("returns empty array when there are no posts", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ data: { posts: [] } }),
    });

    const posts = await getPosts();
    expect(posts).toStrictEqual([]);
  });

  test("invalid response throws error", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    });

    await expect(getPosts()).rejects.toThrow("Failed to retrieve posts");
  });

  test("fetch error throws error", async () => {
    mockFetch.mockRejectedValue(new Error("Fetch error"));

    await expect(getPosts()).rejects.toThrow("Fetch error");
  });
});
