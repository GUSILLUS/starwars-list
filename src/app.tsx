import { Link, Navigate, Route, Routes } from "react-router-dom";
import "@/styles/common/global.css";
import Layout from "@/components/layout";
import { Typography } from "./components/ui";
import Starfield from "react-starfield";
import { CharacterDetails, CharacterList } from "./features";

export const App = () => {
  return (
    <Layout className="flex gap-4 flex-col w-full h-full min-h-full-screen p-4 bg-black">
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.01}
        backgroundColor="black"
      />

      <Layout.Header className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        <Typography.H1 className="text-yellow-500">
          StarNavi Heroes
        </Typography.H1>

        <nav className="flex gap-4 mt-4">
          <Link to="/">
            <Typography.H2 className="text-white hover:text-yellow-500">
              Home
            </Typography.H2>
          </Link>
        </nav>
      </Layout.Header>

      <Layout.Main className="flex w-full flex-col gap-2 flex-grow h-full">
        <Routes>
          <Route path="home" element={<CharacterList />} />

          <Route path="character">
            <Route index element={<CharacterDetails />} />

            <Route path=":characterId" element={<CharacterDetails />} />
          </Route>

          <Route path="/" element={<Navigate to="home" replace />} />
        </Routes>
      </Layout.Main>
    </Layout>
  );
};
