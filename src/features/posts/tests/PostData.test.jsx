import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import PostData from "../components/PostData";

const post = {
  id: 1,
  header: "Test post 1 header",
  subHeader: "Test post 1 sub-header",
  body: "Test post 1 body",
  createdAt: "2026-10-19T19:24:40.482Z",
  author: { username: "Brandon" },
};

describe("PostData component", () => {
  test("displays correct post data", () => {
    render(<PostData post={post} />);

    expect(screen.getByRole("heading", { name: "Test post 1 header" })).toBeInTheDocument();
    expect(screen.getByText("Test post 1 sub-header")).toBeInTheDocument();
    expect(screen.getByText("Test post 1 body")).toBeInTheDocument();
    expect(screen.getByText("Brandon")).toBeInTheDocument();
  });

  test("sub header is not displayed when its value is null", () => {
    render(
      <PostData
        post={{
          ...post,
          subHeader: "",
        }}
      />,
    );

    expect(screen.queryByText("Test post 1 sub-header")).not.toBeInTheDocument();

    expect(screen.getByText("Test post 1 header")).toBeInTheDocument();
    expect(screen.getByText("Test post 1 body")).toBeInTheDocument();
    expect(screen.getByText("Brandon")).toBeInTheDocument();
    expect(screen.getByText("October 19, 2026")).toBeInTheDocument();
    expect(screen.getAllByRole("paragraph")).toHaveLength(3);
  });
});
