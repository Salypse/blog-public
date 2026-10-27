import { describe, test, expect, vi, beforeEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { getPosts } from "../api/getPosts";
import PostsPage from "../pages/PostsPage";

vi.mock("../api/getPosts", () => ({
  getPosts: vi.fn(),
}));

let resolvePosts;
let rejectPosts;
let postsPromise;

beforeEach(() => {
  vi.mocked(getPosts).mockReset();

  postsPromise = new Promise((resolve, reject) => {
    resolvePosts = resolve;
    rejectPosts = reject;
  });

  vi.mocked(getPosts).mockReturnValue(postsPromise);
});

describe("PostsPage", () => {
  test("loading spinner displays when loading", async () => {
    render(<PostsPage />);

    // Expect loadingSpinner to be visible before promise is resolved
    expect(screen.getByTestId("loading-spinner")).toBeVisible();

    // Resolve promise which removes loadingSpinner
    await act(() => {
      resolvePosts([]);
    });
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });

  test("on error, error message is display", async () => {
    render(<PostsPage />);

    // Expect ErrorMessage to not be displayed before promise is finished
    expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();

    // Reject promise which displays ErrorMessage component
    await act(() => {
      rejectPosts(new Error("Test Error"));
    });

    expect(screen.getByTestId("error-message")).toBeVisible();
  });

  test("displays posts when loading succeeds", async () => {
    render(<PostsPage />);

    // Expect posts to not be displayed before loading and error checks
    expect(screen.queryByText("Posts placeholder")).not.toBeInTheDocument();

    await act(() => {
      resolvePosts([
        { id: 1, header: "Test post 1" },
        { id: 2, header: "Test post 2" },
      ]);
    });

    // Expect posts to be displayed on successful call
    expect(screen.getByText("Posts placeholder")).toBeInTheDocument();
  });

  test("No posts available", async () => {
    render(<PostsPage />);

    // Expect no posts message to not be displayed before loading and error checks
    expect(screen.queryByText("No posts available")).not.toBeInTheDocument();

    await act(() => {
      resolvePosts([]);
    });

    //Expect no posts message to be displayed when no posts are returned
    expect(screen.getByText("No posts available")).toBeInTheDocument();
  });
});
