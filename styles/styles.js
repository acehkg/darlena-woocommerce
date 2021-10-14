export const colors = {
  brandPink: {
    100: 'hsl(29, 45%, 65%)',
    200: 'hsl(29, 80%, 78%)',
    300: 'hsla(29, 45%, 65%, .5)',
  },
  brandGold: {
    100: 'hsl(46, 65%, 52%)',
  },
  brandGrey: {
    100: 'hsl(240, 1%, 14%)',
    200: 'hsl(270, 2%, 25%)',
    300: 'hsl(0, 0%, 43%)',
    400: 'hsl(0, 0%, 86%)',
    500: 'hsl(0, 0%, 96%)',
  },
};

export const textStyles = {
  h1: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  p: {
    fontSize: '1rem',
  },
};

export const styles = {
  global: {
    // styles for the `body`
    body: {
      bg: '#ffffff',
      color: 'brandGrey.100',
    },
    a: {
      _hover: {
        textDecoration: 'none',
        cursor: 'pointer',
      },
    },
  },
};
