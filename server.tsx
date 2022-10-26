import { serve } from "https://deno.land/std@0.159.0/http/server.ts";
import { createRouter, createServer } from "ultra/server.ts";
import App from "./src/app.tsx";

// Twind
import "./src/twind/twind.ts";

// Wouter
import { Router } from "wouter";
import staticLocationHook from "wouter/static-location";
import { SearchParamsProvider } from "./src/wouter/index.tsx";

// React Query
import { QueryClientProvider } from "@tanstack/react-query";
import { useDehydrateReactQuery } from "./src/react-query/useDehydrateReactQuery.tsx";
import { queryClient } from "./src/react-query/query-client.ts";

const server = await createServer({
  importMapPath: import.meta.resolve("./importMap.json"),
  browserEntrypoint: import.meta.resolve("./client.tsx"),
});

function ServerApp({ context }: any) {
  useDehydrateReactQuery(queryClient);

  const requestUrl = new URL(context.req.url);

  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={staticLocationHook(requestUrl.pathname)}>
        <SearchParamsProvider value={requestUrl.searchParams}>
          <App />
        </SearchParamsProvider>
      </Router>
    </QueryClientProvider>
  );
}

server.get("*", async (context) => {
  // clear query cache
  queryClient.clear();

  /**
   * Render the request
   */
  const result = await server.render(<ServerApp context={context} />);

  return context.body(result, 200, {
    "content-type": "text/html; charset=utf-8",
  });
});

if (import.meta.main) {
  serve(server.fetch);
}
export default server;
