import { describe, test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import PostComments from "../components/PostComments";

const comments = [
  {
    id: 1,
    message: "Test comment 1",
    createdAt: "2026-10-20T19:24:40.482Z",
    author: { username: "Brandon" },
  },
  {
    id: 2,
    message: "Test comment 2",
    createdAt: "2026-10-20T19:24:40.482Z",
    author: { username: "John" },
  },
];

describe("PostComments component", () => {
  test("display correct number of comments", () => {
    render(<PostComments initialComments={comments} />);

    expect(document.querySelectorAll(".comment")).toHaveLength(2);
  });

  test("displays message when comments array is empty", () => {
    render(<PostComments initialComments={[]} />);

    expect(document.querySelectorAll(".comment")).toHaveLength(0);
    expect(screen.getByText("No comments yet.")).toBeInTheDocument();
  });

  test("displays correct comment data");
});
