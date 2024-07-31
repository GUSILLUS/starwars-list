import { render as _render, type RenderOptions } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import type { ReactElement } from "react";
import { HashRouter } from "react-router-dom";

export const render = (jsx: ReactElement, options?: RenderOptions, ) => {
  return {
    user: userEvent.setup(),
    ..._render(jsx, { wrapper: HashRouter, ...options }),
  }
}

export * from "@testing-library/react";