import { describe, test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import Comment from "../components/Comment";

const comment = {
  id: 1,
  message: "Test comment 1",
  createdAt: "2026-10-20T19:24:40.482Z",
  author: { username: "Brandon" },
};

describe("Comment component", () => {
  test("displays correct comment data", () => {
    render(<Comment comment={comment} />);

    expect(screen.getByText("Brandon")).toBeInTheDocument();
    expect(screen.getByText("October 20, 2026")).toBeInTheDocument();
    expect(screen.getByText("Test comment 1")).toBeInTheDocument;
  });
});
