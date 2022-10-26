// Twind
import island from "ultra/hooks/use-island.js";
import Counter from "./Counter.tsx";
const CounterIsland = island(Counter);
// NOTWORK ISLAND

import { lazy, Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Todo from "./Todo.tsx";
import { Button } from "@mui/material";

const SlowTodo = lazy(() => import("./Slowtodo.tsx"));



import { tw } from "twind";
import { TwindProvider } from "./twind/TwindProvider.tsx";
import Home from './pages/Home.tsx';
import Nice from './pages/Nice.tsx';
import { Link, Route } from "wouter";
const FillViewportWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
export default function App() {
  let noce = "123213"
  console.log("Hello world!");
  return (
    <TwindProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>Ultra</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </head>
        <body>
          <main>
             <Button
          variant="contained"
          onClick={() => alert("Hello World from a Material UI button!!")}
        >
          Say Hello World
        </Button>
           <div className={tw`text(3xl white) bg-blue-500 p-3`}>
            Hello with-twind!
          </div>
              <Link href="/home">
            <a className="link">Home</a>
          </Link>
           <Link href={'/nice/' + noce}>
            <a className="link">Nice</a>
          </Link>
            <Route path="/home"><Home/></Route>
            <Route path="/nice/:id">
            {(params)=> <Nice age={params.id}/>}
            </Route>
            <FillViewportWrapper>
            hydrationStrategy: load
            <CounterIsland start={50} hydrationStrategy="load" />
          </FillViewportWrapper>
          <FillViewportWrapper>
            hydrationStrategy: idle
            <CounterIsland start={60} hydrationStrategy="idle" />
          </FillViewportWrapper>
          <FillViewportWrapper>
            hydrationStrategy: visible
            <CounterIsland start={20} hydrationStrategy="visible" />
          </FillViewportWrapper>

          {/*REACT QUERY*/}
            <Todo id={1} />
        <Todo id={2} />
        <Todo id={3} />
        <Suspense fallback={<div>Loading</div>}>
          <SlowTodo id={4} />
        </Suspense>
        <ReactQueryDevtools />
         </main>
        </body>
      </html>
    </TwindProvider>
  );
}
