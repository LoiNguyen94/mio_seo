export function _validPhone(value: number) {
  if (!value) {
    return 'Vui lòng nhập thông tin.';
  }
  const valueValid = value.toString();
  const reg = /^[0-9a-zA-Z]+$/;
  if (valueValid.length !== 10) {
    return 'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại!';
  }
  if (!valueValid.match(/((09|03|07|08|05)+([0-9]{8})\b)/)) {
    return 'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại!';
  }
  if (!reg.test(valueValid))
    return 'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại!';
  return '';
}

export function _validLenghtName(value: string, limit: number) {
  if (!value) {
    return 'Vui lòng nhập thông tin.';
  }
  if (value.trim().length < limit) {
    return 'Họ và tên quá ngắn. Vui lòng nhập từ 3 ký tự trở lên.';
  }
  return '';
}
export const phoneNumberValidReg = RegExp(/((09|03|07|08|05)+([0-9]{8})\b)/);