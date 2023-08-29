export const colors = {
  red: '#CC2936',
  purple: '#9381FF',
  lightGreen: '#EBF5EE',
  white: '#fff',
  green: '#419D78',
  black: '#06070E',
  gray: '#BABDC4',
} as const;

export const typography = {
  fontSize: {
    t8: 8,
    t10: 10,
    t12: 12,
    t14: 14,
    t16: 16,
    t18: 18,
    t20: 20,
    t22: 22,
    t24: 24,
    t26: 26,
    t28: 28,
    t32: 32,
    t36: 36,
    t40: 40,
  },
  fontsWeight: {
    bold: '700',
    // semiBold: '600',
    // medium: '500',
    medium: '500',
    regular: '400',
    light: '300',
  },
};

export const shadow = {
  shadow1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,

    elevation: 10,
  },
};
