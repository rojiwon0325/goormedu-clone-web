import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "states/server";
import { RecoilRoot } from "recoil";
import { HelmetProvider } from "react-helmet-async";
import { Common } from "components";

const Provider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <HelmetProvider>
            <React.Suspense fallback={<Common.SimpleLoadingCircle />}>
              {children}
            </React.Suspense>
          </HelmetProvider>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Provider;
