'use client';

import type { ReactNode } from "react";
import { Layout } from '../widgets/Layout/ui/Layout';


export const Providers = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};