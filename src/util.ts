class Util {
  public static isString = (val: any): boolean => {
    return typeof val === 'string';
  };

  public static roundDecimal = (value: number, decimal: number): number => {
    const power = Math.pow(10, decimal);
    return Math.round(value * power) / power;
  };

  public static dataSize = (value: number, decimal: number): number => {
    const power = Math.pow(10, decimal);
    return Math.round(value * power) / power;
  };
}

export default Util;
