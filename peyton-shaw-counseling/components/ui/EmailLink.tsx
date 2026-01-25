'use client';

import { useEffect, useState } from 'react';
import { Button } from '@heroui/button';
import type { ComponentProps } from 'react';

const EMAIL_B64 = 'cGV5dG9uQHBleXRvbnNoYXdjb3Vuc2VsaW5nLmNvbQ==';

const decodeEmail = () => {
  try {
    return atob(EMAIL_B64);
  } catch {
    return '';
  }
};

const useDecodedEmail = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(decodeEmail());
  }, []);

  return email;
};

type EmailLinkProps = {
  className?: string;
  label?: string;
  showEmail?: boolean;
};

export function EmailLink({ className, label = 'Email us', showEmail = true }: EmailLinkProps) {
  const email = useDecodedEmail();
  const href = email ? `mailto:${email}` : '#';
  const text = showEmail ? (email || label) : label;

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (!email) {
          event.preventDefault();
        }
      }}
    >
      {text}
    </a>
  );
}

type EmailTextProps = {
  className?: string;
  label?: string;
};

export function EmailText({ className, label = 'Email' }: EmailTextProps) {
  const email = useDecodedEmail();
  return <span className={className}>{email || label}</span>;
}

type EmailButtonProps = Omit<ComponentProps<typeof Button>, 'as' | 'href' | 'children'> & {
  label?: string;
  showEmail?: boolean;
};

export function EmailButton({
  label = 'Email us',
  showEmail = false,
  ...props
}: EmailButtonProps) {
  const email = useDecodedEmail();
  const href = email ? `mailto:${email}` : '#';
  const text = showEmail ? (email || label) : label;

  return (
    <Button
      as="a"
      href={href}
      onClick={(event) => {
        if (!email) {
          event.preventDefault();
        }
      }}
      {...props}
    >
      {text}
    </Button>
  );
}
