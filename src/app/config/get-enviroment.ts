export default (key: string) => {
  const value: string = process.env[key];

  if (!value) {
    throw new Error(`환경변수가 설정되지 않음! { key: ${key}} `);
  }

  return value;
};
