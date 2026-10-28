import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import PostList from "../components/PostList";

const posts = [
  {
    id: 1,
    header: "Test post 1",
    body: "This is the body of test post 1",
    createdAt: new Date().toISOString(),
    author: {
      username: "Brandon",
    },
  },
  {
    id: 2,
    header: "Test post 2",
    body: "This is the body of test post 2",
    createdAt: new Date().toISOString(),
    author: {
      username: "John",
    },
  },
];

describe("PostListComponent", () => {
  test("displays the correct number of rendered posts", () => {
    render(<PostList posts={posts} />);

    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  test("renders no posts when posts array is empty", () => {
    render(<PostList posts={[]} />);

    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(screen.getByText("No posts available")).toBeVisible();
  });

  test("displays the correct post headers", () => {
    render(<PostList posts={posts} />);

    expect(screen.getByRole("heading", { name: "Test post 1" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Test post 2" })).toBeVisible();
  });
});
