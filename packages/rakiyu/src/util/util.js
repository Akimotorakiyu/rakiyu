/**
 * 引用与非引用值 深拷贝方法
 * @param data
 */
export function deepClone(data) {
  return JSON.parse(JSON.stringify(data));
}
