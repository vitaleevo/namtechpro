"use client";

import React from 'react';
import { LanguageProvider } from '@/i18n';

export const ClientLanguageProvider = ({ children }: { children: React.ReactNode }) => {
    return <LanguageProvider>{children}</LanguageProvider>;
};
