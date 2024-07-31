interface TypographyProps {
  className?: string;
  children: React.ReactNode;
}

function P({ className, children }: TypographyProps) {
  return (
    <p className={`leading-7 ${className}`}>
      {children}
    </p>
  );
}

function H1({ className, children }: TypographyProps) {
  return (
    <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>
      {children}
    </h1>
  );
}

function H2({ className, children }: TypographyProps) {
  return (
    <h2 className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}>
      {children}
    </h2>
  );
}

function H3({ className, children }: TypographyProps) {
  return (
    <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

function H4({ className, children }: TypographyProps) {
  return (
    <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>
      {children}
    </h4>
  );
}

export const Typography = {
  P,
  H1,
  H2,
  H3,
  H4,
};