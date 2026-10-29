import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import PostPreview from "../components/PostPreview";

const post = {
  id: 1,
  header: "Test post 1 header",
  subHeader: "Test post 1 sub-header",
  body: "Test post 1 body",
  createdAt: "2026-10-19T19:24:40.482Z",
  author: { username: "Brandon" },
};

describe("PostPreview component", () => {
  test("displays correct post data", () => {
    render(<PostPreview post={post} />);

    expect(screen.getByRole("heading", { name: "Test post 1 header" })).toBeInTheDocument();
    expect(screen.getByText("Test post 1 sub-header")).toBeInTheDocument();
    expect(screen.getByText("Test post 1 body")).toBeInTheDocument();
    expect(screen.getByText("Brandon")).toBeInTheDocument();
  });

  test("displays correctly formatted createdAt value", () => {
    render(<PostPreview post={post} />);

    expect(screen.getByText("October 19, 2026")).toBeInTheDocument();
  });

  test("displays a short post without truncation", () => {
    render(<PostPreview post={post} />);

    expect(screen.getByText("Test post 1 body")).toBeInTheDocument();
  });

  test("truncates a post body at 100 characters or more", () => {
    const testPost = {
      id: 1,
      header: "Test post 1 header",
      subHeader: "Test post 1 sub-header",
      body: "x".repeat(100),
      createdAt: "2026-10-19T19:24:40.482Z",
      author: { username: "Brandon" },
    };

    render(<PostPreview post={testPost} />);

    expect(document.querySelector(".post-body")).toHaveTextContent(`${"x".repeat(100)}...`);
  });

  test("sub header is not displayed when its value is null", () => {
    render(
      <PostPreview
        post={{
          id: 2,
          header: "Test post 2",
          body: "Test post 2 body",
          createdAt: "2026-10-19T19:24:40.482Z",
          author: { username: "John" },
        }}
      />,
    );

    expect(screen.getByText("Test post 2 body")).toBeInTheDocument();
    expect(screen.getByText("October 19, 2026")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getAllByRole("paragraph")).toHaveLength(3);
  });
});
