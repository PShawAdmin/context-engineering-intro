'use client';

import Link from 'next/link';
import { Button } from '@heroui/button';
import type { ComponentProps } from 'react';

type LinkButtonProps = Omit<ComponentProps<typeof Button>, 'as'> & {
  href: string;
  target?: string;
  rel?: string;
};

export default function LinkButton({ href, ...props }: LinkButtonProps) {
  return <Button as={Link} href={href} {...props} />;
}
