import type { ComponentPropsWithoutRef, FC, PropsWithChildren } from "react"


type LayoutType = FC<ComponentPropsWithoutRef<"div">> & {
  Header: FC<ComponentPropsWithoutRef<"div">>;
  Main: FC<ComponentPropsWithoutRef<"div">>;
}

const Layout: LayoutType = ({ children, ...props }) => {
  return (
    <div {...props}>{children}</div>
  )
}

const Header: FC<PropsWithChildren> = ({ children, ...props }) => (
  <header {...props}>{children}</header>
)

const Main: FC<PropsWithChildren> = ({ children, ...props }) => (
  <main {...props}>{children}</main>
)

Layout.Header = Header;
Layout.Main = Main;

export default Layout
