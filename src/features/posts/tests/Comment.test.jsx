import { describe, test, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import userEvent from "@testing-library/user-event";

import { AuthContext } from "../../../components/layouts/AuthContext";
import Comment from "../components/Comment";
import { deletePostComment } from "../api/deletePostComment";

const comment = {
  id: 1,
  message: "Test comment 1",
  createdAt: "2026-10-20T19:24:40.482Z",
  author: { username: "Brandon" },
  authorId: 1,
};

const mockAccessToken = "test-access-token";
const mockSetAccessToken = vi.fn();
const mockOnDeleteComment = vi.fn();
const mockSetIsLoading = vi.fn();

function renderComment(comment) {
  return render(
    <AuthContext.Provider
      value={{
        user: { id: 1 },
        authStatus: "authenticated",
        accessToken: mockAccessToken,
        setAccessToken: mockSetAccessToken,
      }}
    >
      <MemoryRouter initialEntries={["/posts/1"]}>
        <Routes>
          <Route
            path="/posts/:id"
            element={
              <Comment
                comment={comment}
                onDeleteComment={mockOnDeleteComment}
                setIsLoading={mockSetIsLoading}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

vi.mock("../api/deletePostComment", () => ({ deletePostComment: vi.fn() }));

describe("Comment component", () => {
  test("displays correct comment data", () => {
    renderComment(comment);

    expect(screen.getByText("Brandon")).toBeInTheDocument();
    expect(screen.getByText("October 20, 2026")).toBeInTheDocument();
    expect(screen.getByText("Test comment 1")).toBeInTheDocument();
  });

  test("deletePostComment function is called with correct comment id", async () => {
    const user = userEvent.setup();

    renderComment(comment);

    const openDeleteModalBtn = screen.getByRole("button", { name: "Delete comment" });
    await user.click(openDeleteModalBtn);

    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    expect(deleteBtn).toBeInTheDocument();

    await user.click(deleteBtn);

    expect(deletePostComment).toHaveBeenCalledWith(
      "1",
      comment.id,
      mockAccessToken,
      mockSetAccessToken,
    );
  });

  test("delete button is not visible when user is not comment author", () => {
    renderComment({
      id: 2,
      message: "Test comment 2",
      createdAt: "2026-10-20T19:24:40.482Z",
      author: { username: "John" },
      authorId: 2,
    });

    expect(screen.queryByText("Delete comment")).not.toBeInTheDocument();
  });

  test("delete button is visible when user is post author", () => {
    renderComment(comment);

    expect(screen.getByText("Delete comment")).toBeInTheDocument();
  });
});
